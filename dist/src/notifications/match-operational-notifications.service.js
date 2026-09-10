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
exports.MatchOperationalNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_events_1 = require("./notification-events");
const notification_dispatcher_service_1 = require("./notification-dispatcher.service");
let MatchOperationalNotificationsService = class MatchOperationalNotificationsService {
    prisma;
    dispatcher;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    async notifyMatchScheduled(matchId, client = this.prisma) {
        const match = await this.loadMatchContext(matchId, client);
        if (!match?.matchDate ||
            match.status !== 'scheduled' ||
            match.matchDate.getTime() < Date.now()) {
            return 0;
        }
        const message = `Se programó ${this.matchLabel(match)} para el ${this.formatDate(match.matchDate)}${this.venueSuffix(match.venue)}.`;
        return this.notifyMatchAudience(match, notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_SCHEDULED, 'Nuevo partido programado', message, `match:${match.id.toString()}:scheduled:${match.updatedAt.toISOString()}`, undefined, client);
    }
    async notifyMatchChanged(matchId, eventCode, additionalRefereeIds = [], client = this.prisma) {
        const match = await this.loadMatchContext(matchId, client);
        if (!match)
            return 0;
        const { title, message } = this.changeCopy(match, eventCode);
        return this.notifyMatchAudience(match, eventCode, title, message, `match:${match.id.toString()}:${eventCode}:${match.updatedAt.toISOString()}`, additionalRefereeIds, client);
    }
    async sendDueReminders(now = new Date()) {
        const upperBound = new Date(now.getTime() + notification_events_1.MAX_MATCH_REMINDER_HOURS * 60 * 60 * 1000);
        const matches = await this.prisma.matches.findMany({
            where: {
                status: 'scheduled',
                match_date: { gt: now, lte: upperBound },
            },
            select: { id: true },
            orderBy: { match_date: 'asc' },
        });
        let created = 0;
        for (const { id } of matches) {
            created += await this.sendMatchReminderIfDue(id, now);
        }
        return created;
    }
    async sendMatchReminderIfDue(matchId, now) {
        const match = await this.loadMatchContext(matchId, this.prisma);
        if (!match?.matchDate ||
            match.status !== 'scheduled' ||
            match.matchDate <= now) {
            return 0;
        }
        const matchDate = match.matchDate;
        const recipients = this.uniqueAudience(match);
        if (recipients.length === 0)
            return 0;
        const preferences = await this.prisma.notification_preferences.findMany({
            where: { user_id: { in: recipients.map(({ userId }) => userId) } },
            select: {
                user_id: true,
                match_reminders_enabled: true,
                reminder_hours_before: true,
            },
        });
        const preferencesByUser = new Map(preferences.map((preference) => [preference.user_id, preference]));
        const dueRecipients = recipients.flatMap((recipient) => {
            const preference = preferencesByUser.get(recipient.userId);
            if (preference?.match_reminders_enabled === false)
                return [];
            const hours = preference?.reminder_hours_before ?? notification_events_1.DEFAULT_MATCH_REMINDER_HOURS;
            const dueAt = new Date(matchDate.getTime() - hours * 60 * 60 * 1000);
            return dueAt <= now ? [{ ...recipient, hours, dueAt }] : [];
        });
        const groups = new Map();
        for (const recipient of dueRecipients) {
            const key = `${recipient.kind}:${recipient.teamId?.toString() ?? 'none'}:${recipient.hours}`;
            const group = groups.get(key) ?? {
                userIds: [],
                kind: recipient.kind,
                teamId: recipient.teamId,
                hours: recipient.hours,
                dueAt: recipient.dueAt,
            };
            group.userIds.push(recipient.userId);
            groups.set(key, group);
        }
        let created = 0;
        for (const group of groups.values()) {
            created += await this.dispatcher.notifyUsers({
                userIds: group.userIds,
                type: 'match',
                eventCode: notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_REMINDER,
                title: this.reminderTitle(group.hours),
                message: `${this.matchLabel(match)} se jugará el ${this.formatDate(matchDate)}${this.venueSuffix(match.venue)}.`,
                entityType: 'match',
                entityId: match.id.toString(),
                metadata: {
                    matchId: match.id.toString(),
                    tournamentId: match.tournamentId.toString(),
                    teamId: group.teamId?.toString() ?? null,
                    recipientRole: group.kind,
                    reminderHoursBefore: group.hours,
                    matchDate: matchDate.toISOString(),
                    actionUrl: group.kind === 'referee'
                        ? '/my-matches'
                        : `/tournaments/${match.tournamentId.toString()}`,
                    actionLabel: group.kind === 'referee' ? 'Ver mis partidos' : 'Ver torneo',
                },
                deduplicationKey: `match:${match.id.toString()}:reminder:${matchDate.toISOString()}:${group.hours}h`,
                scheduledFor: group.dueAt,
            });
        }
        return created;
    }
    async notifyMatchAudience(match, eventCode, title, message, deduplicationKey, additionalRefereeIds, client) {
        const referees = new Set([
            ...match.refereeIds,
            ...(additionalRefereeIds ?? []),
        ]);
        const playersByTeam = new Map();
        for (const player of match.players) {
            if (referees.has(player.userId))
                continue;
            const teamPlayers = playersByTeam.get(player.teamId) ?? [];
            teamPlayers.push(player.userId);
            playersByTeam.set(player.teamId, teamPlayers);
        }
        let created = 0;
        for (const [teamId, userIds] of playersByTeam) {
            created += await this.dispatcher.notifyUsers({
                userIds,
                type: 'match',
                eventCode,
                title,
                message,
                entityType: 'match',
                entityId: match.id.toString(),
                metadata: {
                    matchId: match.id.toString(),
                    tournamentId: match.tournamentId.toString(),
                    teamId: teamId.toString(),
                    recipientRole: 'player',
                    matchDate: match.matchDate?.toISOString() ?? null,
                    actionUrl: `/tournaments/${match.tournamentId.toString()}`,
                    actionLabel: 'Ver torneo',
                },
                deduplicationKey,
            }, client);
        }
        created += await this.dispatcher.notifyUsers({
            userIds: [...referees],
            type: 'match',
            eventCode,
            title,
            message,
            entityType: 'match',
            entityId: match.id.toString(),
            metadata: {
                matchId: match.id.toString(),
                tournamentId: match.tournamentId.toString(),
                recipientRole: 'referee',
                matchDate: match.matchDate?.toISOString() ?? null,
                actionUrl: '/my-matches',
                actionLabel: 'Ver mis partidos',
            },
            deduplicationKey,
        }, client);
        return created;
    }
    uniqueAudience(match) {
        const audience = new Map();
        for (const player of match.players) {
            audience.set(player.userId, {
                userId: player.userId,
                kind: 'player',
                teamId: player.teamId,
            });
        }
        for (const refereeId of match.refereeIds) {
            audience.set(refereeId, {
                userId: refereeId,
                kind: 'referee',
                teamId: null,
            });
        }
        return [...audience.values()];
    }
    async loadMatchContext(matchId, client) {
        const match = await client.matches.findUnique({
            where: { id: matchId },
            select: {
                id: true,
                tournament_id: true,
                home_team_id: true,
                away_team_id: true,
                match_date: true,
                venue: true,
                status: true,
                updated_at: true,
            },
        });
        if (!match)
            return null;
        const [tournament, teams, players, referees] = await Promise.all([
            client.tournaments.findUnique({
                where: { id: match.tournament_id },
                select: { name: true },
            }),
            client.teams.findMany({
                where: { id: { in: [match.home_team_id, match.away_team_id] } },
                select: { id: true, name: true },
            }),
            client.tournament_team_players.findMany({
                where: {
                    tournament_id: match.tournament_id,
                    team_id: { in: [match.home_team_id, match.away_team_id] },
                    registration_status: 'approved',
                },
                select: { player_id: true, team_id: true },
            }),
            client.match_referees.findMany({
                where: {
                    match_id: match.id,
                    assignment_status: { in: ['pending', 'accepted'] },
                },
                select: { referee_id: true },
            }),
        ]);
        if (!tournament)
            return null;
        const teamsById = new Map(teams.map((team) => [team.id, team.name]));
        return {
            id: match.id,
            tournamentId: match.tournament_id,
            tournamentName: tournament.name,
            homeTeam: {
                id: match.home_team_id,
                name: teamsById.get(match.home_team_id) ?? 'Equipo local',
            },
            awayTeam: {
                id: match.away_team_id,
                name: teamsById.get(match.away_team_id) ?? 'Equipo visitante',
            },
            matchDate: match.match_date,
            venue: match.venue,
            status: match.status,
            updatedAt: match.updated_at,
            players: players.map((player) => ({
                userId: player.player_id,
                teamId: player.team_id,
            })),
            refereeIds: referees.map((referee) => referee.referee_id),
        };
    }
    changeCopy(match, eventCode) {
        if (eventCode === notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED) {
            return {
                title: 'Partido cancelado',
                message: match.matchDate
                    ? `${this.matchLabel(match)}, programado para el ${this.formatDate(match.matchDate)}, fue cancelado.`
                    : `${this.matchLabel(match)} fue cancelado.`,
            };
        }
        if (eventCode === notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_POSTPONED) {
            return {
                title: 'Partido aplazado',
                message: `${this.matchLabel(match)} fue aplazado. Consulta el torneo para conocer la nueva programación.`,
            };
        }
        return {
            title: 'Programación de partido actualizada',
            message: match.matchDate
                ? `${this.matchLabel(match)} quedó programado para el ${this.formatDate(match.matchDate)}${this.venueSuffix(match.venue)}.`
                : `${this.matchLabel(match)} quedó pendiente de una nueva fecha.`,
        };
    }
    matchLabel(match) {
        return `${match.homeTeam.name} vs. ${match.awayTeam.name} en ${match.tournamentName}`;
    }
    venueSuffix(venue) {
        return venue ? ` en ${venue}` : '';
    }
    formatDate(value) {
        return new Intl.DateTimeFormat('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota',
        }).format(value);
    }
    reminderTitle(hours) {
        if (hours === 24)
            return 'Tu partido es mañana';
        if (hours < 24) {
            return `Tu partido es en menos de ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        }
        const days = Math.round(hours / 24);
        return `Tu partido es en ${days} ${days === 1 ? 'día' : 'días'}`;
    }
};
exports.MatchOperationalNotificationsService = MatchOperationalNotificationsService;
exports.MatchOperationalNotificationsService = MatchOperationalNotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_dispatcher_service_1.NotificationDispatcherService])
], MatchOperationalNotificationsService);
//# sourceMappingURL=match-operational-notifications.service.js.map