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
exports.CompetitionAccessService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompetitionAccessService = class CompetitionAccessService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findRoleCodes(userId) {
        const roles = await this.prisma.user_roles.findMany({
            where: { user_id: userId },
            select: { role_code: true },
        });
        return new Set(roles.map(({ role_code }) => role_code));
    }
    async findAccessibleTournamentScope(userId) {
        const roles = await this.findRoleCodes(userId);
        if (roles.has('SUPER_ADMIN')) {
            return { roles, tournamentIds: null };
        }
        const accessRules = [];
        if (roles.has('ASSOCIATION_ADMIN')) {
            accessRules.push({
                associations: {
                    OR: [
                        { owner_user_id: userId },
                        {
                            association_administrators: {
                                some: {
                                    user_id: userId,
                                    status: 'active',
                                },
                            },
                        },
                    ],
                },
            }, {
                tournament_administrators: {
                    some: {
                        user_id: userId,
                        status: 'active',
                    },
                },
            });
        }
        if (roles.has('REFEREE')) {
            accessRules.push({
                tournament_referees: {
                    some: { user_id: userId, status: 'active' },
                },
            });
        }
        if (roles.has('PLAYER')) {
            accessRules.push({
                tournament_team_registrations: {
                    some: {
                        request_status: 'approved',
                        tournament_team_players: {
                            some: {
                                player_id: userId,
                                registration_status: 'approved',
                            },
                        },
                    },
                },
            });
        }
        if (accessRules.length === 0) {
            return { roles, tournamentIds: [] };
        }
        const tournaments = await this.prisma.tournaments.findMany({
            where: { OR: accessRules },
            select: { id: true },
        });
        return {
            roles,
            tournamentIds: tournaments.map(({ id }) => id),
        };
    }
    async assertCanViewTournament(userId, tournamentId) {
        const scope = await this.findAccessibleTournamentScope(userId);
        if (scope.tournamentIds === null ||
            scope.tournamentIds.some((id) => id === tournamentId)) {
            return;
        }
        await this.assertTournamentExists(tournamentId);
        throw new common_1.ForbiddenException('No tienes permisos para consultar información operativa de este torneo.');
    }
    async assertCanManageTournament(userId, tournamentId) {
        const roles = await this.findRoleCodes(userId);
        if (roles.has('SUPER_ADMIN')) {
            await this.assertTournamentExists(tournamentId);
            return;
        }
        if (!roles.has('ASSOCIATION_ADMIN')) {
            await this.assertTournamentExists(tournamentId);
            throw new common_1.ForbiddenException('No tienes permisos para administrar este torneo.');
        }
        const tournament = await this.prisma.tournaments.findFirst({
            where: {
                id: tournamentId,
                OR: [
                    {
                        associations: {
                            OR: [
                                { owner_user_id: userId },
                                {
                                    association_administrators: {
                                        some: {
                                            user_id: userId,
                                            status: 'active',
                                            permission_level: { not: 'viewer' },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                        tournament_administrators: {
                            some: {
                                user_id: userId,
                                status: 'active',
                                permission_level: { not: 'viewer' },
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        if (tournament)
            return;
        await this.assertTournamentExists(tournamentId);
        throw new common_1.ForbiddenException('No tienes permisos para administrar este torneo.');
    }
    async canUpdateTournamentPayments(userId, tournamentId) {
        const hasAssociationAdminRole = await this.prisma.user_roles.findUnique({
            where: {
                user_id_role_code: {
                    user_id: userId,
                    role_code: 'ASSOCIATION_ADMIN',
                },
            },
            select: { user_id: true },
        });
        if (!hasAssociationAdminRole)
            return false;
        const tournament = await this.prisma.tournaments.findFirst({
            where: {
                id: tournamentId,
                associations: {
                    status: 'active',
                    OR: [
                        { owner_user_id: userId },
                        {
                            association_administrators: {
                                some: {
                                    user_id: userId,
                                    status: 'active',
                                    permission_level: { not: 'viewer' },
                                },
                            },
                        },
                    ],
                },
            },
            select: { id: true },
        });
        return Boolean(tournament);
    }
    async assertCanUpdateTournamentPayments(userId, tournamentId) {
        if (await this.canUpdateTournamentPayments(userId, tournamentId))
            return;
        await this.assertTournamentExists(tournamentId);
        throw new common_1.ForbiddenException('Solo un administrador activo de la asociación puede actualizar los pagos de inscripción.');
    }
    async assertTournamentInPhases(tournamentId, allowedPhases, message) {
        const tournament = await this.prisma.tournaments.findUnique({
            where: { id: tournamentId },
            select: { phase: true },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('El torneo solicitado no existe.');
        }
        if (!allowedPhases.includes(tournament.phase)) {
            throw new common_1.BadRequestException(message);
        }
        return tournament.phase;
    }
    async findManageableTournamentIds(userId) {
        const roles = await this.findRoleCodes(userId);
        if (roles.has('SUPER_ADMIN'))
            return null;
        if (!roles.has('ASSOCIATION_ADMIN'))
            return [];
        const tournaments = await this.prisma.tournaments.findMany({
            where: {
                OR: [
                    {
                        associations: {
                            OR: [
                                { owner_user_id: userId },
                                {
                                    association_administrators: {
                                        some: {
                                            user_id: userId,
                                            status: 'active',
                                            permission_level: { not: 'viewer' },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                        tournament_administrators: {
                            some: {
                                user_id: userId,
                                status: 'active',
                                permission_level: { not: 'viewer' },
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        return tournaments.map(({ id }) => id);
    }
    async assertCanViewMatch(userId, matchId) {
        const match = await this.findMatchTournament(matchId);
        await this.assertCanViewTournament(userId, match.tournament_id);
        return match.tournament_id;
    }
    async resolveMatchWriteAccess(userId, matchId) {
        const match = await this.findMatchTournament(matchId);
        const roles = await this.findRoleCodes(userId);
        if (roles.has('SUPER_ADMIN') || roles.has('ASSOCIATION_ADMIN')) {
            try {
                await this.assertCanManageTournament(userId, match.tournament_id);
                return { tournamentId: match.tournament_id, access: 'manager' };
            }
            catch (error) {
                if (!(error instanceof common_1.ForbiddenException))
                    throw error;
            }
        }
        if (roles.has('REFEREE')) {
            const assignment = await this.prisma.match_referees.findFirst({
                where: {
                    match_id: matchId,
                    referee_id: userId,
                    referee_role: 'main',
                    assignment_status: 'accepted',
                },
                select: { match_id: true },
            });
            if (assignment) {
                return { tournamentId: match.tournament_id, access: 'main_referee' };
            }
        }
        throw new common_1.ForbiddenException('Solo un administrador autorizado o el árbitro principal asignado puede registrar información de este partido.');
    }
    async assertCanManageMatch(userId, matchId) {
        const match = await this.findMatchTournament(matchId);
        await this.assertCanManageTournament(userId, match.tournament_id);
        return match.tournament_id;
    }
    async assertHasAnyRole(userId, allowedRoles) {
        const roles = await this.findRoleCodes(userId);
        if (!allowedRoles.some((role) => roles.has(role))) {
            throw new common_1.ForbiddenException('No tienes permisos suficientes para realizar esta acción.');
        }
        return roles;
    }
    async assertTournamentExists(tournamentId) {
        const tournament = await this.prisma.tournaments.findUnique({
            where: { id: tournamentId },
            select: { id: true },
        });
        if (!tournament) {
            throw new common_1.NotFoundException(`El torneo con ID ${tournamentId.toString()} no existe.`);
        }
    }
    async findMatchTournament(matchId) {
        const match = await this.prisma.matches.findUnique({
            where: { id: matchId },
            select: { tournament_id: true },
        });
        if (!match) {
            throw new common_1.NotFoundException(`No se encontró el partido con ID ${matchId.toString()}.`);
        }
        return match;
    }
};
exports.CompetitionAccessService = CompetitionAccessService;
exports.CompetitionAccessService = CompetitionAccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompetitionAccessService);
//# sourceMappingURL=competition-access.service.js.map