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
        const [referees, allActiveReferees, directedCounts, upcomingCounts, occupiedToday,] = await Promise.all([
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
                    assignment_status: { not: 'cancelled' },
                    matches: { status: 'played' },
                },
                _count: { _all: true },
            }),
            this.prisma.match_referees.groupBy({
                by: ['referee_id'],
                where: {
                    assignment_status: { not: 'cancelled' },
                    matches: {
                        status: { not: 'played' },
                        match_date: { gte: now },
                    },
                },
                _count: { _all: true },
            }),
            this.prisma.match_referees.findMany({
                where: {
                    assignment_status: { not: 'cancelled' },
                    matches: {
                        match_date: { gte: startOfToday, lt: startOfTomorrow },
                    },
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
        const availableToday = allActiveReferees.filter(({ id }) => !occupiedIds.has(id.toString())).length;
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
            availableToday: !occupiedIds.has(referee.id.toString()),
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
            assignment_status: { not: 'cancelled' },
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
    async removeRole(id) {
        const refereeRole = await this.prisma.user_roles.findUnique({
            where: { user_id_role_code: { user_id: id, role_code: 'REFEREE' } },
            select: { user_id: true },
        });
        if (!refereeRole) {
            throw new common_1.NotFoundException(`El árbitro con ID ${id.toString()} no existe.`);
        }
        const now = new Date();
        await this.prisma.$transaction([
            this.prisma.user_roles.delete({
                where: { user_id_role_code: { user_id: id, role_code: 'REFEREE' } },
            }),
            this.prisma.user_roles.upsert({
                where: { user_id_role_code: { user_id: id, role_code: 'PLAYER' } },
                create: { user_id: id, role_code: 'PLAYER' },
                update: {},
            }),
            this.prisma.tournament_referees.updateMany({
                where: { user_id: id, status: 'active' },
                data: { status: 'inactive' },
            }),
            this.prisma.match_referees.updateMany({
                where: {
                    referee_id: id,
                    assignment_status: { not: 'cancelled' },
                    matches: {
                        status: { not: 'played' },
                        match_date: { gte: now },
                    },
                },
                data: { assignment_status: 'cancelled' },
            }),
            this.prisma.notifications.create({
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
            }),
        ]);
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