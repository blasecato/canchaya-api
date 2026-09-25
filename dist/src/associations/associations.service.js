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
var AssociationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const association_response_mapper_1 = require("./association-response.mapper");
const association_tournament_response_mapper_1 = require("./association-tournament-response.mapper");
const tournament_lifecycle_constants_1 = require("../tournaments/tournament-lifecycle.constants");
const FEATURED_ASSOCIATION_ID = (() => {
    const configured = process.env.FEATURED_ASSOCIATION_ID?.trim();
    return configured && /^\d+$/.test(configured) ? BigInt(configured) : 6n;
})();
let AssociationsService = AssociationsService_1 = class AssociationsService {
    prisma;
    imageStorage;
    logger = new common_1.Logger(AssociationsService_1.name);
    constructor(prisma, imageStorage) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
    }
    async create(createAssociationDto, logo, cover, requestingUserId) {
        const ownerUserId = BigInt(createAssociationDto.ownerUserId);
        let logoAsset;
        let coverAsset;
        let response;
        await this.assertCanCreateAssociation(this.prisma, requestingUserId, ownerUserId);
        try {
            logoAsset = await this.imageStorage.saveAssociationLogo(logo);
            coverAsset = await this.imageStorage.saveAssociationCover(cover);
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([logoAsset, coverAsset]);
            throw error;
        }
        try {
            response = await this.prisma.$transaction(async (transaction) => {
                await this.assertCanCreateAssociation(transaction, requestingUserId, ownerUserId);
                await this.ensureActiveOwner(transaction, ownerUserId);
                const association = await transaction.associations.create({
                    data: {
                        name: createAssociationDto.name,
                        description: createAssociationDto.description,
                        city: createAssociationDto.city,
                        address: createAssociationDto.address,
                        tax_id: createAssociationDto.taxId,
                        email: createAssociationDto.email,
                        phone: createAssociationDto.phone,
                        logo_url: logoAsset.url,
                        logo_public_id: logoAsset.publicId,
                        cover_url: coverAsset.url,
                        cover_public_id: coverAsset.publicId,
                        owner_user_id: ownerUserId,
                        status: createAssociationDto.status,
                    },
                    select: association_response_mapper_1.associationResponseSelect,
                });
                await this.ensureAssociationAdminRole(transaction, ownerUserId);
                return (0, association_response_mapper_1.toAssociationResponse)(association, 0);
            });
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([logoAsset, coverAsset]);
            throw error;
        }
        if (ownerUserId !== requestingUserId) {
            await this.notifyAssociationAssignmentSafely(ownerUserId, response.id, response.name);
        }
        return response;
    }
    async findAll(requestingUserId) {
        const isSuperAdmin = requestingUserId
            ? await this.hasRole(requestingUserId, 'SUPER_ADMIN')
            : false;
        const isPlayer = requestingUserId && !isSuperAdmin
            ? await this.hasRole(requestingUserId, 'PLAYER')
            : false;
        const canSeeInactiveAssociations = requestingUserId ? isSuperAdmin : true;
        const associations = await this.prisma.associations.findMany({
            where: canSeeInactiveAssociations ? undefined : { status: 'active' },
            orderBy: { id: 'asc' },
            select: association_response_mapper_1.associationResponseSelect,
        });
        const response = await this.toAssociationResponsesWithTeamCounts(associations);
        return isPlayer ? this.pinFeaturedAssociation(response) : response;
    }
    async hasRole(userId, roleCode) {
        return Boolean(await this.prisma.user_roles.findFirst({
            where: { user_id: userId, role_code: roleCode },
            select: { role_code: true },
        }));
    }
    pinFeaturedAssociation(associations) {
        const featuredId = FEATURED_ASSOCIATION_ID.toString();
        const featuredIndex = associations.findIndex(({ id }) => id === featuredId);
        if (featuredIndex <= 0)
            return associations;
        const featured = associations[featuredIndex];
        return [
            featured,
            ...associations.slice(0, featuredIndex),
            ...associations.slice(featuredIndex + 1),
        ];
    }
    async findMine(requestingUserId) {
        return this.findAdministeredAssociations(requestingUserId);
    }
    async findAdministeredBy(userId) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`El usuario con ID ${userId.toString()} no existe.`);
        }
        return this.findAdministeredAssociations(userId);
    }
    async findAdministeredAssociations(userId) {
        const associations = await this.prisma.associations.findMany({
            where: {
                OR: [
                    { owner_user_id: userId },
                    {
                        association_administrators: {
                            some: {
                                user_id: userId,
                                status: 'active',
                                permission_level: {
                                    in: ['administrator', 'editor', 'viewer'],
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: { id: 'asc' },
            select: association_response_mapper_1.associationResponseSelect,
        });
        const uniqueAssociations = [
            ...new Map(associations.map((association) => [association.id, association])).values(),
        ];
        return this.toAssociationResponsesWithTeamCounts(uniqueAssociations);
    }
    async toAssociationResponsesWithTeamCounts(associations) {
        if (associations.length === 0) {
            return [];
        }
        const approvedTeams = await this.prisma.tournament_team_registrations.groupBy({
            by: ['association_id', 'team_id'],
            where: {
                association_id: { in: associations.map(({ id }) => id) },
                request_status: 'approved',
            },
        });
        const teamCounts = new Map();
        for (const { association_id } of approvedTeams) {
            teamCounts.set(association_id, (teamCounts.get(association_id) ?? 0) + 1);
        }
        return associations.map((association) => (0, association_response_mapper_1.toAssociationResponse)(association, teamCounts.get(association.id) ?? 0));
    }
    async findOne(id, requestingUserId) {
        const permissions = await this.getAssociationPermissions(this.prisma, id, requestingUserId);
        const association = await this.prisma.associations.findUnique({
            where: { id },
            select: association_response_mapper_1.associationResponseSelect,
        });
        if (!association) {
            throw new common_1.NotFoundException(`La asociación con ID ${id.toString()} no existe.`);
        }
        const teamCount = await this.countApprovedTeams(id);
        return {
            ...(0, association_response_mapper_1.toAssociationResponse)(association, teamCount),
            permissions,
        };
    }
    async findAvailableTournaments(associationId, requestingUserId, scope = 'available') {
        const permissions = await this.getAssociationPermissions(this.prisma, associationId, requestingUserId);
        if (scope === 'management' && !permissions.canManageTournaments) {
            throw new common_1.ForbiddenException('No tienes permisos para administrar los torneos de esta asociación.');
        }
        const tournaments = await this.prisma.tournaments.findMany({
            where: {
                association_id: associationId,
                ...(scope === 'available'
                    ? {
                        status: 'active',
                        phase: { in: [...tournament_lifecycle_constants_1.PUBLIC_TOURNAMENT_PHASES] },
                    }
                    : {}),
            },
            orderBy: [{ start_date: 'asc' }, { id: 'asc' }],
            select: association_tournament_response_mapper_1.associationTournamentResponseSelect,
        });
        return tournaments.map(association_tournament_response_mapper_1.toAssociationTournamentResponse);
    }
    async update(id, requestingUserId, updateAssociationDto, images = {}) {
        const initialPermissions = await this.getAssociationPermissions(this.prisma, id, requestingUserId);
        if (!initialPermissions.canEdit) {
            throw new common_1.ForbiddenException('Tu permiso de consulta no permite editar esta asociación.');
        }
        if (updateAssociationDto.ownerUserId !== undefined &&
            !initialPermissions.canManageOwner) {
            throw new common_1.ForbiddenException('Solo SUPER_ADMIN puede cambiar al propietario de una asociación.');
        }
        const ownerUserId = updateAssociationDto.ownerUserId === undefined
            ? undefined
            : BigInt(updateAssociationDto.ownerUserId);
        let newLogo;
        let newCover;
        try {
            if (images.logo) {
                newLogo = await this.imageStorage.saveAssociationLogo(images.logo);
            }
            if (images.cover) {
                newCover = await this.imageStorage.saveAssociationCover(images.cover);
            }
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([newLogo, newCover]);
            throw error;
        }
        let previousImages;
        try {
            previousImages = await this.prisma.$transaction(async (transaction) => {
                const currentPermissions = await this.getAssociationPermissions(transaction, id, requestingUserId);
                if (!currentPermissions.canEdit) {
                    throw new common_1.ForbiddenException('Tu permiso de consulta no permite editar esta asociación.');
                }
                if (ownerUserId !== undefined && !currentPermissions.canManageOwner) {
                    throw new common_1.ForbiddenException('Solo SUPER_ADMIN puede cambiar al propietario de una asociación.');
                }
                if (ownerUserId !== undefined) {
                    await this.ensureActiveOwner(transaction, ownerUserId);
                }
                const currentAssociation = await transaction.associations.findUnique({
                    where: { id },
                    select: {
                        name: true,
                        owner_user_id: true,
                        logo_url: true,
                        logo_public_id: true,
                        cover_url: true,
                        cover_public_id: true,
                    },
                });
                if (!currentAssociation) {
                    throw new common_1.NotFoundException(`La asociación con ID ${id.toString()} no existe.`);
                }
                await transaction.associations.update({
                    where: { id },
                    data: {
                        name: updateAssociationDto.name,
                        description: updateAssociationDto.description,
                        city: updateAssociationDto.city,
                        address: updateAssociationDto.address,
                        tax_id: updateAssociationDto.taxId,
                        email: updateAssociationDto.email,
                        phone: updateAssociationDto.phone,
                        logo_url: newLogo?.url,
                        logo_public_id: newLogo?.publicId,
                        cover_url: newCover?.url,
                        cover_public_id: newCover?.publicId,
                        owner_user_id: ownerUserId,
                        status: updateAssociationDto.status,
                    },
                    select: { id: true },
                });
                if (ownerUserId !== undefined) {
                    await this.ensureAssociationAdminRole(transaction, ownerUserId);
                    if (ownerUserId !== currentAssociation.owner_user_id &&
                        ownerUserId !== requestingUserId) {
                        await transaction.notifications.create({
                            data: {
                                user_id: ownerUserId,
                                type: 'association',
                                title: 'Te asignaron una asociación',
                                message: `Ahora eres el propietario y administrador principal de ${updateAssociationDto.name?.trim() || currentAssociation.name}.`,
                                entity_type: 'association',
                                entity_id: id.toString(),
                                metadata: {
                                    associationId: id.toString(),
                                    associationName: updateAssociationDto.name?.trim() ||
                                        currentAssociation.name,
                                    actionUrl: `/associations/${id.toString()}/tournaments`,
                                    actionLabel: 'Ver asociación',
                                },
                            },
                        });
                    }
                    if (ownerUserId !== currentAssociation.owner_user_id &&
                        currentAssociation.owner_user_id !== requestingUserId) {
                        await transaction.notifications.create({
                            data: {
                                user_id: currentAssociation.owner_user_id,
                                type: 'association',
                                title: 'La asociación cambió de propietario',
                                message: `Ya no eres el propietario principal de ${updateAssociationDto.name?.trim() || currentAssociation.name}.`,
                                entity_type: 'association',
                                entity_id: id.toString(),
                                metadata: {
                                    associationId: id.toString(),
                                    associationName: updateAssociationDto.name?.trim() ||
                                        currentAssociation.name,
                                    actionUrl: '/my-associations',
                                    actionLabel: 'Ver mis asociaciones',
                                },
                            },
                        });
                    }
                }
                return {
                    logoUrl: currentAssociation.logo_url,
                    logoPublicId: currentAssociation.logo_public_id,
                    coverUrl: currentAssociation.cover_url,
                    coverPublicId: currentAssociation.cover_public_id,
                };
            });
        }
        catch (error) {
            await this.deleteImagesWithoutMaskingError([newLogo, newCover]);
            throw error;
        }
        const retainedImageUrls = new Set([
            newLogo?.url ?? previousImages.logoUrl,
            newCover?.url ?? previousImages.coverUrl,
        ].filter((imageUrl) => Boolean(imageUrl)));
        const replacedImageCandidates = [
            newLogo
                ? {
                    url: previousImages.logoUrl,
                    publicId: previousImages.logoPublicId,
                }
                : undefined,
            newCover
                ? {
                    url: previousImages.coverUrl,
                    publicId: previousImages.coverPublicId,
                }
                : undefined,
        ];
        const replacedImages = replacedImageCandidates.filter((image) => image !== undefined);
        await this.deleteImagesWithoutMaskingError(replacedImages.filter((image) => !image.url || !retainedImageUrls.has(image.url)));
        return this.findOne(id, requestingUserId);
    }
    async remove(id) {
        const [associationRecord, announcements] = await Promise.all([
            this.prisma.associations.findUnique({
                where: { id },
                select: association_response_mapper_1.associationResponseSelect,
            }),
            this.prisma.association_announcements.findMany({
                where: { association_id: id },
                select: { image_url: true, image_public_id: true },
            }),
        ]);
        if (!associationRecord) {
            throw new common_1.NotFoundException(`La asociación con ID ${id.toString()} no existe.`);
        }
        const association = (0, association_response_mapper_1.toAssociationResponse)(associationRecord, await this.countApprovedTeams(id));
        await this.prisma.associations.delete({ where: { id } });
        await this.deleteImagesWithoutMaskingError([
            {
                url: associationRecord.logo_url,
                publicId: associationRecord.logo_public_id,
            },
            {
                url: associationRecord.cover_url,
                publicId: associationRecord.cover_public_id,
            },
            ...announcements.map((announcement) => ({
                url: announcement.image_url,
                publicId: announcement.image_public_id,
            })),
        ]);
        return association;
    }
    async countApprovedTeams(associationId) {
        const approvedTeams = await this.prisma.tournament_team_registrations.groupBy({
            by: ['team_id'],
            where: {
                association_id: associationId,
                request_status: 'approved',
            },
        });
        return approvedTeams.length;
    }
    async ensureActiveOwner(transaction, ownerUserId) {
        const owner = await transaction.users.findUnique({
            where: { id: ownerUserId },
            select: { status: true },
        });
        if (!owner) {
            throw new common_1.NotFoundException('El usuario propietario no existe.');
        }
        if (owner.status !== 'active') {
            throw new common_1.BadRequestException('El usuario propietario debe estar activo.');
        }
    }
    async ensureAssociationAdminRole(transaction, ownerUserId) {
        await transaction.user_roles.upsert({
            where: {
                user_id_role_code: {
                    user_id: ownerUserId,
                    role_code: 'ASSOCIATION_ADMIN',
                },
            },
            create: {
                user_id: ownerUserId,
                role_code: 'ASSOCIATION_ADMIN',
            },
            update: {},
        });
    }
    async notifyAssociationAssignmentSafely(ownerUserId, associationId, associationName) {
        try {
            await this.prisma.notifications.create({
                data: {
                    user_id: ownerUserId,
                    type: 'association',
                    title: 'Te asignaron una asociación',
                    message: `Ahora eres el propietario y administrador principal de ${associationName}.`,
                    entity_type: 'association',
                    entity_id: associationId,
                    metadata: {
                        associationId,
                        associationName,
                        actionUrl: `/associations/${associationId}/tournaments`,
                        actionLabel: 'Ver asociación',
                    },
                },
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'error desconocido';
            this.logger.warn(`La asociación ${associationId} fue creada, pero no se pudo notificar al propietario ${ownerUserId.toString()}: ${message}`);
        }
    }
    async assertCanCreateAssociation(client, requestingUserId, ownerUserId) {
        const liveRoles = await client.user_roles.findMany({
            where: {
                user_id: requestingUserId,
                role_code: { in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] },
            },
            select: { role_code: true },
        });
        const roleCodes = new Set(liveRoles.map(({ role_code }) => role_code));
        if (roleCodes.has('SUPER_ADMIN'))
            return;
        if (!roleCodes.has('ASSOCIATION_ADMIN')) {
            throw new common_1.ForbiddenException('No tienes permisos para registrar una asociación.');
        }
        if (requestingUserId !== ownerUserId) {
            throw new common_1.ForbiddenException('Solo puedes registrar una asociación vinculada a tu propia cuenta.');
        }
        const existingAssociation = await client.associations.findFirst({
            where: {
                OR: [
                    { owner_user_id: requestingUserId },
                    {
                        association_administrators: {
                            some: {
                                user_id: requestingUserId,
                                status: 'active',
                                permission_level: {
                                    in: ['administrator', 'editor', 'viewer'],
                                },
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        if (existingAssociation) {
            throw new common_1.ForbiddenException('Ya tienes una asociación vinculada y no puedes registrar otra.');
        }
    }
    async getAssociationPermissions(client, associationId, requestingUserId) {
        const [association, liveRoles] = await Promise.all([
            client.associations.findUnique({
                where: { id: associationId },
                select: {
                    owner_user_id: true,
                    status: true,
                    association_administrators: {
                        where: { user_id: requestingUserId, status: 'active' },
                        select: { permission_level: true },
                    },
                },
            }),
            client.user_roles.findMany({
                where: {
                    user_id: requestingUserId,
                    role_code: {
                        in: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'],
                    },
                },
                select: { role_code: true },
            }),
        ]);
        if (!association) {
            throw new common_1.NotFoundException(`La asociación con ID ${associationId.toString()} no existe.`);
        }
        const roleCodes = new Set(liveRoles.map(({ role_code }) => role_code));
        const isSuperAdmin = roleCodes.has('SUPER_ADMIN');
        const isOwner = association.owner_user_id === requestingUserId;
        if (isSuperAdmin) {
            return {
                canEdit: true,
                canManageOwner: true,
                canManageTournaments: true,
                isOwner,
                permissionLevel: 'super_admin',
            };
        }
        if (roleCodes.has('ASSOCIATION_ADMIN') && isOwner) {
            return {
                canEdit: true,
                canManageOwner: false,
                canManageTournaments: true,
                isOwner: true,
                permissionLevel: 'owner',
            };
        }
        const permissionLevel = roleCodes.has('ASSOCIATION_ADMIN')
            ? association.association_administrators[0]?.permission_level
            : undefined;
        if (permissionLevel &&
            ['administrator', 'editor', 'viewer'].includes(permissionLevel)) {
            return {
                canEdit: permissionLevel !== 'viewer',
                canManageOwner: false,
                canManageTournaments: permissionLevel === 'administrator',
                isOwner: false,
                permissionLevel,
            };
        }
        if ((roleCodes.has('ASSOCIATION_ADMIN') ||
            roleCodes.has('PLAYER') ||
            roleCodes.has('REFEREE')) &&
            association.status === 'active') {
            return {
                canEdit: false,
                canManageOwner: false,
                canManageTournaments: false,
                isOwner: false,
                permissionLevel: 'viewer',
            };
        }
        throw new common_1.ForbiddenException('No tienes acceso a esta asociación.');
    }
    async deleteImagesWithoutMaskingError(images) {
        await Promise.all(images.map((image) => this.deleteImageWithoutMaskingError(image)));
    }
    async deleteImageWithoutMaskingError(image) {
        try {
            if (image)
                await this.imageStorage.delete(image);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`No fue posible eliminar la imagen: ${message}`);
        }
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = AssociationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map