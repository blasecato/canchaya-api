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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const players_constants_1 = require("./players.constants");
const BLOCK_DURATION_LABELS = {
    one_week: '1 semana',
    one_month: '1 mes',
    three_months: '3 meses',
    six_months: '6 meses',
    nine_months: '9 meses',
    one_year: '1 año',
};
const playerSelect = {
    id: true,
    id_number: true,
    document_type: true,
    full_name: true,
    birth_date: true,
    gender: true,
    email: true,
    phone: true,
    photo_url: true,
    photo_public_id: true,
    status: true,
    blocked_until: true,
    block_reason: true,
    created_at: true,
    updated_at: true,
    user_roles: {
        orderBy: { role_code: 'asc' },
        select: { role_code: true },
    },
    team_members: {
        where: { status: 'active' },
        select: {
            teams: { select: { id: true, name: true } },
            tournament_team_players: {
                select: {
                    registration_status: true,
                    tournament_team_registrations: {
                        select: { tournaments: { select: { id: true, name: true } } },
                    },
                },
            },
        },
    },
};
let PlayersService = class PlayersService {
    prisma;
    imageStorage;
    constructor(prisma, imageStorage) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
    }
    async findAll(query, requestingUserId) {
        await this.releaseExpiredBlocks();
        if (query.managedTournamentsOnly) {
            const isAssociationAdmin = await this.prisma.user_roles.findUnique({
                where: {
                    user_id_role_code: {
                        user_id: requestingUserId,
                        role_code: 'ASSOCIATION_ADMIN',
                    },
                },
                select: { user_id: true },
            });
            if (!isAssociationAdmin) {
                throw new common_1.ForbiddenException('Este filtro solo está disponible para administradores de asociación.');
            }
        }
        const membershipFilter = {
            status: 'active',
            team_id: query.teamId ? BigInt(query.teamId) : undefined,
            tournament_team_players: query.managedTournamentsOnly
                ? {
                    some: {
                        registration_status: 'approved',
                        tournament_team_registrations: {
                            request_status: 'approved',
                            tournaments: {
                                associations: {
                                    OR: [
                                        { owner_user_id: requestingUserId },
                                        {
                                            association_administrators: {
                                                some: {
                                                    user_id: requestingUserId,
                                                    status: 'active',
                                                    permission_level: 'administrator',
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                }
                : query.tournamentId
                    ? { some: { tournament_id: BigInt(query.tournamentId) } }
                    : undefined,
        };
        const where = {
            user_roles: { some: { role_code: 'PLAYER' } },
            status: query.status === 'active'
                ? 'active'
                : query.status === 'blocked'
                    ? 'inactive'
                    : undefined,
            team_members: query.teamId || query.tournamentId || query.managedTournamentsOnly
                ? { some: membershipFilter }
                : undefined,
            OR: query.search
                ? [
                    { full_name: { contains: query.search, mode: 'insensitive' } },
                    { email: { contains: query.search, mode: 'insensitive' } },
                    { id_number: { contains: query.search, mode: 'insensitive' } },
                ]
                : undefined,
        };
        const allPlayersWhere = {
            user_roles: { some: { role_code: 'PLAYER' } },
        };
        const minorThreshold = new Date();
        minorThreshold.setFullYear(minorThreshold.getFullYear() - 18);
        const skip = (query.page - 1) * query.pageSize;
        const [total, players, totalPlayers, active, blocked, minors] = await this.prisma.$transaction([
            this.prisma.users.count({ where }),
            this.prisma.users.findMany({
                where,
                orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
                skip,
                take: query.pageSize,
                select: playerSelect,
            }),
            this.prisma.users.count({ where: allPlayersWhere }),
            this.prisma.users.count({
                where: { ...allPlayersWhere, status: 'active' },
            }),
            this.prisma.users.count({
                where: {
                    ...allPlayersWhere,
                    status: 'inactive',
                },
            }),
            this.prisma.users.count({
                where: { ...allPlayersWhere, birth_date: { gt: minorThreshold } },
            }),
        ]);
        return {
            items: players.map((player) => this.toResponse(player)),
            metrics: { total: totalPlayers, active, blocked, minors },
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + players.length < total,
        };
    }
    async findFilters() {
        const [teams, tournaments] = await Promise.all([
            this.prisma.teams.findMany({
                where: {
                    status: 'active',
                    team_members: {
                        some: {
                            status: 'active',
                            users: { user_roles: { some: { role_code: 'PLAYER' } } },
                        },
                    },
                },
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: { id: true, name: true },
            }),
            this.prisma.tournaments.findMany({
                where: {
                    tournament_team_registrations: {
                        some: { tournament_team_players: { some: {} } },
                    },
                },
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: { id: true, name: true },
            }),
        ]);
        return {
            teams: teams.map(({ id, name }) => ({ id: id.toString(), name })),
            tournaments: tournaments.map(({ id, name }) => ({
                id: id.toString(),
                name,
            })),
        };
    }
    async create(dto, photo) {
        this.assertValidBirthDate(dto.birthDate);
        const uploadedPhoto = photo
            ? await this.imageStorage.saveUserPhoto(photo)
            : null;
        try {
            const player = await this.prisma.$transaction(async (transaction) => {
                const user = await transaction.users.create({
                    data: {
                        id_number: dto.idNumber.trim(),
                        document_type: dto.documentType.trim(),
                        full_name: dto.fullName.trim(),
                        birth_date: new Date(dto.birthDate),
                        gender: dto.gender,
                        email: dto.email.trim().toLowerCase(),
                        phone: dto.phone?.trim() || null,
                        photo_url: uploadedPhoto?.url ?? null,
                        photo_public_id: uploadedPhoto?.publicId ?? null,
                        password_hash: await (0, bcryptjs_1.hash)(dto.password, 12),
                        status: 'active',
                    },
                    select: { id: true },
                });
                await transaction.user_roles.create({
                    data: { user_id: user.id, role_code: 'PLAYER' },
                });
                return transaction.users.findUniqueOrThrow({
                    where: { id: user.id },
                    select: playerSelect,
                });
            });
            return this.toResponse(player);
        }
        catch (error) {
            if (uploadedPhoto)
                await this.imageStorage.deleteSafely(uploadedPhoto);
            throw error;
        }
    }
    async bulkCreate(dto) {
        const temporaryPassword = (0, players_constants_1.getTemporaryPlayerPassword)();
        const skipped = [];
        const pending = [];
        const seenDocuments = new Set();
        const seenEmails = new Set();
        dto.players.forEach((player) => {
            this.assertValidBirthDate(player.birthDate);
            const idNumber = player.idNumber.trim();
            const email = player.email.trim().toLowerCase();
            if (seenDocuments.has(idNumber) || seenEmails.has(email)) {
                skipped.push({
                    row: player.row,
                    idNumber,
                    fullName: player.fullName.trim(),
                    reason: 'duplicate_in_file',
                    detail: 'El archivo trae este jugador más de una vez.',
                });
                return;
            }
            seenDocuments.add(idNumber);
            seenEmails.add(email);
            pending.push({ ...player, idNumber, email });
        });
        if (pending.length > 0) {
            const existing = await this.prisma.users.findMany({
                where: {
                    OR: [
                        { id_number: { in: pending.map(({ idNumber }) => idNumber) } },
                        {
                            email: {
                                in: pending.map(({ email }) => email),
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
                select: { id_number: true, email: true },
            });
            const takenDocuments = new Set(existing.map(({ id_number }) => id_number));
            const takenEmails = new Set(existing.map(({ email }) => email.toLowerCase()));
            for (let index = pending.length - 1; index >= 0; index -= 1) {
                const player = pending[index];
                const documentTaken = takenDocuments.has(player.idNumber);
                const emailTaken = takenEmails.has(player.email);
                if (!documentTaken && !emailTaken)
                    continue;
                skipped.push({
                    row: player.row,
                    idNumber: player.idNumber,
                    fullName: player.fullName.trim(),
                    reason: documentTaken ? 'duplicate_document' : 'duplicate_email',
                    detail: documentTaken
                        ? 'Ya existe una cuenta con ese número de documento.'
                        : 'Ya existe una cuenta con ese correo electrónico.',
                });
                pending.splice(index, 1);
            }
        }
        let created = 0;
        if (pending.length > 0) {
            const passwordHash = await (0, bcryptjs_1.hash)(temporaryPassword, 12);
            await this.prisma.$transaction(async (transaction) => {
                for (const player of pending) {
                    const user = await transaction.users.create({
                        data: {
                            id_number: player.idNumber,
                            document_type: player.documentType.trim(),
                            full_name: player.fullName.trim(),
                            birth_date: new Date(player.birthDate),
                            gender: player.gender,
                            email: player.email,
                            phone: player.phone?.trim() || null,
                            password_hash: passwordHash,
                            status: 'active',
                        },
                        select: { id: true },
                    });
                    await transaction.user_roles.create({
                        data: { user_id: user.id, role_code: 'PLAYER' },
                    });
                    created += 1;
                }
            });
        }
        return {
            received: dto.players.length,
            created,
            skipped: skipped.sort((left, right) => left.row - right.row),
            temporaryPassword,
        };
    }
    async update(id, dto, photo) {
        const current = await this.prisma.users.findFirst({
            where: { id, user_roles: { some: { role_code: 'PLAYER' } } },
            select: { id: true, photo_url: true, photo_public_id: true },
        });
        if (!current) {
            throw new common_1.NotFoundException(`El jugador con ID ${id.toString()} no existe.`);
        }
        if (dto.birthDate)
            this.assertValidBirthDate(dto.birthDate);
        const uploadedPhoto = photo
            ? await this.imageStorage.saveUserPhoto(photo)
            : null;
        const photoUrl = uploadedPhoto?.url ?? current.photo_url;
        let player;
        try {
            player = await this.prisma.users.update({
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
                select: playerSelect,
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
        return this.toResponse(player);
    }
    async block(id, requestingUserId, dto) {
        if (id === requestingUserId) {
            throw new common_1.BadRequestException('No puedes bloquear tu propia cuenta.');
        }
        await this.ensurePlayer(id);
        const now = new Date();
        const blockedUntil = this.calculateBlockedUntil(now, dto.duration);
        const actor = await this.prisma.users.findUnique({
            where: { id: requestingUserId },
            select: { full_name: true },
        });
        const player = await this.prisma.$transaction(async (transaction) => {
            const updated = await transaction.users.update({
                where: { id },
                data: {
                    status: 'inactive',
                    blocked_until: blockedUntil,
                    block_reason: dto.reason.trim(),
                    blocked_by: requestingUserId,
                    block_source_action_id: null,
                    updated_at: now,
                },
                select: playerSelect,
            });
            await transaction.auth_sessions.updateMany({
                where: { user_id: id, revoked_at: null },
                data: { revoked_at: now },
            });
            await transaction.notifications.create({
                data: {
                    user_id: id,
                    type: 'system',
                    title: `Tu cuenta fue bloqueada por ${BLOCK_DURATION_LABELS[dto.duration]}`,
                    message: `Tu cuenta fue bloqueada por ${BLOCK_DURATION_LABELS[dto.duration]}, hasta el ${this.formatBlockDate(blockedUntil)}. Durante ese tiempo no podrás integrar equipos nuevos ni inscribirte en otros torneos. Motivo: ${dto.reason.trim()}`,
                    entity_type: 'user_block',
                    entity_id: id.toString(),
                    metadata: {
                        reason: dto.reason.trim(),
                        duration: dto.duration,
                        durationLabel: BLOCK_DURATION_LABELS[dto.duration],
                        blockedUntil: blockedUntil.toISOString(),
                        actionUrl: '/profile',
                        actionLabel: 'Ver mi perfil',
                    },
                },
            });
            await this.notifyBlockRecipients(transaction, id, requestingUserId, {
                title: 'Un jugador fue bloqueado',
                message: `${updated.full_name} fue bloqueado por ${BLOCK_DURATION_LABELS[dto.duration]}, hasta el ${this.formatBlockDate(blockedUntil)}. Bloqueo registrado por ${actor?.full_name ?? 'un administrador'}. No podrá integrar equipos nuevos ni inscribirse en otros torneos. Motivo: ${dto.reason.trim()}`,
                metadata: {
                    reason: dto.reason.trim(),
                    duration: dto.duration,
                    durationLabel: BLOCK_DURATION_LABELS[dto.duration],
                    blockedUntil: blockedUntil.toISOString(),
                    playerId: id.toString(),
                    playerName: updated.full_name,
                    blockedBy: requestingUserId.toString(),
                    blockedByName: actor?.full_name ?? null,
                    actionUrl: '/players',
                    actionLabel: 'Ver jugadores',
                },
            });
            return updated;
        });
        return this.toResponse(player);
    }
    async findBlockNotificationRecipients(transaction, playerId, actorUserId) {
        const [superAdministrators, rosterEntries] = await Promise.all([
            transaction.users.findMany({
                where: {
                    status: 'active',
                    user_roles: { some: { role_code: 'SUPER_ADMIN' } },
                },
                select: { id: true },
            }),
            transaction.tournament_team_players.findMany({
                where: {
                    player_id: playerId,
                    tournament_team_registrations: {
                        request_status: { in: ['pending', 'changes_requested', 'approved'] },
                        tournaments: {
                            status: 'active',
                            phase: { notIn: ['finished', 'archived', 'cancelled'] },
                        },
                    },
                },
                select: {
                    tournament_team_registrations: {
                        select: { tournaments: { select: { association_id: true } } },
                    },
                },
            }),
        ]);
        const associationIds = [
            ...new Set(rosterEntries.map(({ tournament_team_registrations }) => tournament_team_registrations.tournaments.association_id)),
        ];
        const associationStaff = associationIds.length
            ? await transaction.associations.findMany({
                where: { id: { in: associationIds } },
                select: {
                    owner_user_id: true,
                    association_administrators: {
                        where: { status: 'active' },
                        select: { user_id: true },
                    },
                },
            })
            : [];
        const recipients = new Set([
            actorUserId,
            ...superAdministrators.map(({ id }) => id),
        ]);
        associationStaff.forEach((association) => {
            recipients.add(association.owner_user_id);
            association.association_administrators.forEach(({ user_id }) => recipients.add(user_id));
        });
        recipients.delete(playerId);
        return [...recipients];
    }
    async notifyBlockRecipients(transaction, playerId, actorUserId, notification) {
        const recipients = await this.findBlockNotificationRecipients(transaction, playerId, actorUserId);
        if (recipients.length === 0)
            return;
        await transaction.notifications.createMany({
            data: recipients.map((userId) => ({
                user_id: userId,
                type: 'system',
                title: notification.title,
                message: notification.message,
                entity_type: 'user_block',
                entity_id: playerId.toString(),
                metadata: notification.metadata,
            })),
        });
    }
    async unblock(id, requestingUserId) {
        await this.ensurePlayer(id);
        const actor = await this.prisma.users.findUnique({
            where: { id: requestingUserId },
            select: { full_name: true },
        });
        const player = await this.prisma.$transaction(async (transaction) => {
            const updated = await transaction.users.update({
                where: { id },
                data: {
                    status: 'active',
                    blocked_until: null,
                    block_reason: null,
                    blocked_by: null,
                    block_source_action_id: null,
                    updated_at: new Date(),
                },
                select: playerSelect,
            });
            await transaction.notifications.create({
                data: {
                    user_id: id,
                    type: 'account',
                    title: 'Tu cuenta fue reactivada',
                    message: 'El bloqueo de tu cuenta fue retirado. Ya puedes volver a utilizar todas tus funciones habilitadas.',
                    entity_type: 'user_block',
                    entity_id: id.toString(),
                    metadata: {
                        actionUrl: '/profile',
                        actionLabel: 'Ver mi perfil',
                    },
                },
            });
            await this.notifyBlockRecipients(transaction, id, requestingUserId, {
                title: 'Se levantó el bloqueo de un jugador',
                message: `${updated.full_name} puede volver a usar su cuenta. Bloqueo retirado por ${actor?.full_name ?? 'un administrador'}.`,
                metadata: {
                    playerId: id.toString(),
                    playerName: updated.full_name,
                    unblockedBy: requestingUserId.toString(),
                    unblockedByName: actor?.full_name ?? null,
                    actionUrl: '/players',
                    actionLabel: 'Ver jugadores',
                },
            });
            return updated;
        });
        return this.toResponse(player);
    }
    async ensurePlayer(id) {
        const player = await this.prisma.users.findFirst({
            where: { id, user_roles: { some: { role_code: 'PLAYER' } } },
            select: { id: true },
        });
        if (!player) {
            throw new common_1.NotFoundException(`El jugador con ID ${id.toString()} no existe.`);
        }
    }
    async releaseExpiredBlocks() {
        const now = new Date();
        await this.prisma.users.updateMany({
            where: {
                status: 'inactive',
                block_reason: { not: null },
                blocked_until: { lte: now },
            },
            data: {
                status: 'active',
                blocked_until: null,
                block_reason: null,
                blocked_by: null,
                block_source_action_id: null,
                updated_at: now,
            },
        });
    }
    assertValidBirthDate(value) {
        const birthDate = new Date(value);
        if (birthDate > new Date()) {
            throw new common_1.BadRequestException('La fecha de nacimiento no puede estar en el futuro.');
        }
    }
    calculateBlockedUntil(start, duration) {
        const end = new Date(start);
        if (duration === 'one_week')
            end.setDate(end.getDate() + 7);
        if (duration === 'one_month')
            end.setMonth(end.getMonth() + 1);
        if (duration === 'three_months')
            end.setMonth(end.getMonth() + 3);
        if (duration === 'six_months')
            end.setMonth(end.getMonth() + 6);
        if (duration === 'nine_months')
            end.setMonth(end.getMonth() + 9);
        if (duration === 'one_year')
            end.setFullYear(end.getFullYear() + 1);
        return end;
    }
    formatBlockDate(value) {
        return new Intl.DateTimeFormat('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota',
        }).format(value);
    }
    toResponse(player) {
        const teams = player.team_members.map(({ teams }) => ({
            id: teams.id.toString(),
            name: teams.name,
        }));
        const tournamentMap = new Map();
        player.team_members.forEach(({ tournament_team_players }) => {
            tournament_team_players.forEach((registration) => {
                const tournament = registration.tournament_team_registrations.tournaments;
                tournamentMap.set(tournament.id.toString(), {
                    id: tournament.id.toString(),
                    name: tournament.name,
                });
            });
        });
        return {
            id: player.id.toString(),
            idNumber: player.id_number,
            documentType: player.document_type,
            fullName: player.full_name,
            birthDate: player.birth_date.toISOString().slice(0, 10),
            gender: player.gender,
            age: this.calculateAge(player.birth_date),
            email: player.email,
            phone: player.phone,
            photoUrl: player.photo_url,
            status: player.status === 'inactive' ? 'blocked' : 'active',
            blockReason: player.block_reason,
            blockedUntil: player.blocked_until?.toISOString() ?? null,
            roles: player.user_roles.map(({ role_code }) => role_code),
            teams,
            tournaments: [...tournamentMap.values()],
            createdAt: player.created_at.toISOString(),
            updatedAt: player.updated_at.toISOString(),
        };
    }
    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getUTCFullYear();
        const birthdayHasNotPassed = today.getMonth() < birthDate.getUTCMonth() ||
            (today.getMonth() === birthDate.getUTCMonth() &&
                today.getDate() < birthDate.getUTCDate());
        if (birthdayHasNotPassed)
            age -= 1;
        return age;
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService])
], PlayersService);
//# sourceMappingURL=players.service.js.map