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
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MatchesService = class MatchesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMatchDto) {
        return this.prisma.matches.create({
            data: {
                tournament_id: BigInt(createMatchDto.tournamentId),
                home_team_id: BigInt(createMatchDto.homeTeamId),
                away_team_id: BigInt(createMatchDto.awayTeamId),
                match_date: createMatchDto.matchDate === null
                    ? null
                    : createMatchDto.matchDate !== undefined
                        ? new Date(createMatchDto.matchDate)
                        : undefined,
                venue: createMatchDto.venue,
                stage: createMatchDto.stage,
                round_number: createMatchDto.roundNumber,
                home_score: createMatchDto.homeScore,
                away_score: createMatchDto.awayScore,
                status: createMatchDto.status,
                notes: createMatchDto.notes,
            },
        });
    }
    findAll() {
        return this.prisma.matches.findMany({ orderBy: { id: 'asc' } });
    }
    async findOne(id) {
        const match = await this.prisma.matches.findUnique({ where: { id } });
        if (!match) {
            throw new common_1.NotFoundException(`No se encontró el partido con ID ${id}.`);
        }
        return match;
    }
    async update(id, updateMatchDto) {
        await this.findOne(id);
        const scheduleChanged = updateMatchDto.matchDate !== undefined ||
            updateMatchDto.venue !== undefined ||
            updateMatchDto.status !== undefined;
        return this.prisma.$transaction(async (transaction) => {
            const match = await transaction.matches.update({
                where: { id },
                data: {
                    tournament_id: updateMatchDto.tournamentId !== undefined
                        ? BigInt(updateMatchDto.tournamentId)
                        : undefined,
                    home_team_id: updateMatchDto.homeTeamId !== undefined
                        ? BigInt(updateMatchDto.homeTeamId)
                        : undefined,
                    away_team_id: updateMatchDto.awayTeamId !== undefined
                        ? BigInt(updateMatchDto.awayTeamId)
                        : undefined,
                    match_date: updateMatchDto.matchDate === null
                        ? null
                        : updateMatchDto.matchDate !== undefined
                            ? new Date(updateMatchDto.matchDate)
                            : undefined,
                    venue: updateMatchDto.venue,
                    stage: updateMatchDto.stage,
                    round_number: updateMatchDto.roundNumber,
                    home_score: updateMatchDto.homeScore,
                    away_score: updateMatchDto.awayScore,
                    status: updateMatchDto.status,
                    notes: updateMatchDto.notes,
                },
            });
            if (scheduleChanged &&
                match.match_date &&
                match.match_date.getTime() >= Date.now()) {
                const assignments = await transaction.match_referees.findMany({
                    where: {
                        match_id: id,
                        assignment_status: { not: 'cancelled' },
                    },
                    select: { referee_id: true },
                });
                const recipientIds = [
                    ...new Set(assignments.map(({ referee_id }) => referee_id)),
                ];
                if (recipientIds.length > 0) {
                    const dateLabel = new Intl.DateTimeFormat('es-CO', {
                        dateStyle: 'long',
                        timeStyle: 'short',
                        timeZone: 'America/Bogota',
                    }).format(match.match_date);
                    await transaction.notifications.createMany({
                        data: recipientIds.map((userId) => ({
                            user_id: userId,
                            type: 'match',
                            title: match.status === 'cancelled'
                                ? 'Un partido asignado fue cancelado'
                                : 'Tu partido asignado fue actualizado',
                            message: match.status === 'cancelled'
                                ? `El partido programado para el ${dateLabel} fue cancelado.`
                                : `Tu partido quedó programado para el ${dateLabel}${match.venue ? ` en ${match.venue}` : ''}.`,
                            entity_type: 'match',
                            entity_id: id.toString(),
                            metadata: {
                                matchId: id.toString(),
                                tournamentId: match.tournament_id.toString(),
                                actionUrl: '/my-matches',
                                actionLabel: 'Ver mis partidos',
                            },
                        })),
                    });
                }
            }
            return match;
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.matches.delete({ where: { id } });
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map