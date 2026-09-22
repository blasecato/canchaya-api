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
exports.PlayerMatchStatsService = void 0;
const common_1 = require("@nestjs/common");
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PlayerMatchStatsService = class PlayerMatchStatsService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async create(requestingUserId, dto) {
        const matchId = BigInt(dto.matchId);
        const tournamentId = BigInt(dto.tournamentId);
        const teamId = BigInt(dto.teamId);
        const playerId = BigInt(dto.playerId);
        await this.access.resolveMatchWriteAccess(requestingUserId, matchId);
        await this.access.assertTournamentInPhases(tournamentId, ['in_progress'], 'Las estadísticas solo se pueden registrar mientras el torneo está En curso.');
        await this.assertValidContext(matchId, tournamentId, teamId, playerId);
        return this.prisma.player_match_stats.create({
            data: {
                match_id: matchId,
                tournament_id: tournamentId,
                team_id: teamId,
                player_id: playerId,
                goals: dto.goals,
                assists: dto.assists,
                yellow_cards: dto.yellowCards,
                red_cards: dto.redCards,
                minutes_played: dto.minutesPlayed,
            },
        });
    }
    async findAll(requestingUserId) {
        const scope = await this.access.findAccessibleTournamentScope(requestingUserId);
        const stats = await this.prisma.player_match_stats.findMany({
            where: scope.tournamentIds === null
                ? undefined
                : { tournament_id: { in: scope.tournamentIds } },
            orderBy: { id: 'asc' },
            select: {
                id: true,
                match_id: true,
                tournament_id: true,
                team_id: true,
                player_id: true,
                goals: true,
                assists: true,
                yellow_cards: true,
                red_cards: true,
                minutes_played: true,
                tournament_team_players: {
                    select: {
                        team_members: {
                            select: { users: { select: { full_name: true } } },
                        },
                        tournament_team_registrations: {
                            select: { teams: { select: { name: true } } },
                        },
                    },
                },
            },
        });
        return stats.map(({ tournament_team_players: roster, ...stat }) => ({
            ...stat,
            playerName: roster.team_members.users.full_name,
            teamName: roster.tournament_team_registrations.teams.name,
        }));
    }
    async findMatchDetail(matchId, requestingUserId) {
        const match = await this.prisma.matches.findUnique({
            where: { id: matchId },
            select: {
                tournament_id: true,
                home_team_id: true,
                away_team_id: true,
            },
        });
        if (!match) {
            throw new common_1.NotFoundException(`No se encontró el partido con ID ${matchId.toString()}.`);
        }
        await this.access.assertCanViewTournament(requestingUserId, match.tournament_id);
        const players = await this.prisma.tournament_team_players.findMany({
            where: {
                tournament_id: match.tournament_id,
                team_id: { in: [match.home_team_id, match.away_team_id] },
                registration_status: 'approved',
            },
            orderBy: [
                { team_id: 'asc' },
                { jersey_number: 'asc' },
                { player_id: 'asc' },
            ],
            select: {
                team_id: true,
                player_id: true,
                jersey_number: true,
                team_members: {
                    select: {
                        users: { select: { full_name: true } },
                        teams: { select: { name: true } },
                    },
                },
                player_match_stats: {
                    where: { match_id: matchId },
                    select: { goals: true, yellow_cards: true, red_cards: true },
                    take: 1,
                },
            },
        });
        return players.map((player) => ({
            matchId: matchId.toString(),
            teamId: player.team_id.toString(),
            teamName: player.team_members.teams.name,
            playerId: player.player_id.toString(),
            playerName: player.team_members.users.full_name,
            jerseyNumber: player.jersey_number,
            goals: player.player_match_stats[0]?.goals ?? 0,
            yellowCards: player.player_match_stats[0]?.yellow_cards ?? 0,
            redCards: player.player_match_stats[0]?.red_cards ?? 0,
        }));
    }
    async findOne(id, requestingUserId) {
        const stat = await this.findExisting(id);
        await this.access.assertCanViewTournament(requestingUserId, stat.tournament_id);
        return stat;
    }
    async update(id, requestingUserId, dto) {
        const current = await this.findExisting(id);
        const writeAccess = await this.access.resolveMatchWriteAccess(requestingUserId, current.match_id);
        await this.access.assertTournamentInPhases(current.tournament_id, ['in_progress'], 'Las estadísticas quedan bloqueadas cuando el torneo no está En curso.');
        if (writeAccess.access === 'main_referee' &&
            [dto.matchId, dto.tournamentId, dto.teamId, dto.playerId].some((value) => value !== undefined)) {
            throw new common_1.ForbiddenException('El árbitro principal no puede reasignar una estadística a otro partido, torneo, equipo o jugador.');
        }
        const matchId = dto.matchId !== undefined ? BigInt(dto.matchId) : current.match_id;
        const tournamentId = dto.tournamentId !== undefined
            ? BigInt(dto.tournamentId)
            : current.tournament_id;
        const teamId = dto.teamId !== undefined ? BigInt(dto.teamId) : current.team_id;
        const playerId = dto.playerId !== undefined ? BigInt(dto.playerId) : current.player_id;
        await this.access.assertTournamentInPhases(tournamentId, ['in_progress'], 'Las estadísticas solo se pueden mover a un torneo que esté En curso.');
        if (matchId !== current.match_id) {
            await this.access.resolveMatchWriteAccess(requestingUserId, matchId);
        }
        await this.assertValidContext(matchId, tournamentId, teamId, playerId);
        return this.prisma.player_match_stats.update({
            where: { id },
            data: {
                match_id: dto.matchId !== undefined ? matchId : undefined,
                tournament_id: dto.tournamentId !== undefined ? tournamentId : undefined,
                team_id: dto.teamId !== undefined ? teamId : undefined,
                player_id: dto.playerId !== undefined ? playerId : undefined,
                goals: dto.goals,
                assists: dto.assists,
                yellow_cards: dto.yellowCards,
                red_cards: dto.redCards,
                minutes_played: dto.minutesPlayed,
            },
        });
    }
    async remove(id, requestingUserId) {
        const stat = await this.findExisting(id);
        await this.access.resolveMatchWriteAccess(requestingUserId, stat.match_id);
        await this.access.assertTournamentInPhases(stat.tournament_id, ['in_progress'], 'Las estadísticas quedan bloqueadas cuando el torneo no está En curso.');
        return this.prisma.player_match_stats.delete({ where: { id } });
    }
    async findExisting(id) {
        const stat = await this.prisma.player_match_stats.findUnique({
            where: { id },
        });
        if (!stat) {
            throw new common_1.NotFoundException(`No se encontró la estadística de partido con ID ${id.toString()}.`);
        }
        return stat;
    }
    async assertValidContext(matchId, tournamentId, teamId, playerId) {
        const match = await this.prisma.matches.findUnique({
            where: { id: matchId },
            select: {
                tournament_id: true,
                home_team_id: true,
                away_team_id: true,
            },
        });
        if (!match) {
            throw new common_1.NotFoundException(`No se encontró el partido con ID ${matchId.toString()}.`);
        }
        if (match.tournament_id !== tournamentId) {
            throw new common_1.BadRequestException('El partido no pertenece al torneo indicado.');
        }
        if (teamId !== match.home_team_id && teamId !== match.away_team_id) {
            throw new common_1.BadRequestException('El equipo indicado no participa en este partido.');
        }
        const rosterPlayer = await this.prisma.tournament_team_players.findUnique({
            where: {
                tournament_id_team_id_player_id: {
                    tournament_id: tournamentId,
                    team_id: teamId,
                    player_id: playerId,
                },
            },
            select: { registration_status: true },
        });
        if (!rosterPlayer || rosterPlayer.registration_status !== 'approved') {
            throw new common_1.BadRequestException('El jugador debe estar aprobado en la plantilla del equipo para registrar estadísticas.');
        }
    }
};
exports.PlayerMatchStatsService = PlayerMatchStatsService;
exports.PlayerMatchStatsService = PlayerMatchStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], PlayerMatchStatsService);
//# sourceMappingURL=player-match-stats.service.js.map