import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import {
  assignedTeamIds,
  hasUnfilledSlots,
  readPlan,
} from '../competition/competition.engine';
import type { CompetitionPlan } from '../competition/competition.engine';
import { PrismaService } from '../prisma/prisma.service';
import type { TournamentLifecycleResponseDto } from './dto/tournament-lifecycle-response.dto';
import type { TournamentTransitionOptionResponseDto } from './dto/tournament-lifecycle-response.dto';
import type { TransitionTournamentDto } from './dto/transition-tournament.dto';
import {
  isTournamentPhase,
  TOURNAMENT_CANCELLABLE_PHASES,
  TOURNAMENT_FORWARD_TRANSITIONS,
  TOURNAMENT_PHASE_LABELS,
  type TournamentPhase,
} from './tournament-lifecycle.constants';
import {
  formatTournamentEligibilityError,
  getTournamentEligibilityIssues,
} from './tournament-eligibility';

type LifecycleClient = PrismaService | Prisma.TransactionClient;

type LifecycleSnapshot = {
  id: bigint;
  name: string;
  phase: TournamentPhase;
  status: string;
  startDate: Date;
  categoryName: string;
  categoryMinAge: number | null;
  categoryMaxAge: number | null;
  categoryGender: string;
  registrationEndDate: Date | null;
  minPlayersPerTeam: number;
  maxPlayersPerTeam: number;
  maxTeams: number;
  competitionPlan: CompetitionPlan | null;
  registrationFee: Prisma.Decimal;
  currencyCode: string;
  openDisciplinaryActions: number;
  pendingDisciplinaryAppeals: number;
  pendingFines: number;
  activeSuspensions: number;
  registrations: Array<{
    teamId: bigint;
    teamName: string;
    status: string;
    paymentStatus: string;
    amountPaid: Prisma.Decimal;
    captainUserId: bigint;
    players: Array<{
      isCaptain: boolean;
      fullName: string;
      birthDate: Date;
      gender: string | null;
    }>;
  }>;
  matches: Array<{
    status: string;
    matchDate: Date | null;
    homeTeamId: bigint;
    awayTeamId: bigint;
  }>;
};

