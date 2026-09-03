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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const MANAGEMENT_ROLES = ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'];
const teamCardSelect = {
    id: true,
    name: true,
    sport_type: true,
    modality: true,
    primary_color: true,
    secondary_color: true,
    captain_user_id: true,
    photo_url: true,
    status: true,
    created_at: true,
    updated_at: true,
    users_teams_captain_user_idTousers: {
        select: { id: true, full_name: true },
    },
    team_members: {
        where: { status: 'active' },
        orderBy: { created_at: 'asc' },
        select: {
            user_id: true,
            member_role: true,
            users: { select: { full_name: true, photo_url: true } },
        },
    },
    tournament_team_registrations: {
        select: {
            request_status: true,
            tournaments: {
                select: { id: true, name: true, max_players_per_team: true },
            },
        },
    },
};
let TeamsService = class TeamsService {
    prisma;
    imageStorage;
    constructor(prisma, imageStorage) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
    }
    async create(requestingUserId, dto, photo) {
        const roles = await this.findRoleCodes(requestingUserId);
        const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
        const captainUserId = isManager
            ? dto.captainUserId
                ? BigInt(dto.captainUserId)
                : null
            : requestingUserId;
        if (!captainUserId) {
            throw new common_1.BadRequestException('Debes seleccionar un capitán para el equipo.');
        }
        const requestedMemberIds = new Set((dto.memberUserIds ?? []).map((id) => BigInt(id)));
        requestedMemberIds.add(captainUserId);
        const memberIds = [...requestedMemberIds];
        await this.assertActivePlayers(memberIds, captainUserId);
        const uploadedPhoto = photo
            ? await this.imageStorage.saveTeamPhoto(photo)
            : null;
        try {
            const team = await this.prisma.$transaction(async (transaction) => {
                const created = await transaction.teams.create({
                    data: {
                        name: dto.name.trim(),
                        sport_type: dto.sportType.trim(),
                        modality: dto.modality.trim(),
                        primary_color: dto.primaryColor ?? null,
                        secondary_color: dto.secondaryColor ?? null,
                        captain_user_id: captainUserId,
                        created_by: requestingUserId,
                        photo_url: uploadedPhoto?.url ?? null,
                        photo_public_id: uploadedPhoto?.publicId ?? null,
                        status: dto.status ?? 'active',
                    },
                    select: { id: true },
                });
                await transaction.team_members.createMany({
                    data: memberIds.map((userId) => ({
                        team_id: created.id,
                        user_id: userId,
                        member_role: 'player',
                        status: 'active',
                    })),
                });
                const notificationRecipients = memberIds.filter((userId) => userId !== requestingUserId);
                if (notificationRecipients.length > 0) {
                    await transaction.notifications.createMany({
                        data: notificationRecipients.map((userId) => {
                            const isCaptain = userId === captainUserId;
                            return {
                                user_id: userId,
                                type: 'team',
                                title: isCaptain
                                    ? 'Fuiste designado capitán'
                                    : 'Te agregaron a un equipo',
                                message: isCaptain
                                    ? `Ahora eres el capitán de ${dto.name.trim()}.`
                                    : `Fuiste agregado como integrante de ${dto.name.trim()}.`,
                                entity_type: 'team',
                                entity_id: created.id.toString(),
                                metadata: {
                                    teamId: created.id.toString(),
                                    teamName: dto.name.trim(),
                                    actionUrl: `/teams/${created.id.toString()}`,
                                    actionLabel: 'Ver equipo',
                                },
                            };
                        }),
                    });
                }
                return created;
            });
            return this.findOne(team.id, requestingUserId);
        }
        catch (error) {
            if (uploadedPhoto)
                await this.imageStorage.deleteSafely(uploadedPhoto);
            throw error;
        }
    }
    async findAll(query, requestingUserId) {
        const roles = await this.findRoleCodes(requestingUserId);
        const where = await this.buildVisibleWhere(requestingUserId, roles);
        where.status = 'active';
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                {
                    users_teams_captain_user_idTousers: {
                        full_name: { contains: query.search, mode: 'insensitive' },
                    },
                },
            ];
        }
        if (query.tournamentId) {
            where.tournament_team_registrations = {
                some: {
                    tournament_id: BigInt(query.tournamentId),
                    request_status: query.registrationStatus,
                },
            };
        }
        else if (query.managedTournamentsOnly) {
            if (!roles.has('ASSOCIATION_ADMIN')) {
                throw new common_1.ForbiddenException('Este filtro solo está disponible para administradores de asociación.');
            }
            where.tournament_team_registrations = {
                some: {
                    request_status: 'approved',
                    tournaments: {
                        associations: {
                            OR: [
                                { owner_user_id: requestingUserId },
                                {
                                    association_administrators: {
                                        some: { user_id: requestingUserId, status: 'active' },
                                    },
                                },
                            ],
                        },
                    },
                },
            };
        }
        const skip = (query.page - 1) * query.pageSize;
        const [total, teams] = await this.prisma.$transaction([
            this.prisma.teams.count({ where }),
            this.prisma.teams.findMany({
                where,
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                skip,
                take: query.pageSize,
                select: teamCardSelect,
            }),
        ]);
        return {
            items: teams.map((team) => this.toResponse(team, requestingUserId, roles)),
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + teams.length < total,
        };
    }
    async findFilters(requestingUserId) {
        const roles = await this.findRoleCodes(requestingUserId);
        const where = await this.buildVisibleWhere(requestingUserId, roles);
        where.status = 'active';
        const registrations = await this.prisma.tournament_team_registrations.findMany({
            where: { teams: where },
            distinct: ['tournament_id'],
            orderBy: { tournament_id: 'asc' },
            select: { tournaments: { select: { id: true, name: true } } },
        });
        return {
            tournaments: registrations
                .map(({ tournaments }) => ({
                id: tournaments.id.toString(),
                name: tournaments.name,
            }))
                .sort((left, right) => left.name.localeCompare(right.name, 'es')),
        };
    }
    async findPlayerOptions(query) {
        const where = {
            status: 'active',
            user_roles: { some: { role_code: 'PLAYER' } },
            OR: query.search
                ? [
                    { full_name: { contains: query.search, mode: 'insensitive' } },
                    { email: { contains: query.search, mode: 'insensitive' } },
                ]
                : undefined,
        };
        const skip = (query.page - 1) * query.pageSize;
        const [total, players] = await this.prisma.$transaction([
            this.prisma.users.count({ where }),
            this.prisma.users.findMany({
                where,
                orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
                skip,
                take: query.pageSize,
                select: { id: true, full_name: true, email: true },
            }),
        ]);
        return {
            items: players.map((player) => ({
                id: player.id.toString(),
                fullName: player.full_name,
                email: player.email,
            })),
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + players.length < total,
        };
    }
    async findOne(id, requestingUserId) {
        const roles = await this.findRoleCodes(requestingUserId);
        const visibleWhere = await this.buildVisibleWhere(requestingUserId, roles);
        const team = await this.prisma.teams.findFirst({
            where: { AND: [{ id, status: 'active' }, visibleWhere] },
            select: teamCardSelect,
        });
        if (!team)
            throw new common_1.NotFoundException(`El equipo con ID ${id.toString()} no existe.`);
        return this.toResponse(team, requestingUserId, roles);
    }
    async findCarnets(id, requestingUserId, tournamentId) {
        const roles = await this.findRoleCodes(requestingUserId);
        if (!MANAGEMENT_ROLES.some((role) => roles.has(role))) {
            throw new common_1.ForbiddenException('Solo un administrador puede descargar los carnés del equipo.');
        }
        if (tournamentId) {
            const tournament = await this.prisma.tournaments.findUnique({
                where: { id: tournamentId },
                select: {
                    association_id: true,
                    tournament_team_registrations: {
                        where: { team_id: id, request_status: 'approved' },
                        select: { team_id: true },
                    },
                },
            });
            if (!tournament ||
                tournament.tournament_team_registrations.length === 0) {
                throw new common_1.BadRequestException('El equipo no está aprobado en este torneo.');
            }
            if (!roles.has('SUPER_ADMIN')) {
                const managedAssociation = await this.prisma.associations.findFirst({
                    where: {
                        id: tournament.association_id,
                        OR: [
                            { owner_user_id: requestingUserId },
                            {
                                association_administrators: {
                                    some: { user_id: requestingUserId, status: 'active' },
                                },
                            },
                        ],
                    },
                    select: { id: true },
                });
                if (!managedAssociation)
                    throw new common_1.ForbiddenException('No administras este torneo.');
            }
        }
        const team = await this.prisma.teams.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                sport_type: true,
                modality: true,
                primary_color: true,
                secondary_color: true,
                photo_url: true,
                status: true,
                team_members: {
                    where: {
                        status: 'active',
                        tournament_team_players: tournamentId
                            ? {
                                some: {
                                    tournament_id: tournamentId,
                                    registration_status: 'approved',
                                },
                            }
                            : undefined,
                    },
                    orderBy: [{ users: { full_name: 'asc' } }, { user_id: 'asc' }],
                    select: {
                        user_id: true,
                        users: {
                            select: {
                                full_name: true,
                                id_number: true,
                                document_type: true,
                                birth_date: true,
                                phone: true,
                                email: true,
                                photo_url: true,
                            },
                        },
                    },
                },
                tournament_team_registrations: {
                    where: {
                        request_status: 'approved',
                        tournament_id: tournamentId,
                    },
                    orderBy: [{ tournaments: { start_date: 'desc' } }],
                    select: {
                        tournaments: {
                            select: {
                                id: true,
                                name: true,
                                start_date: true,
                                end_date: true,
                            },
                        },
                    },
                },
            },
        });
        if (!team || team.status !== 'active') {
            throw new common_1.NotFoundException(`El equipo con ID ${id.toString()} no existe.`);
        }
        return {
            teamId: team.id.toString(),
            teamName: team.name,
            sportType: team.sport_type,
            modality: team.modality,
            primaryColor: team.primary_color,
            secondaryColor: team.secondary_color,
            photoUrl: team.photo_url,
            tournaments: team.tournament_team_registrations.map(({ tournaments }) => ({
                id: tournaments.id.toString(),
                name: tournaments.name,
                startDate: tournaments.start_date.toISOString().slice(0, 10),
                endDate: tournaments.end_date?.toISOString().slice(0, 10) ?? null,
            })),
            players: team.team_members.map(({ user_id, users }) => ({
                id: user_id.toString(),
                fullName: users.full_name,
                idNumber: users.id_number,
                documentType: users.document_type,
                birthDate: users.birth_date.toISOString().slice(0, 10),
                phone: users.phone,
                email: users.email,
                photoUrl: users.photo_url,
            })),
        };
    }
    async update(id, requestingUserId, dto, photo) {
        const roles = await this.findRoleCodes(requestingUserId);
        const current = await this.prisma.teams.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                captain_user_id: true,
                photo_url: true,
                photo_public_id: true,
                status: true,
                team_members: {
                    where: { status: 'active' },
                    select: { user_id: true },
                },
            },
        });
        if (!current || current.status !== 'active') {
            throw new common_1.NotFoundException(`El equipo con ID ${id.toString()} no existe.`);
        }
        const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
        if (!isManager && current.captain_user_id !== requestingUserId) {
            throw new common_1.ForbiddenException('Solo el capitán o un administrador puede editar el equipo.');
        }
        const nextCaptainId = dto.captainUserId
            ? BigInt(dto.captainUserId)
            : current.captain_user_id;
        const nextMemberIds = dto.memberUserIds
            ? [...new Set(dto.memberUserIds.map((userId) => BigInt(userId)))]
            : null;
        nextMemberIds?.push(...(nextMemberIds.some((userId) => userId === nextCaptainId)
            ? []
            : [nextCaptainId]));
        await this.assertActivePlayers(nextMemberIds ?? [nextCaptainId], nextCaptainId);
        const currentMemberIds = new Set(current.team_members.map(({ user_id }) => user_id));
        const nextMemberIdSet = new Set(nextMemberIds ?? currentMemberIds);
        const addedMemberIds = [...nextMemberIdSet].filter((userId) => !currentMemberIds.has(userId));
        const removedMemberIds = nextMemberIds
            ? [...currentMemberIds].filter((userId) => !nextMemberIdSet.has(userId))
            : [];
        const captainChanged = nextCaptainId !== current.captain_user_id;
        const nextTeamName = dto.name?.trim() || current.name;
        const uploadedPhoto = photo
            ? await this.imageStorage.saveTeamPhoto(photo)
            : null;
        const photoUrl = uploadedPhoto?.url ?? current.photo_url;
        try {
            await this.prisma.$transaction(async (transaction) => {
                await transaction.teams.update({
                    where: { id },
                    data: {
                        name: dto.name?.trim(),
                        sport_type: dto.sportType?.trim(),
                        modality: dto.modality?.trim(),
                        primary_color: dto.primaryColor,
                        secondary_color: dto.secondaryColor,
                        captain_user_id: nextCaptainId,
                        photo_url: photoUrl,
                        photo_public_id: uploadedPhoto?.publicId,
                        status: dto.status,
                        updated_at: new Date(),
                    },
                });
                if (nextCaptainId !== current.captain_user_id) {
                    await transaction.team_members.updateMany({
                        where: { team_id: id, user_id: current.captain_user_id },
                        data: { member_role: 'player' },
                    });
                    await transaction.team_members.upsert({
                        where: { team_id_user_id: { team_id: id, user_id: nextCaptainId } },
                        create: {
                            team_id: id,
                            user_id: nextCaptainId,
                            member_role: 'player',
                            status: 'active',
                        },
                        update: { member_role: 'player', status: 'active' },
                    });
                }
                if (nextMemberIds) {
                    await transaction.team_members.updateMany({
                        where: {
                            team_id: id,
                            user_id: { notIn: nextMemberIds },
                            status: 'active',
                        },
                        data: { status: 'inactive' },
                    });
                    await Promise.all(nextMemberIds.map((userId) => transaction.team_members.upsert({
                        where: { team_id_user_id: { team_id: id, user_id: userId } },
                        create: {
                            team_id: id,
                            user_id: userId,
                            member_role: 'player',
                            status: 'active',
                        },
                        update: { member_role: 'player', status: 'active' },
                    })));
                }
                const notifications = [
                    ...addedMemberIds
                        .filter((userId) => userId !== requestingUserId &&
                        (!captainChanged || userId !== nextCaptainId))
                        .map((userId) => ({
                        user_id: userId,
                        type: 'team',
                        title: 'Te agregaron a un equipo',
                        message: `Fuiste agregado como integrante de ${nextTeamName}.`,
                        entity_type: 'team',
                        entity_id: id.toString(),
                        metadata: {
                            teamId: id.toString(),
                            teamName: nextTeamName,
                            actionUrl: `/teams/${id.toString()}`,
                            actionLabel: 'Ver equipo',
                        },
                    })),
                    ...removedMemberIds
                        .filter((userId) => userId !== requestingUserId)
                        .map((userId) => ({
                        user_id: userId,
                        type: 'team',
                        title: 'Ya no perteneces al equipo',
                        message: `Fuiste retirado de ${nextTeamName}.`,
                        entity_type: 'team',
                        entity_id: id.toString(),
                        metadata: {
                            teamId: id.toString(),
                            teamName: nextTeamName,
                            actionUrl: '/teams',
                            actionLabel: 'Ver mis equipos',
                        },
                    })),
                ];
                if (captainChanged && nextCaptainId !== requestingUserId) {
                    notifications.push({
                        user_id: nextCaptainId,
                        type: 'team',
                        title: 'Ahora eres capitán',
                        message: `Te asignaron como capitán de ${nextTeamName}.`,
                        entity_type: 'team',
                        entity_id: id.toString(),
                        metadata: {
                            teamId: id.toString(),
                            teamName: nextTeamName,
                            actionUrl: `/teams/${id.toString()}`,
                            actionLabel: 'Ver equipo',
                        },
                    });
                }
                if (captainChanged &&
                    current.captain_user_id !== requestingUserId &&
                    !removedMemberIds.includes(current.captain_user_id)) {
                    notifications.push({
                        user_id: current.captain_user_id,
                        type: 'team',
                        title: 'Capitanía transferida',
                        message: `La capitanía de ${nextTeamName} fue asignada a otro integrante. Sigues formando parte del equipo.`,
                        entity_type: 'team',
                        entity_id: id.toString(),
                        metadata: {
                            teamId: id.toString(),
                            teamName: nextTeamName,
                            actionUrl: `/teams/${id.toString()}`,
                            actionLabel: 'Ver equipo',
                        },
                    });
                }
                if (notifications.length > 0) {
                    await transaction.notifications.createMany({ data: notifications });
                }
            });
            if (photo && current.photo_url) {
                await this.imageStorage.deleteSafely({
                    url: current.photo_url,
                    publicId: current.photo_public_id,
                });
            }
            return this.findOne(id, requestingUserId);
        }
        catch (error) {
            if (uploadedPhoto)
                await this.imageStorage.deleteSafely(uploadedPhoto);
            throw error;
        }
    }
    async leave(id, requestingUserId) {
        const team = await this.prisma.teams.findUnique({
            where: { id },
            select: { id: true, name: true, captain_user_id: true, status: true },
        });
        if (!team || team.status !== 'active') {
            throw new common_1.NotFoundException(`El equipo con ID ${id.toString()} no existe.`);
        }
        if (team.captain_user_id === requestingUserId) {
            throw new common_1.BadRequestException('El capitán no puede abandonar el equipo sin transferir primero la capitanía.');
        }
        const membership = await this.prisma.team_members.findUnique({
            where: { team_id_user_id: { team_id: id, user_id: requestingUserId } },
        });
        if (!membership || membership.status !== 'active') {
            throw new common_1.BadRequestException('No eres miembro activo de este equipo.');
        }
        const leavingPlayer = await this.prisma.users.findUnique({
            where: { id: requestingUserId },
            select: { full_name: true },
        });
        await this.prisma.$transaction(async (transaction) => {
            await transaction.team_members.update({
                where: {
                    team_id_user_id: { team_id: id, user_id: requestingUserId },
                },
                data: { status: 'inactive' },
            });
            await transaction.notifications.create({
                data: {
                    user_id: team.captain_user_id,
                    type: 'team',
                    title: 'Un integrante salió del equipo',
                    message: `${leavingPlayer?.full_name ?? 'Un jugador'} abandonó ${team.name}.`,
                    entity_type: 'team',
                    entity_id: id.toString(),
                    metadata: {
                        teamId: id.toString(),
                        teamName: team.name,
                        actionUrl: `/teams/${id.toString()}`,
                        actionLabel: 'Ver equipo',
                    },
                },
            });
        });
        return { id: id.toString(), message: `Saliste del equipo ${team.name}.` };
    }
    async remove(id, requestingUserId) {
        const roles = await this.findRoleCodes(requestingUserId);
        if (!MANAGEMENT_ROLES.some((role) => roles.has(role))) {
            throw new common_1.ForbiddenException('No tienes permisos para eliminar equipos.');
        }
        const team = await this.prisma.teams.findUnique({
            where: { id },
            include: {
                team_members: {
                    where: { status: 'active' },
                    select: { user_id: true },
                },
            },
        });
        if (!team || team.status !== 'active') {
            throw new common_1.NotFoundException(`El equipo con ID ${id.toString()} no existe.`);
        }
        await this.prisma.$transaction(async (transaction) => {
            await transaction.teams.update({
                where: { id },
                data: { status: 'inactive', updated_at: new Date() },
            });
            await transaction.team_members.updateMany({
                where: { team_id: id },
                data: { status: 'inactive' },
            });
            const recipientIds = team.team_members
                .map(({ user_id }) => user_id)
                .filter((userId) => userId !== requestingUserId);
            if (recipientIds.length > 0) {
                await transaction.notifications.createMany({
                    data: recipientIds.map((userId) => ({
                        user_id: userId,
                        type: 'team',
                        title: 'Equipo eliminado',
                        message: `${team.name} fue eliminado por un administrador. Su historial se conservará.`,
                        entity_type: 'team',
                        entity_id: id.toString(),
                        metadata: {
                            teamId: id.toString(),
                            teamName: team.name,
                            actionUrl: '/teams',
                            actionLabel: 'Ver mis equipos',
                        },
                    })),
                });
            }
        });
        return {
            id: id.toString(),
            message: `El equipo ${team.name} fue eliminado y su historial fue conservado.`,
        };
    }
    async findRoleCodes(userId) {
        const roles = await this.prisma.user_roles.findMany({
            where: { user_id: userId },
            select: { role_code: true },
        });
        return new Set(roles.map(({ role_code }) => role_code));
    }
    async buildVisibleWhere(userId, roles) {
        if (MANAGEMENT_ROLES.some((role) => roles.has(role)))
            return {};
        const visibleTeamIds = new Set();
        if (roles.has('PLAYER')) {
            const memberships = await this.prisma.team_members.findMany({
                where: { user_id: userId, status: 'active' },
                select: { team_id: true },
            });
            memberships.forEach(({ team_id }) => visibleTeamIds.add(team_id));
        }
        if (roles.has('REFEREE')) {
            const assignments = await this.prisma.match_referees.findMany({
                where: { referee_id: userId, assignment_status: { not: 'cancelled' } },
                select: {
                    matches: { select: { home_team_id: true, away_team_id: true } },
                },
            });
            assignments.forEach(({ matches }) => {
                visibleTeamIds.add(matches.home_team_id);
                visibleTeamIds.add(matches.away_team_id);
            });
        }
        return { id: { in: [...visibleTeamIds] } };
    }
    async assertActivePlayers(memberIds, captainId) {
        const users = await this.prisma.users.findMany({
            where: {
                id: { in: memberIds },
                status: 'active',
                user_roles: { some: { role_code: 'PLAYER' } },
            },
            select: { id: true },
        });
        if (users.length !== memberIds.length) {
            throw new common_1.BadRequestException('Todos los integrantes deben ser usuarios activos con rol de jugador.');
        }
        if (!users.some(({ id }) => id === captainId)) {
            throw new common_1.BadRequestException('El capitán debe ser un jugador activo.');
        }
    }
    toResponse(team, userId, roles) {
        const isManager = MANAGEMENT_ROLES.some((role) => roles.has(role));
        const isCaptain = team.captain_user_id === userId;
        const isMember = team.team_members.some(({ user_id }) => user_id === userId);
        const tournaments = team.tournament_team_registrations.map((registration) => ({
            id: registration.tournaments.id.toString(),
            name: registration.tournaments.name,
            registrationStatus: registration.request_status,
        }));
        const maxPlayers = team.tournament_team_registrations.reduce((maximum, registration) => Math.max(maximum, registration.tournaments.max_players_per_team), team.team_members.length);
        return {
            id: team.id.toString(),
            name: team.name,
            sportType: team.sport_type,
            modality: team.modality,
            primaryColor: team.primary_color,
            secondaryColor: team.secondary_color,
            photoUrl: team.photo_url,
            status: team.status,
            captain: {
                id: team.users_teams_captain_user_idTousers.id.toString(),
                fullName: team.users_teams_captain_user_idTousers.full_name,
            },
            members: team.team_members.map((member) => ({
                id: member.user_id.toString(),
                fullName: member.users.full_name,
                photoUrl: member.users.photo_url,
                role: member.member_role,
            })),
            memberCount: team.team_members.length,
            maxPlayers,
            tournaments,
            permissions: {
                isMember,
                isCaptain,
                canEnter: true,
                canEdit: isManager || isCaptain,
                canLeave: roles.has('PLAYER') && isMember && !isCaptain,
                canDelete: isManager,
            },
            createdAt: team.created_at.toISOString(),
            updatedAt: team.updated_at.toISOString(),
        };
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map