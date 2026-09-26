"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const mail_service_1 = require("../mail/mail.service");
const identity_verification_service_1 = require("./identity-verification.service");
const public_user_mapper_1 = require("./public-user.mapper");
const ROLE_LABELS = {
    SUPER_ADMIN: 'Superadministrador',
    ASSOCIATION_ADMIN: 'Administrador de asociación',
    REFEREE: 'Árbitro',
    PLAYER: 'Jugador',
};
let UsersService = UsersService_1 = class UsersService {
    prisma;
    imageStorage;
    identityVerification;
    mailService;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(prisma, imageStorage, identityVerification, mailService) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
        this.identityVerification = identityVerification;
        this.mailService = mailService;
    }
    async registerPlayer(dto, files) {
        this.assertValidBirthDate(dto.birthDate);
        this.assertDeclaredAgeMatchesBirthDate(dto.birthDate, dto.age);
        await this.assertUserIdentifiersAreAvailable(dto.idNumber, dto.email);
        const identityCheck = await this.identityVerification.verify(files.documentFront, files.documentBack, dto.idNumber, dto.birthDate);
        if (!identityCheck.verified) {
            this.logger.warn(`Documento sin confirmar para la cédula ${dto.idNumber}: ` +
                `${identityCheck.outcome} (${JSON.stringify(identityCheck.details)})`);
        }
        let photoAsset = null;
        let documentFrontAsset = null;
        let documentBackAsset = null;
        try {
            photoAsset = await this.imageStorage.saveUserPhoto(files.photo);
            documentFrontAsset = await this.imageStorage.saveIdentityDocument(files.documentFront, 'front');
            documentBackAsset = await this.imageStorage.saveIdentityDocument(files.documentBack, 'back');
            const persistedPhoto = photoAsset;
            const persistedDocumentFront = documentFrontAsset;
            const persistedDocumentBack = documentBackAsset;
            const user = await this.prisma.$transaction(async (transaction) => {
                const created = await transaction.users.create({
                    data: {
                        id_number: dto.idNumber,
                        document_type: 'CC',
                        full_name: dto.fullName,
                        birth_date: new Date(dto.birthDate),
                        birth_city: dto.birthCity,
                        gender: dto.gender,
                        email: dto.email,
                        phone: dto.phone || null,
                        photo_url: persistedPhoto.url,
                        photo_public_id: persistedPhoto.publicId,
                        document_front_url: persistedDocumentFront.url,
                        document_front_public_id: persistedDocumentFront.publicId,
                        document_front_format: persistedDocumentFront.format,
                        document_back_url: persistedDocumentBack.url,
                        document_back_public_id: persistedDocumentBack.publicId,
                        document_back_format: persistedDocumentBack.format,
                        identity_verified_at: identityCheck.verified ? new Date() : null,
                        identity_verification_status: identityCheck.verified
                            ? 'verified'
                            : 'pending_review',
                        identity_verification_details: identityCheck.details,
                        identity_verification_checked_at: new Date(),
                        password_hash: await (0, bcryptjs_1.hash)(dto.password, 12),
                        status: 'active',
                    },
                    select: { id: true },
                });
                await transaction.user_roles.create({
                    data: { user_id: created.id, role_code: 'PLAYER' },
                });
                return this.findUserInTransaction(transaction, created.id);
            });
            const response = (0, public_user_mapper_1.toPublicUserResponse)(user);
            await this.sendWelcomeEmail(response.email, response.fullName);
            return response;
        }
        catch (error) {
            await Promise.all([
                this.imageStorage.deleteSafely(photoAsset ?? {}),
                this.imageStorage.deleteSafely(documentFrontAsset ?? {}),
                this.imageStorage.deleteSafely(documentBackAsset ?? {}),
            ]);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                await this.assertUserIdentifiersAreAvailable(dto.idNumber, dto.email);
                throw new common_1.ConflictException('Ya existe una cuenta con ese documento o correo electrónico.');
            }
            throw error;
        }
    }
    async sendWelcomeEmail(email, fullName) {
        try {
            await this.mailService.sendWelcome({ to: email, fullName });
        }
        catch {
            this.logger.error(`No fue posible enviar la bienvenida a ${email}.`);
        }
    }
    assertDeclaredAgeMatchesBirthDate(birthDate, declaredAge) {
        const [year, month, day] = birthDate.split('-').map(Number);
        const today = new Date();
        let expectedAge = today.getFullYear() - year;
        if (today.getMonth() + 1 < month ||
            (today.getMonth() + 1 === month && today.getDate() < day)) {
            expectedAge -= 1;
        }
        if (expectedAge !== declaredAge) {
            throw new common_1.BadRequestException(`La edad indicada no coincide con la fecha de nacimiento. Para esa fecha la edad actual es ${expectedAge} años.`);
        }
    }
    async assertUserIdentifiersAreAvailable(idNumber, email) {
        const [documentOwner, emailOwner] = await Promise.all([
            this.prisma.users.findUnique({
                where: { id_number: idNumber },
                select: { id: true },
            }),
            this.prisma.users.findFirst({
                where: { email: { equals: email, mode: 'insensitive' } },
                select: { id: true },
            }),
        ]);
        if (documentOwner && emailOwner) {
            throw new common_1.ConflictException('Ya existe una cuenta con ese número de identidad y ese correo electrónico.');
        }
        if (documentOwner) {
            throw new common_1.ConflictException('Ya existe una cuenta con ese número de identidad.');
        }
        if (emailOwner) {
            throw new common_1.ConflictException('Ya existe una cuenta con ese correo electrónico.');
        }
    }
    async create(createUserDto) {
        const data = {
            id_number: createUserDto.idNumber,
            document_type: createUserDto.documentType,
            full_name: createUserDto.fullName,
            birth_date: new Date(createUserDto.birthDate),
            gender: createUserDto.gender,
            email: createUserDto.email,
            phone: createUserDto.phone,
            password_hash: await (0, bcryptjs_1.hash)(createUserDto.password, 12),
            status: createUserDto.status,
        };
        return this.prisma.users.create({
            data,
            omit: { password_hash: true },
        });
    }
    async findAll() {
        const users = await this.prisma.users.findMany({
            orderBy: { id: 'asc' },
            select: public_user_mapper_1.publicUserSelect,
        });
        return users.map(public_user_mapper_1.toPublicUserResponse);
    }
    async findAdministrators(query) {
        const administratorRoles = ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'];
        const where = this.buildAdministratorWhere(query);
        const allAdministratorsWhere = {
            user_roles: { some: { role_code: { in: administratorRoles } } },
        };
        const skip = (query.page - 1) * query.pageSize;
        const [users, total, administratorsTotal, active, superAdmins, associationAdmins,] = await this.prisma.$transaction([
            this.prisma.users.findMany({
                where,
                skip,
                take: query.pageSize,
                orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
                select: {
                    id: true,
                    id_number: true,
                    document_type: true,
                    full_name: true,
                    birth_date: true,
                    birth_city: true,
                    email: true,
                    phone: true,
                    photo_url: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    user_roles: {
                        orderBy: { role_code: 'asc' },
                        select: { role_code: true },
                    },
                    associations: { select: { id: true, name: true } },
                    association_administrators: {
                        where: { status: 'active' },
                        select: {
                            permission_level: true,
                            associations: { select: { id: true, name: true } },
                        },
                    },
                },
            }),
            this.prisma.users.count({ where }),
            this.prisma.users.count({ where: allAdministratorsWhere }),
            this.prisma.users.count({
                where: { ...allAdministratorsWhere, status: 'active' },
            }),
            this.prisma.users.count({
                where: { user_roles: { some: { role_code: 'SUPER_ADMIN' } } },
            }),
            this.prisma.users.count({
                where: { user_roles: { some: { role_code: 'ASSOCIATION_ADMIN' } } },
            }),
        ]);
        return {
            items: users.map((user) => {
                const associations = new Map();
                if (user.associations) {
                    associations.set(user.associations.id.toString(), {
                        id: user.associations.id.toString(),
                        name: user.associations.name,
                        permissionLevel: 'owner',
                    });
                }
                for (const assignment of user.association_administrators) {
                    associations.set(assignment.associations.id.toString(), {
                        id: assignment.associations.id.toString(),
                        name: assignment.associations.name,
                        permissionLevel: assignment.permission_level,
                    });
                }
                return {
                    id: user.id.toString(),
                    idNumber: user.id_number,
                    documentType: user.document_type,
                    fullName: user.full_name,
                    birthDate: user.birth_date.toISOString().slice(0, 10),
                    birthCity: user.birth_city,
                    email: user.email,
                    phone: user.phone,
                    photoUrl: user.photo_url,
                    status: user.status,
                    roles: user.user_roles.map(({ role_code }) => role_code),
                    associations: [...associations.values()],
                    createdAt: user.created_at.toISOString(),
                    updatedAt: user.updated_at.toISOString(),
                };
            }),
            metrics: {
                total: administratorsTotal,
                active,
                superAdmins,
                associationAdmins,
            },
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + users.length < total,
        };
    }
    async exportAdministrators(query) {
        const users = await this.prisma.users.findMany({
            where: this.buildAdministratorWhere(query),
            orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
            select: {
                id_number: true,
                document_type: true,
                full_name: true,
                email: true,
                phone: true,
                status: true,
                user_roles: {
                    where: {
                        role_code: { in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] },
                    },
                    orderBy: { role_code: 'asc' },
                    select: { role_code: true },
                },
                associations: { select: { id: true, name: true } },
                association_administrators: {
                    where: { status: 'active' },
                    select: {
                        permission_level: true,
                        associations: { select: { id: true, name: true } },
                    },
                },
            },
        });
        return users.map((user) => {
            const associations = new Map();
            if (user.associations) {
                associations.set(user.associations.id.toString(), {
                    name: user.associations.name,
                    permissionLevel: 'owner',
                });
            }
            for (const assignment of user.association_administrators) {
                associations.set(assignment.associations.id.toString(), {
                    name: assignment.associations.name,
                    permissionLevel: assignment.permission_level,
                });
            }
            return {
                fullName: user.full_name,
                documentType: user.document_type,
                idNumber: user.id_number,
                phone: user.phone,
                email: user.email,
                status: user.status,
                roles: user.user_roles.map(({ role_code }) => role_code),
                associations: [...associations.values()],
            };
        });
    }
    buildAdministratorWhere(query) {
        const administratorRoles = ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'];
        const adminRoleWhere = query.role
            ? { role_code: query.role }
            : { role_code: { in: administratorRoles } };
        return {
            status: query.status,
            user_roles: { some: adminRoleWhere },
            ...(query.search
                ? {
                    OR: [
                        {
                            full_name: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            email: { contains: query.search, mode: 'insensitive' },
                        },
                        {
                            id_number: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            phone: { contains: query.search, mode: 'insensitive' },
                        },
                    ],
                }
                : {}),
        };
    }
    async findOne(id) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            select: public_user_mapper_1.publicUserSelect,
        });
        if (!user) {
            throw new common_1.NotFoundException(`El usuario con ID ${id.toString()} no existe.`);
        }
        return (0, public_user_mapper_1.toPublicUserResponse)(user);
    }
    async findVisibleProfile(id, requestingUserId) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            select: public_user_mapper_1.publicUserSelect,
        });
        if (!user) {
            throw new common_1.NotFoundException(`El usuario con ID ${id.toString()} no existe.`);
        }
        await this.assertCanAccessProfile(requestingUserId, id, user.user_roles.map(({ role_code }) => role_code));
        return (0, public_user_mapper_1.toPublicUserResponse)(user);
    }
    async updateProfile(id, requestingUserId, dto, photo) {
        const current = await this.prisma.users.findUnique({
            where: { id },
            select: public_user_mapper_1.publicUserSelect,
        });
        if (!current) {
            throw new common_1.NotFoundException(`El usuario con ID ${id.toString()} no existe.`);
        }
        const requesterRoles = await this.assertCanAccessProfile(requestingUserId, id, current.user_roles.map(({ role_code }) => role_code));
        const isSuperAdmin = requesterRoles.has('SUPER_ADMIN');
        if (dto.roles !== undefined && !isSuperAdmin) {
            throw new common_1.ForbiddenException('Solamente un superadministrador puede modificar los roles.');
        }
        if (dto.birthDate)
            this.assertValidBirthDate(dto.birthDate);
        if (dto.roles)
            await this.assertRoleChangeIsValid(id, dto.roles);
        const previousRoles = current.user_roles.map(({ role_code }) => role_code);
        const nextRoles = dto.roles ? [...new Set(dto.roles)] : previousRoles;
        const addedRoles = nextRoles.filter((role) => !previousRoles.includes(role));
        const removedRoles = previousRoles.filter((role) => !nextRoles.includes(role));
        const rolesChanged = addedRoles.length > 0 || removedRoles.length > 0;
        const uploadedPhoto = photo
            ? await this.imageStorage.saveUserPhoto(photo)
            : null;
        const photoUrl = uploadedPhoto?.url ?? current.photo_url;
        let updated;
        try {
            updated = await this.prisma.$transaction(async (transaction) => {
                await transaction.users.update({
                    where: { id },
                    data: {
                        id_number: dto.idNumber?.trim(),
                        document_type: dto.documentType?.trim(),
                        full_name: dto.fullName?.trim(),
                        birth_date: dto.birthDate ? new Date(dto.birthDate) : undefined,
                        gender: dto.gender,
                        email: dto.email?.trim().toLowerCase(),
                        phone: dto.phone === undefined ? undefined : dto.phone?.trim() || null,
                        photo_url: photoUrl,
                        photo_public_id: uploadedPhoto?.publicId,
                        updated_at: new Date(),
                    },
                });
                if (dto.roles) {
                    await transaction.user_roles.deleteMany({ where: { user_id: id } });
                    await transaction.user_roles.createMany({
                        data: dto.roles.map((roleCode) => ({
                            user_id: id,
                            role_code: roleCode,
                        })),
                    });
                }
                if (rolesChanged && id !== requestingUserId) {
                    const changes = [
                        addedRoles.length > 0
                            ? `Roles agregados: ${addedRoles.map((role) => ROLE_LABELS[role] ?? role).join(', ')}.`
                            : null,
                        removedRoles.length > 0
                            ? `Roles retirados: ${removedRoles.map((role) => ROLE_LABELS[role] ?? role).join(', ')}.`
                            : null,
                    ]
                        .filter((value) => Boolean(value))
                        .join(' ');
                    await transaction.notifications.create({
                        data: {
                            user_id: id,
                            type: 'account',
                            title: 'Tus roles fueron actualizados',
                            message: changes,
                            entity_type: 'user_roles',
                            entity_id: id.toString(),
                            metadata: {
                                addedRoles,
                                removedRoles,
                                actionUrl: '/profile',
                                actionLabel: 'Ver mi perfil',
                            },
                        },
                    });
                }
                return this.findUserInTransaction(transaction, id);
            });
        }
        catch (error) {
            if (uploadedPhoto)
                await this.imageStorage.deleteSafely(uploadedPhoto);
            throw error;
        }
        if (photo && current.photo_url) {
            await this.imageStorage.deleteSafely({
                url: current.photo_url,
                publicId: current.photo_public_id,
            });
        }
        return (0, public_user_mapper_1.toPublicUserResponse)(updated);
    }
    async update(id, updateUserDto) {
        const data = {
            id_number: updateUserDto.idNumber,
            document_type: updateUserDto.documentType,
            full_name: updateUserDto.fullName,
            birth_date: updateUserDto.birthDate
                ? new Date(updateUserDto.birthDate)
                : undefined,
            gender: updateUserDto.gender,
            email: updateUserDto.email,
            phone: updateUserDto.phone,
            status: updateUserDto.status,
        };
        if (updateUserDto.password !== undefined) {
            data.password_hash = await (0, bcryptjs_1.hash)(updateUserDto.password, 12);
        }
        const shouldRevokeSessions = updateUserDto.password !== undefined ||
            (updateUserDto.status !== undefined && updateUserDto.status !== 'active');
        return this.prisma.$transaction(async (transaction) => {
            const user = await transaction.users.update({
                where: { id },
                data,
                omit: { password_hash: true },
            });
            if (shouldRevokeSessions) {
                await transaction.auth_sessions.updateMany({
                    where: { user_id: id, revoked_at: null },
                    data: { revoked_at: new Date() },
                });
            }
            return user;
        });
    }
    async getIdentityDocumentDownload(id, requestingUserId, side) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            select: {
                document_front_public_id: true,
                document_front_format: true,
                document_back_public_id: true,
                document_back_format: true,
                user_roles: { select: { role_code: true } },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`El usuario con ID ${id.toString()} no existe.`);
        }
        const requesterRoles = await this.assertCanAccessProfile(requestingUserId, id, user.user_roles.map(({ role_code }) => role_code));
        if (!requesterRoles.has('SUPER_ADMIN')) {
            throw new common_1.ForbiddenException('Solamente un superadministrador puede consultar el documento de identidad.');
        }
        const publicId = side === 'front'
            ? user.document_front_public_id
            : user.document_back_public_id;
        const format = side === 'front' ? user.document_front_format : user.document_back_format;
        if (!publicId || !format) {
            throw new common_1.NotFoundException('El documento solicitado no está disponible en el almacenamiento seguro.');
        }
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        return {
            url: this.imageStorage.createIdentityDocumentDownloadUrl(publicId, format, 300),
            expiresAt: expiresAt.toISOString(),
        };
    }
    async remove(id) {
        const current = await this.prisma.users.findUnique({
            where: { id },
            select: {
                photo_url: true,
                photo_public_id: true,
                document_front_url: true,
                document_front_public_id: true,
                document_back_url: true,
                document_back_public_id: true,
            },
        });
        if (!current) {
            throw new common_1.NotFoundException(`El usuario con ID ${id.toString()} no existe.`);
        }
        const removed = await this.prisma.users.delete({
            where: { id },
            omit: { password_hash: true },
        });
        const assets = [
            { url: current.photo_url, publicId: current.photo_public_id },
            {
                url: current.document_front_url,
                publicId: current.document_front_public_id,
                deliveryType: 'authenticated',
            },
            {
                url: current.document_back_url,
                publicId: current.document_back_public_id,
                deliveryType: 'authenticated',
            },
        ];
        for (const asset of assets) {
            try {
                await this.imageStorage.delete(asset);
            }
            catch (error) {
                this.logger.error(`No fue posible limpiar un recurso del usuario ${id.toString()}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        return removed;
    }
    async assertCanAccessProfile(requestingUserId, targetUserId, targetRoles) {
        const requesterRoles = new Set((await this.prisma.user_roles.findMany({
            where: { user_id: requestingUserId },
            select: { role_code: true },
        })).map(({ role_code }) => role_code));
        if (requestingUserId === targetUserId ||
            requesterRoles.has('SUPER_ADMIN')) {
            return requesterRoles;
        }
        if (requesterRoles.has('ASSOCIATION_ADMIN') &&
            (targetRoles.includes('PLAYER') || targetRoles.includes('REFEREE'))) {
            return requesterRoles;
        }
        throw new common_1.ForbiddenException('No tienes permisos para consultar o editar este perfil.');
    }
    async assertRoleChangeIsValid(id, roles) {
        const existingRoleCount = await this.prisma.roles.count({
            where: { code: { in: [...roles] } },
        });
        if (existingRoleCount !== roles.length) {
            throw new common_1.BadRequestException('Uno o más roles seleccionados no existen.');
        }
        const removesSuperAdmin = !roles.includes('SUPER_ADMIN') &&
            Boolean(await this.prisma.user_roles.findUnique({
                where: {
                    user_id_role_code: { user_id: id, role_code: 'SUPER_ADMIN' },
                },
            }));
        if (!removesSuperAdmin)
            return;
        const otherSuperAdmins = await this.prisma.user_roles.count({
            where: { role_code: 'SUPER_ADMIN', user_id: { not: id } },
        });
        if (otherSuperAdmins === 0) {
            throw new common_1.BadRequestException('No puedes retirar el rol al último superadministrador de la plataforma.');
        }
    }
    findUserInTransaction(transaction, id) {
        return transaction.users.findUniqueOrThrow({
            where: { id },
            select: public_user_mapper_1.publicUserSelect,
        });
    }
    assertValidBirthDate(value) {
        if (new Date(value) > new Date()) {
            throw new common_1.BadRequestException('La fecha de nacimiento no puede estar en el futuro.');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService,
        identity_verification_service_1.IdentityVerificationService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map