@Injectable()
export class TournamentLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  async findLifecycle(
    tournamentId: bigint,
    requestingUserId: bigint,
  ): Promise<TournamentLifecycleResponseDto> {
    await this.access.assertCanManageTournament(requestingUserId, tournamentId);
    const snapshot = await this.findSnapshot(this.prisma, tournamentId);
    const history = await this.prisma.tournament_lifecycle_events.findMany({
      where: { tournament_id: tournamentId },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      select: {
        id: true,
        from_phase: true,
        to_phase: true,
        reason: true,
        created_at: true,
        actor_user_id: true,
        actor: { select: { full_name: true } },
      },
    });

    return {
      tournamentId: tournamentId.toString(),
      currentPhase: snapshot.phase,
      currentPhaseLabel: TOURNAMENT_PHASE_LABELS[snapshot.phase],
      transitions: this.buildTransitionOptions(snapshot),
      paymentSummary: this.buildPaymentSummary(snapshot),
      history: history.map((event) => ({
        id: event.id.toString(),
        fromPhase: this.toNullablePhase(event.from_phase),
        toPhase: this.toPhase(event.to_phase),
        reason: event.reason,
        createdAt: event.created_at.toISOString(),
        actorUserId: event.actor_user_id.toString(),
        actorName: event.actor.full_name,
      })),
    };
  }

  async transition(
    tournamentId: bigint,
    requestingUserId: bigint,
    dto: TransitionTournamentDto,
  ): Promise<TournamentLifecycleResponseDto> {
    await this.access.assertCanManageTournament(requestingUserId, tournamentId);
    const reason = dto.reason?.trim() || null;

    await this.prisma.$transaction(
      async (transaction) => {
        await transaction.$queryRaw`SELECT id FROM tournaments WHERE id = ${tournamentId} FOR UPDATE`;
        const snapshot = await this.findSnapshot(transaction, tournamentId);
        const option = this.buildTransitionOptions(snapshot).find(
          ({ phase }) => phase === dto.phase,
        );

        if (!option) {
          throw new BadRequestException(
            `No se puede pasar de ${TOURNAMENT_PHASE_LABELS[snapshot.phase]} a ${TOURNAMENT_PHASE_LABELS[dto.phase]}.`,
          );
        }
        if (option.requiresReason && !reason) {
          throw new BadRequestException(
            'Debes indicar el motivo para cancelar el torneo.',
          );
        }
        if (!option.allowed) {
          throw new BadRequestException({
            message: 'El torneo todavía no cumple los requisitos de esta fase.',
            blockers: option.blockers,
          });
        }

        const updated = await transaction.tournaments.updateMany({
          where: { id: tournamentId, phase: snapshot.phase },
          data: {
            phase: dto.phase,
            status: ['archived', 'cancelled'].includes(dto.phase)
              ? 'inactive'
              : undefined,
            updated_at: new Date(),
          },
        });
        if (updated.count !== 1) {
          throw new ConflictException(
            'El torneo cambió mientras realizabas la operación. Actualiza la página e inténtalo de nuevo.',
          );
        }

        await transaction.tournament_lifecycle_events.create({
          data: {
            tournament_id: tournamentId,
            actor_user_id: requestingUserId,
            from_phase: snapshot.phase,
            to_phase: dto.phase,
            reason,
          },
        });

        await this.notifyLifecycleChange(
          transaction,
          snapshot,
          dto.phase,
          requestingUserId,
          reason,
        );
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    return this.findLifecycle(tournamentId, requestingUserId);
  }

  private buildTransitionOptions(
    snapshot: LifecycleSnapshot,
  ): TournamentTransitionOptionResponseDto[] {
    const options: TournamentTransitionOptionResponseDto[] = [];
    const nextPhase = TOURNAMENT_FORWARD_TRANSITIONS[snapshot.phase];
    if (nextPhase) {
      const blockers = this.findBlockers(snapshot, nextPhase);
      options.push({
        phase: nextPhase,
        label: TOURNAMENT_PHASE_LABELS[nextPhase],
        allowed: blockers.length === 0,
        blockers,
        warnings: this.findWarnings(snapshot, nextPhase),
        requiresReason: false,
      });
    }

    if (TOURNAMENT_CANCELLABLE_PHASES.includes(snapshot.phase)) {
      options.push({
        phase: 'cancelled',
        label: TOURNAMENT_PHASE_LABELS.cancelled,
        allowed: true,
        blockers: [],
        warnings: [],
        requiresReason: true,
      });
    }
    return options;
  }

  private findWarnings(
    snapshot: LifecycleSnapshot,
    targetPhase: TournamentPhase,
  ): string[] {
    if (targetPhase !== 'in_progress') return [];

    const summary = this.buildPaymentSummary(snapshot);
    const teamsWithBalance = summary.partialTeams + summary.unpaidTeams;
    if (teamsWithBalance === 0) return [];

    return [
      `${teamsWithBalance} de ${summary.totalTeams} equipos aprobados todavía tienen saldo pendiente por ${this.formatAmount(summary.totalBalance, snapshot.currencyCode)}. Esto no impide iniciar el torneo, pero la deuda seguirá registrada.`,
    ];
  }

  private buildPaymentSummary(snapshot: LifecycleSnapshot) {
    const approved = snapshot.registrations.filter(
      ({ status }) => status === 'approved',
    );
    const paidTeams = approved.filter(
      ({ paymentStatus }) => paymentStatus === 'paid',
    ).length;
    const partialTeams = approved.filter(
      ({ paymentStatus }) => paymentStatus === 'partial',
    ).length;
    const unpaidTeams = approved.filter(
      ({ paymentStatus }) => paymentStatus === 'unpaid',
    ).length;
    const expectedAmount = snapshot.registrationFee.mul(approved.length);
    const totalPaid = approved.reduce(
      (total, registration) => total.plus(registration.amountPaid),
      new Prisma.Decimal(0),
    );
    const calculatedBalance = expectedAmount.minus(totalPaid);
    const totalBalance = calculatedBalance.isNegative()
      ? new Prisma.Decimal(0)
      : calculatedBalance;

    return {
      totalTeams: approved.length,
      paidTeams,
      partialTeams,
      unpaidTeams,
      expectedAmount: expectedAmount.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      totalBalance: totalBalance.toFixed(2),
      allPaid: partialTeams === 0 && unpaidTeams === 0,
    };
  }

  private formatAmount(amount: string, currencyCode: string): string {
    return `${new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(amount))} ${currencyCode.trim()}`;
  }

  private findBlockers(
    snapshot: LifecycleSnapshot,
    targetPhase: TournamentPhase,
  ): string[] {
    const blockers: string[] = [];
    const approvedRegistrations = snapshot.registrations.filter(
      ({ status }) => status === 'approved',
    );

    if (targetPhase === 'registration') {
      if (snapshot.status !== 'active') {
        blockers.push('Activa el torneo antes de abrir las inscripciones.');
      }
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      if (
        snapshot.registrationEndDate &&
        snapshot.registrationEndDate < today
      ) {
        blockers.push(
          'La fecha de cierre de inscripciones ya pasó; actualízala antes de abrirlas.',
        );
      }
    }

    if (targetPhase === 'scheduled') {
      if (!snapshot.competitionPlan)
        blockers.push(
          'Organiza y confirma el calendario o el cuadro antes de marcar el torneo como programado.',
        );
    }

    if (targetPhase === 'in_progress') {
      if (snapshot.competitionPlan) {
        const ids = approvedRegistrations.map(({ teamId }) =>
          teamId.toString(),
        );
        const assigned = assignedTeamIds(snapshot.competitionPlan);
        if (
          ids.length !== assigned.length ||
          ids.some((id) => !assigned.includes(id))
        )
          blockers.push(
            'Los equipos aprobados no coinciden con la organización guardada. Revisa las inscripciones.',
          );
        if (hasUnfilledSlots(snapshot.competitionPlan))
          blockers.push(
            'Todos los lugares del sorteo deben tener un equipo aprobado antes de iniciar el torneo.',
          );
      }
      if (approvedRegistrations.length < 6)
        blockers.push(
          'Se necesitan al menos seis equipos aprobados para iniciar el torneo.',
        );
      if (approvedRegistrations.length < snapshot.maxTeams)
        blockers.push(
          `Completa los ${snapshot.maxTeams - approvedRegistrations.length} lugar${snapshot.maxTeams - approvedRegistrations.length === 1 ? '' : 'es'} pendiente${snapshot.maxTeams - approvedRegistrations.length === 1 ? '' : 's'} antes de iniciar el torneo.`,
        );
      if (approvedRegistrations.length > snapshot.maxTeams)
        blockers.push(
          `Hay ${approvedRegistrations.length} equipos aprobados y el torneo admite máximo ${snapshot.maxTeams}.`,
        );
      const unresolved = snapshot.registrations.filter(({ status }) =>
        ['pending', 'changes_requested'].includes(status),
      ).length;
      if (unresolved > 0)
        blockers.push(
          `Resuelve ${unresolved} solicitud${unresolved === 1 ? '' : 'es'} pendiente${unresolved === 1 ? '' : 's'}.`,
        );

      for (const registration of approvedRegistrations) {
        const playerCount = registration.players.length;
        if (
          playerCount < snapshot.minPlayersPerTeam ||
          playerCount > snapshot.maxPlayersPerTeam
        )
          blockers.push(
            `El equipo ${registration.teamId.toString()} debe tener entre ${snapshot.minPlayersPerTeam} y ${snapshot.maxPlayersPerTeam} jugadores aprobados.`,
          );
        if (
          registration.players.filter(({ isCaptain }) => isCaptain).length !== 1
        )
          blockers.push(
            `El equipo ${registration.teamId.toString()} debe tener exactamente un capitán en su plantilla aprobada.`,
          );
        const eligibilityRules = {
          name: snapshot.name,
          startDate: snapshot.startDate,
          categoryName: snapshot.categoryName,
          minAge: snapshot.categoryMinAge,
          maxAge: snapshot.categoryMaxAge,
          gender: snapshot.categoryGender,
        };
        const eligibilityIssues = getTournamentEligibilityIssues(
          eligibilityRules,
          registration.players,
        );
        if (eligibilityIssues.length > 0)
          blockers.push(
            `${registration.teamName}: ${formatTournamentEligibilityError(eligibilityRules, eligibilityIssues)}`,
          );
      }

      const activeMatches = snapshot.matches.filter(
        ({ status }) => status !== 'cancelled',
      );
      if (activeMatches.length === 0) {
        blockers.push('El torneo debe tener al menos un partido programado.');
      }
      if (activeMatches.some(({ matchDate }) => !matchDate)) {
        blockers.push(
          'Todos los partidos activos deben tener una fecha asignada.',
        );
      }
      const teamsWithMatches = new Set(
        activeMatches.flatMap(({ homeTeamId, awayTeamId }) => [
          homeTeamId.toString(),
          awayTeamId.toString(),
        ]),
      );
      const missingTeams = approvedRegistrations.filter(
        ({ teamId }) => !teamsWithMatches.has(teamId.toString()),
      );
      if (missingTeams.length > 0)
        blockers.push(
          `${missingTeams.length} equipo${missingTeams.length === 1 ? '' : 's'} aprobado${missingTeams.length === 1 ? '' : 's'} aún no tiene${missingTeams.length === 1 ? '' : 'n'} enfrentamientos.`,
        );
    }

    if (targetPhase === 'finished') {
      if (snapshot.competitionPlan && !snapshot.competitionPlan.champion) {
        blockers.push(
          'Resuelve todas las etapas deportivas y define el campeón antes de finalizar.',
        );
      }
      const playedMatches = snapshot.matches.filter(
        ({ status }) => status === 'played',
      );
      if (playedMatches.length === 0) {
        blockers.push('Debe existir al menos un partido jugado.');
      }
      const unfinished = snapshot.matches.filter(
        ({ status }) => !['played', 'cancelled'].includes(status),
      ).length;
      if (unfinished > 0) {
        blockers.push(
          `Finaliza o cancela los ${unfinished} partido${unfinished === 1 ? '' : 's'} pendiente${unfinished === 1 ? '' : 's'}.`,
        );
      }
    }

    if (targetPhase === 'archived') {
      if (snapshot.openDisciplinaryActions > 0) {
        blockers.push(
          `Resuelve ${snapshot.openDisciplinaryActions} novedad${snapshot.openDisciplinaryActions === 1 ? '' : 'es'} disciplinaria${snapshot.openDisciplinaryActions === 1 ? '' : 's'} pendiente${snapshot.openDisciplinaryActions === 1 ? '' : 's'}.`,
        );
      }
      if (snapshot.pendingDisciplinaryAppeals > 0) {
        blockers.push(
          `Resuelve ${snapshot.pendingDisciplinaryAppeals} apelación${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 'es'} disciplinaria${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 's'} pendiente${snapshot.pendingDisciplinaryAppeals === 1 ? '' : 's'}.`,
        );
      }
      if (snapshot.pendingFines > 0) {
        blockers.push(
          `Cierra ${snapshot.pendingFines} multa${snapshot.pendingFines === 1 ? '' : 's'} pendiente${snapshot.pendingFines === 1 ? '' : 's'} antes de archivar.`,
        );
      }
      if (snapshot.activeSuspensions > 0) {
        blockers.push(
          `Marca como cumplida o revocada ${snapshot.activeSuspensions} suspensión${snapshot.activeSuspensions === 1 ? '' : 'es'} activa${snapshot.activeSuspensions === 1 ? '' : 's'}.`,
        );
      }
    }

    return [...new Set(blockers)];
  }

  private async findSnapshot(
    client: LifecycleClient,
    tournamentId: bigint,
  ): Promise<LifecycleSnapshot> {
    const [
      tournament,
      matches,
      openDisciplinaryActions,
      pendingDisciplinaryAppeals,
      pendingFines,
      activeSuspensions,
    ] = await Promise.all([
      client.tournaments.findUnique({
        where: { id: tournamentId },
        select: {
          id: true,
          name: true,
          phase: true,
          status: true,
          start_date: true,
          category_name: true,
          category_min_age: true,
          category_max_age: true,
          category_gender: true,
          registration_end_date: true,
          min_players_per_team: true,
          max_players_per_team: true,
          max_teams: true,
          competition_plan: true,
          registration_fee: true,
          currency_code: true,
          tournament_team_registrations: {
            select: {
              team_id: true,
              request_status: true,
              payment_status: true,
              amount_paid: true,
              teams: { select: { captain_user_id: true, name: true } },
              tournament_team_players: {
                where: { registration_status: 'approved' },
                select: {
                  is_captain: true,
                  team_members: {
                    select: {
                      users: {
                        select: {
                          full_name: true,
                          birth_date: true,
                          gender: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
      client.matches.findMany({
        where: { tournament_id: tournamentId },
        select: {
          status: true,
          match_date: true,
          home_team_id: true,
          away_team_id: true,
        },
      }),
      client.disciplinary_actions.count({
        where: {
          tournament_id: tournamentId,
          decision_status: { in: ['reported', 'under_review'] },
        },
      }),
      client.disciplinary_appeals.count({
        where: {
          status: 'pending',
          disciplinary_action: { tournament_id: tournamentId },
        },
      }),
      client.fines.count({
        where: {
          payment_status: 'pending',
          disciplinary_actions: { tournament_id: tournamentId },
        },
      }),
      client.suspensions.count({
        where: {
          status: 'active',
          disciplinary_actions: { tournament_id: tournamentId },
        },
      }),
    ]);
    if (!tournament) {
      throw new NotFoundException('El torneo solicitado no existe.');
    }

    return {
      id: tournament.id,
      name: tournament.name,
      phase: this.toPhase(tournament.phase),
      status: tournament.status,
      startDate: tournament.start_date,
      categoryName: tournament.category_name,
      categoryMinAge: tournament.category_min_age,
      categoryMaxAge: tournament.category_max_age,
      categoryGender: tournament.category_gender,
      registrationEndDate: tournament.registration_end_date,
      minPlayersPerTeam: tournament.min_players_per_team,
      maxPlayersPerTeam: tournament.max_players_per_team,
      maxTeams: tournament.max_teams,
      competitionPlan: readPlan(tournament.competition_plan),
      registrationFee: tournament.registration_fee,
      currencyCode: tournament.currency_code,
      openDisciplinaryActions,
      pendingDisciplinaryAppeals,
      pendingFines,
      activeSuspensions,
      registrations: tournament.tournament_team_registrations.map(
        (registration) => ({
          teamId: registration.team_id,
          teamName: registration.teams.name,
          status: registration.request_status,
          paymentStatus: registration.payment_status,
          amountPaid: registration.amount_paid,
          captainUserId: registration.teams.captain_user_id,
          players: registration.tournament_team_players.map((player) => ({
            isCaptain: player.is_captain,
            fullName: player.team_members.users.full_name,
            birthDate: player.team_members.users.birth_date,
            gender: player.team_members.users.gender,
          })),
        }),
      ),
      matches: matches.map((match) => ({
        status: match.status,
        matchDate: match.match_date,
        homeTeamId: match.home_team_id,
        awayTeamId: match.away_team_id,
      })),
    };
  }

  private async notifyLifecycleChange(
    transaction: Prisma.TransactionClient,
    snapshot: LifecycleSnapshot,
    targetPhase: TournamentPhase,
    requestingUserId: bigint,
    reason: string | null,
  ): Promise<void> {
    const [referees, rosterPlayers] = await Promise.all([
      transaction.tournament_referees.findMany({
        where: { tournament_id: snapshot.id, status: 'active' },
        select: { user_id: true },
      }),
      transaction.tournament_team_players.findMany({
        where: {
          tournament_id: snapshot.id,
          registration_status: 'approved',
        },
        select: { player_id: true },
      }),
    ]);
    const recipientIds = [
      ...new Set([
        ...snapshot.registrations.map(({ captainUserId }) => captainUserId),
        ...referees.map(({ user_id }) => user_id),
        ...rosterPlayers.map(({ player_id }) => player_id),
      ]),
    ].filter((userId) => userId !== requestingUserId);
    if (recipientIds.length === 0) return;

    const targetLabel = TOURNAMENT_PHASE_LABELS[targetPhase];
    const isCancelled = targetPhase === 'cancelled';
    await transaction.notifications.createMany({
      data: recipientIds.map((userId) => ({
        user_id: userId,
        type: 'tournament',
        title: isCancelled ? 'Torneo cancelado' : `Torneo en ${targetLabel}`,
        message: isCancelled
          ? `${snapshot.name} fue cancelado.${reason ? ` Motivo: ${reason}` : ''}`
          : `${snapshot.name} avanzó a la fase ${targetLabel}.`,
        entity_type: 'tournament',
        entity_id: snapshot.id.toString(),
        metadata: {
          tournamentId: snapshot.id.toString(),
          tournamentName: snapshot.name,
          fromPhase: snapshot.phase,
          toPhase: targetPhase,
          reason,
          actionUrl: `/tournaments/${snapshot.id.toString()}`,
          actionLabel: 'Ver torneo',
        },
      })),
    });
  }

  private toPhase(value: string): TournamentPhase {
    if (!isTournamentPhase(value)) {
      throw new BadRequestException(
        `El torneo tiene una fase no reconocida: ${value}.`,
      );
    }
    return value;
  }

  private toNullablePhase(value: string | null): TournamentPhase | null {
    return value === null ? null : this.toPhase(value);
  }
}
