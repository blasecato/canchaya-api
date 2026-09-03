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
const prisma_service_1 = require("../prisma/prisma.service");
let PlayerMatchStatsService = class PlayerMatchStatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPlayerMatchStatDto) {
        return this.prisma.player_match_stats.create({
            data: {
                match_id: BigInt(createPlayerMatchStatDto.matchId),
                tournament_id: BigInt(createPlayerMatchStatDto.tournamentId),
                team_id: BigInt(createPlayerMatchStatDto.teamId),
                player_id: BigInt(createPlayerMatchStatDto.playerId),
                goals: createPlayerMatchStatDto.goals,
                assists: createPlayerMatchStatDto.assists,
                yellow_cards: createPlayerMatchStatDto.yellowCards,
                red_cards: createPlayerMatchStatDto.redCards,
                minutes_played: createPlayerMatchStatDto.minutesPlayed,
            },
        });
    }
    findAll() {
        return this.prisma.player_match_stats.findMany({
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const playerMatchStat = await this.prisma.player_match_stats.findUnique({
            where: { id },
        });
        if (!playerMatchStat) {
            throw new common_1.NotFoundException(`No se encontró la estadística de partido con ID ${id}.`);
        }
        return playerMatchStat;
    }
    async update(id, updatePlayerMatchStatDto) {
        await this.findOne(id);
        return this.prisma.player_match_stats.update({
            where: { id },
            data: {
                match_id: updatePlayerMatchStatDto.matchId !== undefined
                    ? BigInt(updatePlayerMatchStatDto.matchId)
                    : undefined,
                tournament_id: updatePlayerMatchStatDto.tournamentId !== undefined
                    ? BigInt(updatePlayerMatchStatDto.tournamentId)
                    : undefined,
                team_id: updatePlayerMatchStatDto.teamId !== undefined
                    ? BigInt(updatePlayerMatchStatDto.teamId)
                    : undefined,
                player_id: updatePlayerMatchStatDto.playerId !== undefined
                    ? BigInt(updatePlayerMatchStatDto.playerId)
                    : undefined,
                goals: updatePlayerMatchStatDto.goals,
                assists: updatePlayerMatchStatDto.assists,
                yellow_cards: updatePlayerMatchStatDto.yellowCards,
                red_cards: updatePlayerMatchStatDto.redCards,
                minutes_played: updatePlayerMatchStatDto.minutesPlayed,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.player_match_stats.delete({ where: { id } });
    }
};
exports.PlayerMatchStatsService = PlayerMatchStatsService;
exports.PlayerMatchStatsService = PlayerMatchStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayerMatchStatsService);
//# sourceMappingURL=player-match-stats.service.js.map