import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  DEFAULT_MATCH_REMINDER_HOURS,
  MAX_MATCH_REMINDER_HOURS,
  OPERATIONAL_NOTIFICATION_EVENTS,
  type OperationalNotificationEventCode,
} from './notification-events';
import { NotificationDispatcherService } from './notification-dispatcher.service';

type DatabaseClient = PrismaService | Prisma.TransactionClient;

type MatchContext = {
  id: bigint;
  tournamentId: bigint;
  tournamentName: string;
  homeTeam: { id: bigint; name: string };
  awayTeam: { id: bigint; name: string };
  matchDate: Date | null;
  venue: string | null;
  status: string;
  updatedAt: Date;
  players: Array<{ userId: bigint; teamId: bigint }>;
  refereeIds: bigint[];
};

@Injectable()
export class MatchOperationalNotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: NotificationDispatcherService,
  ) {}

  async notifyMatchScheduled(
    matchId: bigint,
    client: DatabaseClient = this.prisma,
  ): Promise<number> {
    const match = await this.loadMatchContext(matchId, client);
    if (
      !match?.matchDate ||
      match.status !== 'scheduled' ||
      match.matchDate.getTime() < Date.now()
    ) {
      return 0;
    }

    const message = `Se programó ${this.matchLabel(match)} para el ${this.formatDate(match.matchDate)}${this.venueSuffix(match.venue)}.`;
    return this.notifyMatchAudience(
      match,
      OPERATIONAL_NOTIFICATION_EVENTS.MATCH_SCHEDULED,
      'Nuevo partido programado',
      message,
      `match:${match.id.toString()}:scheduled:${match.updatedAt.toISOString()}`,
      undefined,
      client,
    );
  }

  async notifyMatchChanged(
    matchId: bigint,
    eventCode: OperationalNotificationEventCode,
    additionalRefereeIds: readonly bigint[] = [],
    client: DatabaseClient = this.prisma,
  ): Promise<number> {
    const match = await this.loadMatchContext(matchId, client);
    if (!match) return 0;

    const { title, message } = this.changeCopy(match, eventCode);
    return this.notifyMatchAudience(
      match,
      eventCode,
      title,
      message,
      `match:${match.id.toString()}:${eventCode}:${match.updatedAt.toISOString()}`,
      additionalRefereeIds,
      client,
    );
  }

  async sendDueReminders(now = new Date()): Promise<number> {
    const upperBound = new Date(
      now.getTime() + MAX_MATCH_REMINDER_HOURS * 60 * 60 * 1000,
    );
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

  private async sendMatchReminderIfDue(
    matchId: bigint,
    now: Date,
  ): Promise<number> {
    const match = await this.loadMatchContext(matchId, this.prisma);
    if (
      !match?.matchDate ||
      match.status !== 'scheduled' ||
      match.matchDate <= now
    ) {
      return 0;
    }
    const matchDate = match.matchDate;

    const recipients = this.uniqueAudience(match);
    if (recipients.length === 0) return 0;

    const preferences = await this.prisma.notification_preferences.findMany({
      where: { user_id: { in: recipients.map(({ userId }) => userId) } },
      select: {
        user_id: true,
        match_reminders_enabled: true,
        reminder_hours_before: true,
      },
    });
    const preferencesByUser = new Map(
      preferences.map((preference) => [preference.user_id, preference]),
    );
    const dueRecipients = recipients.flatMap((recipient) => {
      const preference = preferencesByUser.get(recipient.userId);
      if (preference?.match_reminders_enabled === false) return [];
      const hours =
        preference?.reminder_hours_before ?? DEFAULT_MATCH_REMINDER_HOURS;
      const dueAt = new Date(matchDate.getTime() - hours * 60 * 60 * 1000);
      return dueAt <= now ? [{ ...recipient, hours, dueAt }] : [];
    });

    const groups = new Map<
      string,
      {
        userIds: bigint[];
        kind: 'player' | 'referee';
        teamId: bigint | null;
        hours: number;
        dueAt: Date;
      }
    >();
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
        eventCode: OPERATIONAL_NOTIFICATION_EVENTS.MATCH_REMINDER,
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
          actionUrl:
            group.kind === 'referee'
              ? '/my-matches'
              : `/tournaments/${match.tournamentId.toString()}`,
          actionLabel:
            group.kind === 'referee' ? 'Ver mis partidos' : 'Ver torneo',
        },
        deduplicationKey: `match:${match.id.toString()}:reminder:${matchDate.toISOString()}:${group.hours}h`,
        scheduledFor: group.dueAt,
      });
    }
    return created;
  }

  private async notifyMatchAudience(
    match: MatchContext,
    eventCode: OperationalNotificationEventCode,
    title: string,
    message: string,
    deduplicationKey: string,
    additionalRefereeIds: readonly bigint[] | undefined,
    client: DatabaseClient,
  ): Promise<number> {
    const referees = new Set([
      ...match.refereeIds,
      ...(additionalRefereeIds ?? []),
    ]);
    const playersByTeam = new Map<bigint, bigint[]>();
    for (const player of match.players) {
      if (referees.has(player.userId)) continue;
      const teamPlayers = playersByTeam.get(player.teamId) ?? [];
      teamPlayers.push(player.userId);
      playersByTeam.set(player.teamId, teamPlayers);
    }

    let created = 0;
    for (const [teamId, userIds] of playersByTeam) {
      created += await this.dispatcher.notifyUsers(
        {
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
        },
        client,
      );
    }

    created += await this.dispatcher.notifyUsers(
      {
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
      },
      client,
    );
    return created;
  }

  private uniqueAudience(match: MatchContext) {
    const audience = new Map<
      bigint,
      { userId: bigint; kind: 'player' | 'referee'; teamId: bigint | null }
    >();
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

  private async loadMatchContext(
    matchId: bigint,
    client: DatabaseClient,
  ): Promise<MatchContext | null> {
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
    if (!match) return null;

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
    if (!tournament) return null;
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

  private changeCopy(
    match: MatchContext,
    eventCode: OperationalNotificationEventCode,
  ) {
    if (eventCode === OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED) {
      return {
        title: 'Partido cancelado',
        message: match.matchDate
          ? `${this.matchLabel(match)}, programado para el ${this.formatDate(match.matchDate)}, fue cancelado.`
          : `${this.matchLabel(match)} fue cancelado.`,
      };
    }
    if (eventCode === OPERATIONAL_NOTIFICATION_EVENTS.MATCH_POSTPONED) {
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

  private matchLabel(match: MatchContext): string {
    return `${match.homeTeam.name} vs. ${match.awayTeam.name} en ${match.tournamentName}`;
  }

  private venueSuffix(venue: string | null): string {
    return venue ? ` en ${venue}` : '';
  }

  private formatDate(value: Date): string {
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Bogota',
    }).format(value);
  }

  private reminderTitle(hours: number): string {
    if (hours === 24) return 'Tu partido es mañana';
    if (hours < 24) {
      return `Tu partido es en menos de ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    const days = Math.round(hours / 24);
    return `Tu partido es en ${days} ${days === 1 ? 'día' : 'días'}`;
  }
}
