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
const competition_access_service_1 = require("../authorization/competition-access.service");
const notification_events_1 = require("../notifications/notification-events");
const match_operational_notifications_service_1 = require("../notifications/match-operational-notifications.service");
const prisma_service_1 = require("../prisma/prisma.service");
const referee_assignments_service_1 = require("../referees/referee-assignments.service");
const REFEREE_EDITABLE_FIELDS = [
    'homeScore',
    'awayScore',
    'status',
    'notes',
];
let MatchesService = class MatchesService {
    prisma;
    access;
    refereeAssignments;
    matchNotifications;
    constructor(prisma, access, refereeAssignments, matchNotifications) {
        this.prisma = prisma;
        this.access = access;
        this.refereeAssignments = refereeAssignments;
        this.matchNotifications = matchNotifications;
    }
    async create(requestingUserId, dto) {
        const tournamentId = BigInt(dto.tournamentId);
        const homeTeamId = BigInt(dto.homeTeamId);
        const awayTeamId = BigInt(dto.awayTeamId);
        await this.access.assertCanManageTournament(requestingUserId, tournamentId);
        await this.assertTournamentPhase(tournamentId, ['validation'], 'Los enfrentamientos solo se pueden crear durante la fase de Validación.');
        if ((dto.status !== undefined && dto.status !== 'scheduled') ||
            dto.homeScore != null ||
            dto.awayScore != null) {
            throw new common_1.BadRequestException('Un enfrentamiento nuevo debe quedar Programado y sin marcador.');
        }
        await this.assertValidParticipants(tournamentId, homeTeamId, awayTeamId);
        this.assertValidResult(dto.status ?? 'scheduled', dto.homeScore, dto.awayScore);
        return this.prisma.$transaction(async (transaction) => {
            const match = await transaction.matches.create({
                data: {
                    tournament_id: tournamentId,
                    home_team_id: homeTeamId,
                    away_team_id: awayTeamId,
                    match_date: dto.matchDate === null
                        ? null
                        : dto.matchDate !== undefined
                            ? new Date(dto.matchDate)
                            : undefined,
                    venue: dto.venue,
                    stage: dto.stage,
                    round_number: dto.roundNumber,
                    home_score: dto.homeScore,
                    away_score: dto.awayScore,
                    status: dto.status,
                    duration_minutes: dto.durationMinutes,
                    notes: dto.notes,
                },
            });
            await this.matchNotifications.notifyMatchScheduled(match.id, transaction);
            return match;
        });
    }
    async findAll(requestingUserId) {
        const scope = await this.access.findAccessibleTournamentScope(requestingUserId);
        return this.prisma.matches.findMany({
            where: scope.tournamentIds === null
                ? undefined
                : { tournament_id: { in: scope.tournamentIds } },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id, requestingUserId) {
        const match = await this.findExistingMatch(id);
        await this.access.assertCanViewTournament(requestingUserId, match.tournament_id);
        return match;
    }
    async update(id, requestingUserId, dto) {
        const current = await this.findExistingMatch(id);
        const writeAccess = await this.access.resolveMatchWriteAccess(requestingUserId, id);
        if (writeAccess.access === 'main_referee') {
            this.assertRefereeUpdate(dto);
        }
        const tournamentId = dto.tournamentId !== undefined
            ? BigInt(dto.tournamentId)
            : current.tournament_id;
        const homeTeamId = dto.homeTeamId !== undefined
            ? BigInt(dto.homeTeamId)
            : current.home_team_id;
        const awayTeamId = dto.awayTeamId !== undefined
            ? BigInt(dto.awayTeamId)
            : current.away_team_id;
        if (writeAccess.access === 'manager' &&
            tournamentId !== current.tournament_id) {
            throw new common_1.BadRequestException('Un partido no se puede trasladar a otro torneo. Crea un nuevo enfrentamiento en el torneo correcto.');
        }
        await this.assertMatchUpdateAllowed(current.tournament_id, writeAccess.access, dto);
        await this.assertValidParticipants(tournamentId, homeTeamId, awayTeamId);
        const nextStatus = dto.status ?? current.status;
        const nextHomeScore = dto.homeScore !== undefined ? dto.homeScore : current.home_score;
        const nextAwayScore = dto.awayScore !== undefined ? dto.awayScore : current.away_score;
        this.assertValidResult(nextStatus, nextHomeScore, nextAwayScore);
        const scheduleChanged = dto.matchDate !== undefined ||
            dto.venue !== undefined ||
            dto.durationMinutes !== undefined;
        const assignmentChanged = scheduleChanged ||
            (dto.status === 'cancelled' && current.status !== 'cancelled');
        const nextMatchDate = dto.matchDate === null
            ? null
            : dto.matchDate !== undefined
                ? new Date(dto.matchDate)
                : current.match_date;
        const nextDuration = dto.durationMinutes ?? current.duration_minutes;
        const actualScheduleChanged = (dto.matchDate !== undefined &&
            (nextMatchDate?.getTime() ?? null) !==
                (current.match_date?.getTime() ?? null)) ||
            (dto.venue !== undefined && dto.venue !== current.venue) ||
            (dto.durationMinutes !== undefined &&
                nextDuration !== current.duration_minutes) ||
            homeTeamId !== current.home_team_id ||
            awayTeamId !== current.away_team_id;
        const operationalEventCode = nextStatus === 'cancelled' && current.status !== 'cancelled'
            ? notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED
            : nextStatus === 'postponed' && current.status !== 'postponed'
                ? notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_POSTPONED
                : actualScheduleChanged ||
                    (nextStatus === 'scheduled' && current.status !== 'scheduled')
                    ? notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_UPDATED
                    : null;
        if (scheduleChanged && nextStatus !== 'cancelled') {
            await this.refereeAssignments.assertActiveAssignmentsCompatible(id, nextMatchDate, nextDuration);
        }
        return this.prisma.$transaction(async (transaction) => {
            const match = await transaction.matches.update({
                where: { id },
                data: {
                    tournament_id: dto.tournamentId !== undefined ? tournamentId : undefined,
                    home_team_id: dto.homeTeamId !== undefined ? homeTeamId : undefined,
                    away_team_id: dto.awayTeamId !== undefined ? awayTeamId : undefined,
                    match_date: dto.matchDate === null
                        ? null
                        : dto.matchDate !== undefined
                            ? new Date(dto.matchDate)
                            : undefined,
                    venue: dto.venue,
                    stage: dto.stage,
                    round_number: dto.roundNumber,
                    home_score: dto.homeScore,
                    away_score: dto.awayScore,
                    status: dto.status,
                    duration_minutes: dto.durationMinutes,
                    notes: dto.notes,
                    updated_at: new Date(),
                },
            });
            let activeRefereeIds = [];
            if (assignmentChanged) {
                const assignments = await transaction.match_referees.findMany({
                    where: {
                        match_id: id,
                        assignment_status: { in: ['pending', 'accepted'] },
                    },
                    select: {
                        referee_id: true,
                        assignment_status: true,
                    },
                });
                activeRefereeIds = [
                    ...new Set(assignments.map(({ referee_id }) => referee_id)),
                ];
                if (activeRefereeIds.length > 0) {
                    if (match.status === 'cancelled') {
                        await transaction.match_referees.updateMany({
                            where: {
                                match_id: id,
                                assignment_status: { in: ['pending', 'accepted'] },
                            },
                            data: {
                                assignment_status: 'cancelled',
                                responded_at: new Date(),
                                response_notes: 'El partido fue cancelado.',
                                updated_at: new Date(),
                            },
                        });
                        await transaction.referee_assignment_events.createMany({
                            data: assignments.map((assignment) => ({
                                match_id: id,
                                referee_id: assignment.referee_id,
                                actor_user_id: requestingUserId,
                                event_type: 'cancelled',
                                previous_status: assignment.assignment_status,
                                new_status: 'cancelled',
                                reason: 'El partido fue cancelado.',
                            })),
                        });
                    }
                    else if (match.match_date &&
                        match.match_date.getTime() >= Date.now()) {
                        await transaction.referee_assignment_events.createMany({
                            data: assignments.map((assignment) => ({
                                match_id: id,
                                referee_id: assignment.referee_id,
                                actor_user_id: requestingUserId,
                                event_type: 'rescheduled',
                                previous_status: assignment.assignment_status,
                                new_status: assignment.assignment_status,
                                reason: 'Cambió la fecha, el escenario, la duración o el estado del partido.',
                            })),
                        });
                    }
                }
            }
            if (operationalEventCode &&
                (match.status === 'cancelled' ||
                    (match.match_date && match.match_date.getTime() >= Date.now()))) {
                await this.matchNotifications.notifyMatchChanged(match.id, operationalEventCode, activeRefereeIds, transaction);
            }
            return match;
        });
    }
    async remove(id, requestingUserId) {
        const tournamentId = await this.access.assertCanManageMatch(requestingUserId, id);
        await this.assertTournamentPhase(tournamentId, ['validation', 'scheduled'], 'Los partidos solo se pueden eliminar antes de iniciar el torneo.');
        return this.prisma.$transaction(async (transaction) => {
            await this.matchNotifications.notifyMatchChanged(id, notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED, [], transaction);
            return transaction.matches.delete({ where: { id } });
        });
    }
    async findExistingMatch(id) {
        const match = await this.prisma.matches.findUnique({ where: { id } });
        if (!match) {
            throw new common_1.NotFoundException(`No se encontró el partido con ID ${id.toString()}.`);
        }
        return match;
    }
    async assertValidParticipants(tournamentId, homeTeamId, awayTeamId) {
        if (homeTeamId === awayTeamId) {
            throw new common_1.BadRequestException('Un equipo no puede enfrentarse contra sí mismo.');
        }
        const approvedTeams = await this.prisma.tournament_team_registrations.count({
            where: {
                tournament_id: tournamentId,
                team_id: { in: [homeTeamId, awayTeamId] },
                request_status: 'approved',
            },
        });
        if (approvedTeams !== 2) {
            throw new common_1.BadRequestException('Ambos equipos deben estar aprobados en el torneo del partido.');
        }
    }
    async assertMatchUpdateAllowed(tournamentId, access, dto) {
        const tournament = await this.prisma.tournaments.findUnique({
            where: { id: tournamentId },
            select: { phase: true },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('El torneo del partido no existe.');
        }
        if (access === 'main_referee') {
            if (tournament.phase !== 'in_progress') {
                throw new common_1.BadRequestException('El árbitro solo puede registrar el desarrollo y el resultado cuando el torneo está En curso.');
            }
            return;
        }
        if (!['validation', 'scheduled', 'in_progress'].includes(tournament.phase)) {
            throw new common_1.BadRequestException('Los partidos solo se pueden editar durante Validación, Programado o En curso.');
        }
        if (['validation', 'scheduled'].includes(tournament.phase)) {
            if (dto.homeScore != null ||
                dto.awayScore != null ||
                (dto.status !== undefined &&
                    !['scheduled', 'postponed', 'cancelled'].includes(dto.status))) {
                throw new common_1.BadRequestException('No se pueden registrar marcadores ni iniciar partidos antes de que el torneo esté En curso.');
            }
            return;
        }
        const competitionFields = [
            dto.tournamentId,
            dto.homeTeamId,
            dto.awayTeamId,
            dto.stage,
            dto.roundNumber,
        ];
        if (competitionFields.some((value) => value !== undefined)) {
            throw new common_1.BadRequestException('Los equipos, la etapa y la ronda quedan bloqueados cuando el torneo está En curso.');
        }
    }
    async assertTournamentPhase(tournamentId, allowedPhases, message) {
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
    }
    assertRefereeUpdate(dto) {
        const allowed = new Set(REFEREE_EDITABLE_FIELDS);
        const forbiddenField = Object.keys(dto).find((field) => dto[field] !== undefined && !allowed.has(field));
        if (forbiddenField) {
            throw new common_1.ForbiddenException('El árbitro principal solo puede actualizar el marcador, el estado y las observaciones del partido.');
        }
        if (dto.status !== undefined &&
            !['in_progress', 'played'].includes(dto.status)) {
            throw new common_1.ForbiddenException('El árbitro principal solo puede iniciar o finalizar el partido.');
        }
    }
    assertValidResult(status, homeScore, awayScore) {
        const hasAnyScore = homeScore != null || awayScore != null;
        if (hasAnyScore && !['in_progress', 'played'].includes(status)) {
            throw new common_1.BadRequestException('El marcador solo puede registrarse en un partido en curso o finalizado.');
        }
        if (status === 'played' && (homeScore == null || awayScore == null)) {
            throw new common_1.BadRequestException('Debes registrar ambos marcadores para finalizar el partido.');
        }
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService,
        referee_assignments_service_1.RefereeAssignmentsService,
        match_operational_notifications_service_1.MatchOperationalNotificationsService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map