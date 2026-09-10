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
exports.RefereesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ACTIVE_ASSIGNMENT_STATUSES = ['pending', 'accepted'];
const refereeMatchSelect = {
    referee_role: true,
    assignment_status: true,
    matches: {
        select: {
            id: true,
            match_date: true,
            venue: true,
            stage: true,
            round_number: true,
            home_score: true,
            away_score: true,
            status: true,
            tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations: {
                select: {
                    teams: { select: { id: true, name: true } },
                    tournaments: { select: { id: true, name: true } },
                },
            },
            tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations: {
                select: { teams: { select: { id: true, name: true } } },
            },
        },
    },
};
let RefereesService = class RefereesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search) {
        const normalizedSearch = search?.trim();
        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
        const where = {
            status: 'active',
            user_roles: { some: { role_code: 'REFEREE' } },
            OR: normalizedSearch
                ? [
                    { full_name: { contains: normalizedSearch, mode: 'insensitive' } },
                    { email: { contains: normalizedSearch, mode: 'insensitive' } },
                    { id_number: { contains: normalizedSearch, mode: 'insensitive' } },
                ]
                : undefined,
        };
        const [referees, allActiveReferees, directedCounts, upcomingCounts, occupiedToday, availableTodayRows,] = await Promise.all([
            this.prisma.users.findMany({
                where,
                orderBy: [{ full_name: 'asc' }, { id: 'asc' }],
                select: {
                    id: true,
                    full_name: true,
                    email: true,
                    phone: true,
                    id_number: true,
                    document_type: true,
                    photo_url: true,
                },
            }),
            this.prisma.users.findMany({
                where: {
                    status: 'active',
                    user_roles: { some: { role_code: 'REFEREE' } },
                },
                select: { id: true },
            }),
            this.prisma.match_referees.groupBy({
                by: ['referee_id'],
                where: {
                    assignment_status: 'accepted',
                    matches: { status: 'played' },
                },
                _count: { _all: true },
            }),
            this.prisma.match_referees.groupBy({
                by: ['referee_id'],
                where: {
                    assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                    matches: {
                        status: { not: 'played' },
                        match_date: { gte: now },
                    },
                },
                _count: { _all: true },
            }),
            this.prisma.match_referees.findMany({
                where: {
                    assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                    matches: {
                        match_date: { gte: startOfToday, lt: startOfTomorrow },
                    },
                },
                distinct: ['referee_id'],
                select: { referee_id: true },
            }),
            this.prisma.referee_availability.findMany({
                where: {
                    status: 'active',
                    starts_at: { lt: startOfTomorrow },
                    ends_at: { gt: startOfToday },
                },
                distinct: ['referee_id'],
                select: { referee_id: true },
            }),
        ]);
        const directedByReferee = new Map(directedCounts.map((item) => [
            item.referee_id.toString(),
            item._count._all,
        ]));
        const upcomingByReferee = new Map(upcomingCounts.map((item) => [
            item.referee_id.toString(),
            item._count._all,
        ]));
        const occupiedIds = new Set(occupiedToday.map(({ referee_id }) => referee_id.toString()));
        const declaredAvailableIds = new Set(availableTodayRows.map(({ referee_id }) => referee_id.toString()));
        const availableToday = allActiveReferees.filter(({ id }) => declaredAvailableIds.has(id.toString()) &&
            !occupiedIds.has(id.toString())).length;
        const items = referees.map((referee) => ({
            id: referee.id.toString(),
            fullName: referee.full_name,
            email: referee.email,
            phone: referee.phone,
            idNumber: referee.id_number,
            documentType: referee.document_type,
            photoUrl: referee.photo_url,
            directedMatches: directedByReferee.get(referee.id.toString()) ?? 0,
            upcomingMatches: upcomingByReferee.get(referee.id.toString()) ?? 0,
            availableToday: declaredAvailableIds.has(referee.id.toString()) &&
                !occupiedIds.has(referee.id.toString()),
        }));
        return {
            items,
            metrics: {
                total: allActiveReferees.length,
                availableToday,
            },
        };
    }
    async findMatches(id, requestingUserId, query) {
        const roles = await this.findRoleCodes(requestingUserId);
        const isManager = roles.has('SUPER_ADMIN') || roles.has('ASSOCIATION_ADMIN');
        if (id !== requestingUserId && !isManager) {
            throw new common_1.ForbiddenException('Como árbitro solamente puedes consultar tus propios partidos.');
        }
        const referee = await this.prisma.users.findFirst({
            where: { id, user_roles: { some: { role_code: 'REFEREE' } } },
            select: { id: true },
        });
        if (!referee) {
            throw new common_1.NotFoundException(`El árbitro con ID ${id.toString()} no existe.`);
        }
        const now = new Date();
        const matchWhere = query.kind === 'past'
            ? {
                OR: [{ status: 'played' }, { match_date: { lt: now } }],
            }
            : {
                status: { not: 'played' },
                match_date: { gte: now },
            };
        const where = {
            referee_id: id,
            assignment_status: query.kind === 'past'
                ? 'accepted'
                : { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
            matches: matchWhere,
        };
        const skip = (query.page - 1) * query.pageSize;
        const [total, assignments] = await this.prisma.$transaction([
            this.prisma.match_referees.count({ where }),
            this.prisma.match_referees.findMany({
                where,
                orderBy: [
                    {
                        matches: {
                            match_date: {
                                sort: query.kind === 'past' ? 'desc' : 'asc',
                                nulls: 'last',
                            },
                        },
                    },
                    { match_id: query.kind === 'past' ? 'desc' : 'asc' },
                ],
                skip,
                take: query.pageSize,
                select: refereeMatchSelect,
            }),
        ]);
        return {
            items: assignments.map((assignment) => this.toMatchResponse(assignment)),
            page: query.page,
            pageSize: query.pageSize,
            total,
            hasNextPage: skip + assignments.length < total,
        };
    }
    async findAvailability(id, requestingUserId, query) {
        const roles = await this.findRoleCodes(requestingUserId);
        const isManager = roles.has('SUPER_ADMIN') || roles.has('ASSOCIATION_ADMIN');
        if (id !== requestingUserId && !isManager) {
            throw new common_1.ForbiddenException('Como árbitro solamente puedes consultar tu propia disponibilidad.');
        }
        await this.assertRefereeExists(id);
        const from = query.from ? new Date(query.from) : new Date();
        const to = query.to ? new Date(query.to) : undefined;
        if (to && to <= from) {
            throw new common_1.BadRequestException('La fecha final del filtro debe ser posterior a la inicial.');
        }
        const rows = await this.prisma.referee_availability.findMany({
            where: {
                referee_id: id,
                status: 'active',
                ends_at: { gte: from },
                starts_at: to ? { lte: to } : undefined,
            },
            orderBy: [{ starts_at: 'asc' }, { id: 'asc' }],
        });
        return rows.map((row) => this.toAvailabilityResponse(row));
    }
    async createAvailability(refereeId, dto) {
        await this.assertRefereeExists(refereeId);
        const startsAt = new Date(dto.startsAt);
        const endsAt = new Date(dto.endsAt);
        this.assertValidAvailabilityRange(startsAt, endsAt);
        await this.assertAvailabilityDoesNotOverlap(refereeId, startsAt, endsAt);
        const row = await this.prisma.referee_availability.create({
            data: {
                referee_id: refereeId,
                starts_at: startsAt,
                ends_at: endsAt,
                notes: dto.notes?.trim() || null,
            },
        });
        return this.toAvailabilityResponse(row);
    }
    async updateAvailability(refereeId, availabilityId, dto) {
        const current = await this.findOwnedAvailability(refereeId, availabilityId);
        await this.assertAvailabilityNotCommitted(current);
        const startsAt = dto.startsAt ? new Date(dto.startsAt) : current.starts_at;
        const endsAt = dto.endsAt ? new Date(dto.endsAt) : current.ends_at;
        this.assertValidAvailabilityRange(startsAt, endsAt);
        await this.assertAvailabilityDoesNotOverlap(refereeId, startsAt, endsAt, availabilityId);
        const row = await this.prisma.referee_availability.update({
            where: { id: availabilityId },
            data: {
                starts_at: dto.startsAt ? startsAt : undefined,
                ends_at: dto.endsAt ? endsAt : undefined,
                notes: dto.notes !== undefined ? dto.notes.trim() || null : undefined,
                updated_at: new Date(),
            },
        });
        return this.toAvailabilityResponse(row);
    }
    async removeAvailability(refereeId, availabilityId) {
        const current = await this.findOwnedAvailability(refereeId, availabilityId);
        await this.assertAvailabilityNotCommitted(current);
        await this.prisma.referee_availability.update({
            where: { id: availabilityId },
            data: { status: 'cancelled', updated_at: new Date() },
        });
        return { message: 'El bloque de disponibilidad fue eliminado.' };
    }
    async removeRole(id, actorId) {
        const refereeRole = await this.prisma.user_roles.findUnique({
            where: { user_id_role_code: { user_id: id, role_code: 'REFEREE' } },
            select: { user_id: true },
        });
        if (!refereeRole) {
            throw new common_1.NotFoundException(`El árbitro con ID ${id.toString()} no existe.`);
        }
        const now = new Date();
        const futureAssignments = await this.prisma.match_referees.findMany({
            where: {
                referee_id: id,
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                matches: { status: { not: 'played' }, match_date: { gte: now } },
            },
            select: {
                match_id: true,
                assignment_status: true,
                assigned_by: true,
            },
        });
        await this.prisma.$transaction(async (transaction) => {
            await transaction.user_roles.delete({
                where: { user_id_role_code: { user_id: id, role_code: 'REFEREE' } },
            });
            await transaction.user_roles.upsert({
                where: { user_id_role_code: { user_id: id, role_code: 'PLAYER' } },
                create: { user_id: id, role_code: 'PLAYER' },
                update: {},
            });
            await transaction.tournament_referees.updateMany({
                where: { user_id: id, status: 'active' },
                data: { status: 'inactive' },
            });
            await transaction.match_referees.updateMany({
                where: {
                    referee_id: id,
                    assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                    matches: {
                        status: { not: 'played' },
                        match_date: { gte: now },
                    },
                },
                data: {
                    assignment_status: 'cancelled',
                    responded_at: now,
                    response_notes: 'El rol de árbitro fue retirado.',
                    updated_at: now,
                },
            });
            if (futureAssignments.length > 0) {
                await transaction.referee_assignment_events.createMany({
                    data: futureAssignments.map((assignment) => ({
                        match_id: assignment.match_id,
                        referee_id: id,
                        actor_user_id: actorId,
                        event_type: 'cancelled',
                        previous_status: assignment.assignment_status,
                        new_status: 'cancelled',
                        reason: 'El rol de árbitro fue retirado.',
                    })),
                });
                const managerIds = new Set(futureAssignments
                    .map(({ assigned_by }) => assigned_by)
                    .filter((value) => value !== null));
                managerIds.delete(actorId);
                if (managerIds.size > 0) {
                    await transaction.notifications.createMany({
                        data: [...managerIds].map((managerId) => ({
                            user_id: managerId,
                            type: 'match',
                            title: 'Asignaciones arbitrales canceladas',
                            message: `Se retiró el rol del árbitro y se cancelaron ${futureAssignments.length} asignaciones futuras. Debes gestionar sus reemplazos.`,
                            entity_type: 'user_roles',
                            entity_id: id.toString(),
                            metadata: {
                                refereeId: id.toString(),
                                actionUrl: '/referees',
                                actionLabel: 'Gestionar reemplazos',
                            },
                        })),
                    });
                }
            }
            await transaction.notifications.create({
                data: {
                    user_id: id,
                    type: 'account',
                    title: 'Tu rol de árbitro fue retirado',
                    message: 'Ahora tienes el rol de jugador. Tus asignaciones arbitrales futuras fueron canceladas; tu historial de partidos se conserva.',
                    entity_type: 'user_roles',
                    entity_id: id.toString(),
                    metadata: {
                        removedRoles: ['REFEREE'],
                        addedRoles: ['PLAYER'],
                        actionUrl: '/profile',
                        actionLabel: 'Ver mi perfil',
                    },
                },
            });
        });
        const roles = await this.prisma.user_roles.findMany({
            where: { user_id: id },
            orderBy: { role_code: 'asc' },
            select: { role_code: true },
        });
        return {
            id: id.toString(),
            roles: roles.map(({ role_code }) => role_code),
            message: 'El rol de árbitro fue reemplazado por el rol de jugador.',
        };
    }
    async findRoleCodes(userId) {
        const roles = await this.prisma.user_roles.findMany({
            where: { user_id: userId },
            select: { role_code: true },
        });
        return new Set(roles.map(({ role_code }) => role_code));
    }
    async assertRefereeExists(refereeId) {
        const referee = await this.prisma.users.findFirst({
            where: {
                id: refereeId,
                status: 'active',
                user_roles: { some: { role_code: 'REFEREE' } },
            },
            select: { id: true },
        });
        if (!referee) {
            throw new common_1.NotFoundException('El árbitro solicitado no existe o no está activo.');
        }
    }
    assertValidAvailabilityRange(startsAt, endsAt) {
        if (endsAt <= startsAt) {
            throw new common_1.BadRequestException('La hora final debe ser posterior a la hora inicial.');
        }
        if (endsAt <= new Date()) {
            throw new common_1.BadRequestException('La disponibilidad debe finalizar en una fecha futura.');
        }
    }
    async assertAvailabilityDoesNotOverlap(refereeId, startsAt, endsAt, excludedId) {
        const overlap = await this.prisma.referee_availability.findFirst({
            where: {
                referee_id: refereeId,
                id: excludedId ? { not: excludedId } : undefined,
                status: 'active',
                starts_at: { lt: endsAt },
                ends_at: { gt: startsAt },
            },
            select: { id: true },
        });
        if (overlap) {
            throw new common_1.ConflictException('Este horario se cruza con otro bloque de disponibilidad registrado.');
        }
    }
    async findOwnedAvailability(refereeId, availabilityId) {
        const row = await this.prisma.referee_availability.findFirst({
            where: { id: availabilityId, referee_id: refereeId, status: 'active' },
        });
        if (!row) {
            throw new common_1.NotFoundException('El bloque de disponibilidad no existe o ya fue eliminado.');
        }
        return row;
    }
    async assertAvailabilityNotCommitted(availability) {
        const assignments = await this.prisma.match_referees.findMany({
            where: {
                referee_id: availability.referee_id,
                assignment_status: { in: [...ACTIVE_ASSIGNMENT_STATUSES] },
                matches: {
                    match_date: {
                        gte: availability.starts_at,
                        lt: availability.ends_at,
                    },
                },
            },
            select: { match_id: true, matches: { select: { match_date: true } } },
        });
        const committed = assignments.find(({ matches }) => matches.match_date ? matches.match_date < availability.ends_at : false);
        if (committed) {
            throw new common_1.BadRequestException(`Este bloque respalda una asignación activa (partido ${committed.match_id.toString()}) y no se puede modificar ni eliminar. Primero reemplaza o cancela la asignación.`);
        }
    }
    toAvailabilityResponse(row) {
        return {
            id: row.id.toString(),
            startsAt: row.starts_at.toISOString(),
            endsAt: row.ends_at.toISOString(),
            notes: row.notes,
            status: row.status,
        };
    }
    toMatchResponse(assignment) {
        const match = assignment.matches;
        const home = match.tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations;
        const away = match.tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations;
        return {
            id: match.id.toString(),
            matchDate: match.match_date?.toISOString() ?? null,
            venue: match.venue,
            stage: match.stage,
            roundNumber: match.round_number,
            status: match.status,
            homeScore: match.home_score,
            awayScore: match.away_score,
            refereeRole: assignment.referee_role,
            assignmentStatus: assignment.assignment_status,
            tournament: {
                id: home.tournaments.id.toString(),
                name: home.tournaments.name,
            },
            homeTeam: { id: home.teams.id.toString(), name: home.teams.name },
            awayTeam: { id: away.teams.id.toString(), name: away.teams.name },
        };
    }
};
exports.RefereesService = RefereesService;
exports.RefereesService = RefereesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefereesService);
//# sourceMappingURL=referees.service.js.map