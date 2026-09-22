import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readPlan } from '../competition/competition.engine';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import {
  OPERATIONAL_NOTIFICATION_EVENTS,
  type OperationalNotificationEventCode,
} from '../notifications/notification-events';
import { MatchOperationalNotificationsService } from '../notifications/match-operational-notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefereeAssignmentsService } from '../referees/referee-assignments.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

const REFEREE_EDITABLE_FIELDS = [
  'homeScore',
  'awayScore',
  'homePenalties',
  'awayPenalties',
  'status',
  'notes',
] as const satisfies readonly (keyof UpdateMatchDto)[];

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
    private readonly refereeAssignments: RefereeAssignmentsService,
    private readonly matchNotifications: MatchOperationalNotificationsService,
  ) {}

  async create(requestingUserId: bigint, dto: CreateMatchDto) {
    const tournamentId = BigInt(dto.tournamentId);
    const homeTeamId = BigInt(dto.homeTeamId);
    const awayTeamId = BigInt(dto.awayTeamId);

    await this.access.assertCanManageTournament(requestingUserId, tournamentId);
    await this.assertTournamentPhase(
      tournamentId,
      ['validation'],
      'Los enfrentamientos solo se pueden crear durante la fase de Validación.',
    );
    if (
      (dto.status !== undefined && dto.status !== 'scheduled') ||
      dto.homeScore != null ||
      dto.awayScore != null ||
      dto.homePenalties != null ||
      dto.awayPenalties != null
    ) {
      throw new BadRequestException(
        'Un enfrentamiento nuevo debe quedar Programado y sin marcador.',
      );
    }
    await this.assertValidParticipants(tournamentId, homeTeamId, awayTeamId);
    this.assertValidResult(
      dto.status ?? 'scheduled',
      dto.homeScore,
      dto.awayScore,
    );

    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
      const tournament = await transaction.tournaments.findUniqueOrThrow({
        where: { id: tournamentId },
      });
      if (tournament.phase !== 'validation' || tournament.competition_plan)
        throw new BadRequestException(
          'Los partidos de una competencia organizada se generan desde sus etapas.',
        );
      const match = await transaction.matches.create({
        data: {
          tournament_id: tournamentId,
          home_team_id: homeTeamId,
          away_team_id: awayTeamId,
          match_date:
            dto.matchDate === null
              ? null
              : dto.matchDate !== undefined
                ? new Date(dto.matchDate)
                : undefined,
          venue: dto.venue,
          stage: dto.stage,
          round_number: dto.roundNumber,
          home_score: dto.homeScore,
          away_score: dto.awayScore,
          home_penalties: dto.homePenalties,
          away_penalties: dto.awayPenalties,
          status: dto.status,
          duration_minutes: dto.durationMinutes,
          notes: dto.notes,
        },
      });
      await this.matchNotifications.notifyMatchScheduled(match.id, transaction);
      return match;
    });
  }

  async findAll(requestingUserId: bigint) {
    const scope =
      await this.access.findAccessibleTournamentScope(requestingUserId);
    return this.prisma.matches.findMany({
      where:
        scope.tournamentIds === null
          ? undefined
          : { tournament_id: { in: scope.tournamentIds } },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: bigint, requestingUserId: bigint) {
    const match = await this.findExistingMatch(id);
    await this.access.assertCanViewTournament(
      requestingUserId,
      match.tournament_id,
    );
    return match;
  }

  async update(id: bigint, requestingUserId: bigint, dto: UpdateMatchDto) {
    const current = await this.findExistingMatch(id);
    const writeAccess = await this.access.resolveMatchWriteAccess(
      requestingUserId,
      id,
    );

    if (writeAccess.access === 'main_referee') {
      this.assertRefereeUpdate(dto);
    }

    const tournamentId =
      dto.tournamentId !== undefined
        ? BigInt(dto.tournamentId)
        : current.tournament_id;
    const homeTeamId =
      dto.homeTeamId !== undefined
        ? BigInt(dto.homeTeamId)
        : current.home_team_id;
    const awayTeamId =
      dto.awayTeamId !== undefined
        ? BigInt(dto.awayTeamId)
        : current.away_team_id;

    if (
      writeAccess.access === 'manager' &&
      tournamentId !== current.tournament_id
    ) {
      throw new BadRequestException(
        'Un partido no se puede trasladar a otro torneo. Crea un nuevo enfrentamiento en el torneo correcto.',
      );
    }
    await this.assertMatchUpdateAllowed(
      current.tournament_id,
      writeAccess.access,
      dto,
    );
    await this.assertValidParticipants(tournamentId, homeTeamId, awayTeamId);

    const nextStatus = dto.status ?? current.status;
    const nextHomeScore =
      dto.homeScore !== undefined ? dto.homeScore : current.home_score;
    const nextAwayScore =
      dto.awayScore !== undefined ? dto.awayScore : current.away_score;
    this.assertValidResult(nextStatus, nextHomeScore, nextAwayScore);

    const scheduleChanged =
      dto.matchDate !== undefined ||
      dto.venue !== undefined ||
      dto.durationMinutes !== undefined;
    const assignmentChanged =
      scheduleChanged ||
      (dto.status === 'cancelled' && current.status !== 'cancelled');

    const nextMatchDate =
      dto.matchDate === null
        ? null
        : dto.matchDate !== undefined
          ? new Date(dto.matchDate)
          : current.match_date;
    const nextDuration = dto.durationMinutes ?? current.duration_minutes;
    const actualScheduleChanged =
      (dto.matchDate !== undefined &&
        (nextMatchDate?.getTime() ?? null) !==
          (current.match_date?.getTime() ?? null)) ||
      (dto.venue !== undefined && dto.venue !== current.venue) ||
      (dto.durationMinutes !== undefined &&
        nextDuration !== current.duration_minutes) ||
      homeTeamId !== current.home_team_id ||
      awayTeamId !== current.away_team_id;
    const operationalEventCode: OperationalNotificationEventCode | null =
      nextStatus === 'cancelled' && current.status !== 'cancelled'
        ? OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED
        : nextStatus === 'postponed' && current.status !== 'postponed'
          ? OPERATIONAL_NOTIFICATION_EVENTS.MATCH_POSTPONED
          : actualScheduleChanged ||
              (nextStatus === 'scheduled' && current.status !== 'scheduled')
            ? OPERATIONAL_NOTIFICATION_EVENTS.MATCH_UPDATED
            : null;
    if (scheduleChanged && nextStatus !== 'cancelled') {
      await this.refereeAssignments.assertActiveAssignmentsCompatible(
        id,
        nextMatchDate,
      );
    }

    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
      const latest = await transaction.matches.findUniqueOrThrow({
        where: { id },
      });
      if (latest.updated_at.getTime() !== current.updated_at.getTime())
        throw new ConflictException('El partido cambió. Actualiza la página.');
      await this.assertManagedMatchUpdate(
        transaction,
        tournamentId,
        current.competition_key,
        dto,
        nextStatus,
        nextHomeScore,
        nextAwayScore,
        dto.homePenalties !== undefined
          ? dto.homePenalties
          : current.home_penalties,
        dto.awayPenalties !== undefined
          ? dto.awayPenalties
          : current.away_penalties,
      );
      const match = await transaction.matches.update({
        where: { id },
        data: {
          tournament_id:
            dto.tournamentId !== undefined ? tournamentId : undefined,
          home_team_id: dto.homeTeamId !== undefined ? homeTeamId : undefined,
          away_team_id: dto.awayTeamId !== undefined ? awayTeamId : undefined,
          match_date:
            dto.matchDate === null
              ? null
              : dto.matchDate !== undefined
                ? new Date(dto.matchDate)
                : undefined,
          venue: dto.venue,
          stage: dto.stage,
          round_number: dto.roundNumber,
          home_score: dto.homeScore,
          away_score: dto.awayScore,
          home_penalties: dto.homePenalties,
          away_penalties: dto.awayPenalties,
          status: dto.status,
          duration_minutes: dto.durationMinutes,
          notes: dto.notes,
          updated_at: new Date(),
        },
      });

      let activeRefereeIds: bigint[] = [];
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
          } else if (
            match.match_date &&
            match.match_date.getTime() >= Date.now()
          ) {
            await transaction.referee_assignment_events.createMany({
              data: assignments.map((assignment) => ({
                match_id: id,
                referee_id: assignment.referee_id,
                actor_user_id: requestingUserId,
                event_type: 'rescheduled',
                previous_status: assignment.assignment_status,
                new_status: assignment.assignment_status,
                reason:
                  'Cambió la fecha, el escenario, la duración o el estado del partido.',
              })),
            });
          }
        }
      }

      if (
        operationalEventCode &&
        (match.status === 'cancelled' ||
          (match.match_date && match.match_date.getTime() >= Date.now()))
      ) {
        await this.matchNotifications.notifyMatchChanged(
          match.id,
          operationalEventCode,
          activeRefereeIds,
          transaction,
        );
      }

      return match;
    });
  }

  async remove(id: bigint, requestingUserId: bigint) {
    const tournamentId = await this.access.assertCanManageMatch(
      requestingUserId,
      id,
    );
    await this.assertTournamentPhase(
      tournamentId,
      ['validation', 'scheduled'],
      'Los partidos solo se pueden eliminar antes de iniciar el torneo.',
    );
    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
      const tournament = await transaction.tournaments.findUniqueOrThrow({
        where: { id: tournamentId },
      });
      const current = await transaction.matches.findUniqueOrThrow({
        where: { id },
      });
      if (
        current.competition_key ||
        !['validation', 'scheduled'].includes(tournament.phase)
      )
        throw new BadRequestException(
          'No puedes eliminar un partido de una competencia organizada. Puedes reprogramarlo.',
        );
      await this.matchNotifications.notifyMatchChanged(
        id,
        OPERATIONAL_NOTIFICATION_EVENTS.MATCH_CANCELLED,
        [],
        transaction,
      );
      return transaction.matches.delete({ where: { id } });
    });
  }

  private async assertManagedMatchUpdate(
    tx: Prisma.TransactionClient,
    tournamentId: bigint,
    key: string | null,
    dto: UpdateMatchDto,
    status: string,
    home: number | null,
    away: number | null,
    homePenalties: number | null,
    awayPenalties: number | null,
  ) {
    const tournament = await tx.tournaments.findUniqueOrThrow({
      where: { id: tournamentId },
    });
    if (!['validation', 'scheduled', 'in_progress'].includes(tournament.phase))
      throw new BadRequestException(
        'El torneo ya no permite modificar partidos.',
      );
    if (
      tournament.phase !== 'in_progress' &&
      (home !== null ||
        away !== null ||
        homePenalties !== null ||
        awayPenalties !== null ||
        ['played', 'in_progress'].includes(status))
    )
      throw new BadRequestException(
        'Inicia el torneo antes de registrar resultados.',
      );
    const plan = readPlan(tournament.competition_plan);
    const stage = plan?.stages.find((s) =>
      s.fixtures.some((f) => f.key === key),
    );
    if (key) {
      if (!stage || stage.resolved)
        throw new BadRequestException(
          'La etapa ya fue resuelta y sus resultados están bloqueados.',
        );
      if (
        [
          dto.homeTeamId,
          dto.awayTeamId,
          dto.stage,
          dto.roundNumber,
          dto.tournamentId,
        ].some((v) => v !== undefined)
      )
        throw new BadRequestException(
          'Los equipos y las llaves quedan fijados por el sorteo.',
        );
    }
    if (homePenalties !== null || awayPenalties !== null) {
      if (
        homePenalties === null ||
        awayPenalties === null ||
        homePenalties === awayPenalties ||
        home !== away ||
        home === null ||
        status !== 'played' ||
        (stage && stage.kind !== 'knockout')
      )
        throw new BadRequestException(
          'Los penaltis requieren un empate final en eliminatorias y un ganador de la tanda.',
        );
    }
    if (
      stage?.kind === 'knockout' &&
      status === 'played' &&
      home === away &&
      (homePenalties === null || awayPenalties === null)
    )
      throw new BadRequestException(
        'Registra los penaltis para resolver el empate de la eliminatoria.',
      );
  }

  private async findExistingMatch(id: bigint) {
    const match = await this.prisma.matches.findUnique({ where: { id } });
    if (!match) {
      throw new NotFoundException(
        `No se encontró el partido con ID ${id.toString()}.`,
      );
    }
    return match;
  }

  private async assertValidParticipants(
    tournamentId: bigint,
    homeTeamId: bigint,
    awayTeamId: bigint,
  ): Promise<void> {
    if (homeTeamId === awayTeamId) {
      throw new BadRequestException(
        'Un equipo no puede enfrentarse contra sí mismo.',
      );
    }

    const approvedTeams = await this.prisma.tournament_team_registrations.count(
      {
        where: {
          tournament_id: tournamentId,
          team_id: { in: [homeTeamId, awayTeamId] },
          request_status: 'approved',
        },
      },
    );
    if (approvedTeams !== 2) {
      throw new BadRequestException(
        'Ambos equipos deben estar aprobados en el torneo del partido.',
      );
    }
  }

  private async assertMatchUpdateAllowed(
    tournamentId: bigint,
    access: 'manager' | 'main_referee',
    dto: UpdateMatchDto,
  ): Promise<void> {
    const tournament = await this.prisma.tournaments.findUnique({
      where: { id: tournamentId },
      select: { phase: true },
    });
    if (!tournament) {
      throw new NotFoundException('El torneo del partido no existe.');
    }

    if (access === 'main_referee') {
      if (tournament.phase !== 'in_progress') {
        throw new BadRequestException(
          'El árbitro solo puede registrar el desarrollo y el resultado cuando el torneo está En curso.',
        );
      }
      return;
    }

    if (
      !['validation', 'scheduled', 'in_progress'].includes(tournament.phase)
    ) {
      throw new BadRequestException(
        'Los partidos solo se pueden editar durante Validación, Programado o En curso.',
      );
    }

    if (['validation', 'scheduled'].includes(tournament.phase)) {
      if (
        dto.homeScore != null ||
        dto.awayScore != null ||
        (dto.status !== undefined &&
          !['scheduled', 'postponed', 'cancelled'].includes(dto.status))
      ) {
        throw new BadRequestException(
          'No se pueden registrar marcadores ni iniciar partidos antes de que el torneo esté En curso.',
        );
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
      throw new BadRequestException(
        'Los equipos, la etapa y la ronda quedan bloqueados cuando el torneo está En curso.',
      );
    }
  }

  private async assertTournamentPhase(
    tournamentId: bigint,
    allowedPhases: readonly string[],
    message: string,
  ): Promise<void> {
    const tournament = await this.prisma.tournaments.findUnique({
      where: { id: tournamentId },
      select: { phase: true },
    });
    if (!tournament) {
      throw new NotFoundException('El torneo solicitado no existe.');
    }
    if (!allowedPhases.includes(tournament.phase)) {
      throw new BadRequestException(message);
    }
  }

  private assertRefereeUpdate(dto: UpdateMatchDto): void {
    const allowed = new Set<keyof UpdateMatchDto>(REFEREE_EDITABLE_FIELDS);
    const forbiddenField = (Object.keys(dto) as (keyof UpdateMatchDto)[]).find(
      (field) => dto[field] !== undefined && !allowed.has(field),
    );
    if (forbiddenField) {
      throw new ForbiddenException(
        'El árbitro principal solo puede actualizar el marcador, el estado y las observaciones del partido.',
      );
    }
    if (
      dto.status !== undefined &&
      !['in_progress', 'played'].includes(dto.status)
    ) {
      throw new ForbiddenException(
        'El árbitro principal solo puede iniciar o finalizar el partido.',
      );
    }
  }

  private assertValidResult(
    status: string,
    homeScore: number | null | undefined,
    awayScore: number | null | undefined,
  ): void {
    const hasAnyScore = homeScore != null || awayScore != null;
    if (hasAnyScore && !['in_progress', 'played'].includes(status)) {
      throw new BadRequestException(
        'El marcador solo puede registrarse en un partido en curso o finalizado.',
      );
    }
    if (status === 'played' && (homeScore == null || awayScore == null)) {
      throw new BadRequestException(
        'Debes registrar ambos marcadores para finalizar el partido.',
      );
    }
  }
}
