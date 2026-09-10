import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { CreateDisciplinaryAppealDto } from './dto/create-disciplinary-appeal.dto';
import {
  DecideDisciplinaryActionDto,
  DisciplinarySuspensionDecisionDto,
} from './dto/decide-disciplinary-action.dto';
import { ListDisciplinaryActionsQueryDto } from './dto/list-disciplinary-actions-query.dto';
import { ResolveDisciplinaryAppealDto } from './dto/resolve-disciplinary-appeal.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';
import { UpdateDisciplinaryComplianceDto } from './dto/update-disciplinary-compliance.dto';

const APPEAL_WINDOW_DAYS = 3;
const YELLOW_CARD_SUSPENSION_THRESHOLD = 3;
type DatabaseClient = Prisma.TransactionClient | PrismaService;

const actionSelect = {
  id: true,
  tournament_id: true,
  match_id: true,
  team_id: true,
  player_id: true,
  card_type: true,
  reason: true,
  occurred_at: true,
  reported_by: true,
  decision_status: true,
  review_started_by: true,
  review_started_at: true,
  decided_by: true,
  decided_at: true,
  decision_notes: true,
  appeal_deadline: true,
  created_at: true,
  updated_at: true,
  users_disciplinary_actions_reported_byTousers: {
    select: { id: true, full_name: true },
  },
  reviewer: { select: { id: true, full_name: true } },
  users_disciplinary_actions_decided_byTousers: {
    select: { id: true, full_name: true },
  },
  tournament_team_players: {
    select: {
      jersey_number: true,
      team_members: {
        select: {
          users: {
            select: {
              id: true,
              full_name: true,
              email: true,
              photo_url: true,
              status: true,
            },
          },
          teams: { select: { id: true, name: true } },
        },
      },
      tournament_team_registrations: {
        select: {
          tournaments: {
            select: { id: true, name: true, phase: true },
          },
        },
      },
    },
  },
  matches: {
    select: {
      id: true,
      match_date: true,
      venue: true,
      status: true,
      home_score: true,
      away_score: true,
      tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations:
        { select: { teams: { select: { id: true, name: true } } } },
      tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations:
        { select: { teams: { select: { id: true, name: true } } } },
    },
  },
  fines: true,
  suspensions: true,
  disciplinary_appeals: {
    include: { reviewer: { select: { id: true, full_name: true } } },
  },
  disciplinary_events: {
    orderBy: [{ created_at: 'asc' }, { id: 'asc' }],
    include: { actor: { select: { id: true, full_name: true } } },
  },
} satisfies Prisma.disciplinary_actionsSelect;

type ActionRecord = Prisma.disciplinary_actionsGetPayload<{
  select: typeof actionSelect;
}>;

@Injectable()
export class DisciplinaryActionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  async create(requestingUserId: bigint, dto: CreateDisciplinaryActionDto) {
    await this.access.assertHasAnyRole(requestingUserId, ['REFEREE']);
    if (!dto.matchId) {
      throw new BadRequestException(
        'El informe arbitral debe estar asociado a un partido.',
      );
    }
    const tournamentId = BigInt(dto.tournamentId);
    const matchId = BigInt(dto.matchId);
    const teamId = BigInt(dto.teamId);
    const playerId = BigInt(dto.playerId);
    await this.assertAcceptedRefereeAssignment(requestingUserId, matchId);
    await this.access.assertTournamentInPhases(
      tournamentId,
      ['in_progress'],
      'Los informes arbitrales solo se pueden registrar mientras el torneo está En curso.',
    );
    await this.assertValidSubject(tournamentId, matchId, teamId, playerId);

    const actionId = await this.prisma.$transaction(async (transaction) => {
      const action = await transaction.disciplinary_actions.create({
        data: {
          tournament_id: tournamentId,
          match_id: matchId,
          team_id: teamId,
          player_id: playerId,
          card_type: dto.cardType ?? 'none',
          reason: dto.reason.trim(),
          occurred_at: dto.occurredAt ? new Date(dto.occurredAt) : undefined,
          reported_by: requestingUserId,
          decision_status: 'reported',
        },
        select: { id: true },
      });
      await this.createEvent(
        transaction,
        action.id,
        requestingUserId,
        'reported',
        dto.reason.trim(),
        { cardType: dto.cardType ?? 'none', matchId: matchId.toString() },
      );
      const tournament = await transaction.tournaments.findUniqueOrThrow({
        where: { id: tournamentId },
        select: { name: true },
      });
      const player = await transaction.users.findUniqueOrThrow({
        where: { id: playerId },
        select: { full_name: true },
      });
      await this.notifyMany(
        transaction,
        await this.findSuperAdminIds(transaction),
        {
          type: 'discipline_report',
          title: 'Nuevo informe arbitral por revisar',
          message: `${player.full_name} fue reportado en ${tournament.name}.`,
          entityType: 'disciplinary_action',
          entityId: action.id.toString(),
          actionUrl: '/discipline',
          actionLabel: 'Revisar informe',
        },
      );
      await this.notifyMany(transaction, [playerId], {
        type: 'discipline_report',
        title: 'Tienes un informe arbitral en revisión',
        message: `Se registró una novedad disciplinaria en ${tournament.name}. Aún no existe una sanción decidida.`,
        entityType: 'disciplinary_action',
        entityId: action.id.toString(),
        actionUrl: '/discipline',
        actionLabel: 'Ver informe',
      });
      return action.id;
    });
    return this.findOne(actionId, requestingUserId);
  }

  async findReportOptions(requestingUserId: bigint, matchId: bigint) {
    await this.access.assertHasAnyRole(requestingUserId, ['REFEREE']);
    await this.assertAcceptedRefereeAssignment(requestingUserId, matchId);
    const match = await this.prisma.matches.findUnique({
      where: { id: matchId },
      select: {
        id: true,
        tournament_id: true,
        match_date: true,
        venue: true,
        tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations:
          {
            select: {
              teams: { select: { id: true, name: true } },
              tournaments: { select: { id: true, name: true, phase: true } },
              tournament_team_players: {
                where: { registration_status: 'approved' },
                orderBy: [{ team_members: { users: { full_name: 'asc' } } }],
                select: {
                  player_id: true,
                  jersey_number: true,
                  team_members: {
                    select: {
                      users: { select: { full_name: true, photo_url: true } },
                    },
                  },
                },
              },
            },
          },
        tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations:
          {
            select: {
              teams: { select: { id: true, name: true } },
              tournament_team_players: {
                where: { registration_status: 'approved' },
                orderBy: [{ team_members: { users: { full_name: 'asc' } } }],
                select: {
                  player_id: true,
                  jersey_number: true,
                  team_members: {
                    select: {
                      users: { select: { full_name: true, photo_url: true } },
                    },
                  },
                },
              },
            },
          },
      },
    });
    if (!match) throw new NotFoundException('El partido no existe.');
    const home =
      match.tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations;
    const away =
      match.tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations;
    return {
      matchId: match.id.toString(),
      tournamentId: match.tournament_id.toString(),
      tournamentName: home.tournaments.name,
      tournamentPhase: home.tournaments.phase,
      matchDate: match.match_date?.toISOString() ?? null,
      venue: match.venue,
      teams: [
        this.toReportTeam(home.teams, home.tournament_team_players),
        this.toReportTeam(away.teams, away.tournament_team_players),
      ],
    };
  }

  async findAll(
    requestingUserId: bigint,
    query: ListDisciplinaryActionsQueryDto,
  ) {
    const roles = await this.access.findRoleCodes(requestingUserId);
    const visibility = await this.buildVisibleWhere(requestingUserId, roles);
    const search = query.search?.trim();
    const filteredWhere: Prisma.disciplinary_actionsWhereInput = {
      AND: [
        visibility ?? {},
        query.status ? { decision_status: query.status } : {},
        search
          ? {
              OR: [
                { reason: { contains: search, mode: 'insensitive' } },
                {
                  tournament_team_players: {
                    team_members: {
                      users: {
                        full_name: { contains: search, mode: 'insensitive' },
                      },
                    },
                  },
                },
                {
                  tournament_team_players: {
                    team_members: {
                      teams: {
                        name: { contains: search, mode: 'insensitive' },
                      },
                    },
                  },
                },
                {
                  tournament_team_players: {
                    tournament_team_registrations: {
                      tournaments: {
                        name: { contains: search, mode: 'insensitive' },
                      },
                    },
                  },
                },
              ],
            }
          : {},
      ],
    };
    const skip = (query.page - 1) * query.pageSize;
    const metricWhere = visibility ?? {};
    const [
      total,
      items,
      reported,
      underReview,
      approved,
      dismissed,
      appealsPending,
    ] = await this.prisma.$transaction([
      this.prisma.disciplinary_actions.count({ where: filteredWhere }),
      this.prisma.disciplinary_actions.findMany({
        where: filteredWhere,
        orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
        skip,
        take: query.pageSize,
        select: actionSelect,
      }),
      this.prisma.disciplinary_actions.count({
        where: { AND: [metricWhere, { decision_status: 'reported' }] },
      }),
      this.prisma.disciplinary_actions.count({
        where: { AND: [metricWhere, { decision_status: 'under_review' }] },
      }),
      this.prisma.disciplinary_actions.count({
        where: { AND: [metricWhere, { decision_status: 'approved' }] },
      }),
      this.prisma.disciplinary_actions.count({
        where: { AND: [metricWhere, { decision_status: 'dismissed' }] },
      }),
      this.prisma.disciplinary_appeals.count({
        where: { status: 'pending', disciplinary_action: metricWhere },
      }),
    ]);
    const accumulation = await this.getAccumulationForActions(items);
    return {
      items: items.map((item) =>
        this.toResponse(item, accumulation.get(this.accumulationKey(item))),
      ),
      metrics: {
        total: reported + underReview + approved + dismissed,
        reported,
        underReview,
        approved,
        dismissed,
        appealsPending,
      },
      page: query.page,
      pageSize: query.pageSize,
      total,
      hasNextPage: skip + items.length < total,
    };
  }

  async findOne(id: bigint, requestingUserId: bigint) {
    const action = await this.findExisting(id);
    await this.assertCanViewAction(action, requestingUserId);
    const accumulation = await this.getAccumulationForActions([action]);
    return this.toResponse(
      action,
      accumulation.get(this.accumulationKey(action)),
    );
  }

  async startReview(id: bigint, requestingUserId: bigint) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    if (current.decision_status !== 'reported') {
      throw new ConflictException(
        'Este informe ya fue tomado para revisión o decidido.',
      );
    }
    const now = new Date();
    await this.prisma.$transaction(async (transaction) => {
      const result = await transaction.disciplinary_actions.updateMany({
        where: { id, decision_status: 'reported' },
        data: {
          decision_status: 'under_review',
          review_started_by: requestingUserId,
          review_started_at: now,
          updated_at: now,
        },
      });
      if (result.count !== 1) {
        throw new ConflictException(
          'Otro usuario ya tomó este informe para revisión.',
        );
      }
      await this.createEvent(
        transaction,
        id,
        requestingUserId,
        'review_started',
        'El informe entró en revisión.',
      );
      await this.notifyMany(transaction, [current.player_id], {
        type: 'discipline_review',
        title: 'Tu informe disciplinario está en revisión',
        message:
          'Un superadministrador inició la revisión del informe arbitral.',
        entityType: 'disciplinary_action',
        entityId: id.toString(),
        actionUrl: '/discipline',
        actionLabel: 'Ver seguimiento',
      });
    });
    return this.findOne(id, requestingUserId);
  }

  async decide(
    id: bigint,
    requestingUserId: bigint,
    dto: DecideDisciplinaryActionDto,
  ) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    if (!['reported', 'under_review'].includes(current.decision_status)) {
      throw new ConflictException(
        'Este informe ya tiene una decisión definitiva.',
      );
    }
    if (
      dto.decision === 'dismissed' &&
      (dto.suspension || dto.fine || dto.block)
    ) {
      throw new BadRequestException(
        'Un informe desestimado no puede generar sanciones.',
      );
    }
    if (
      dto.suspension &&
      !dto.suspension.matchesCount &&
      !dto.suspension.startDate &&
      !dto.suspension.endDate
    ) {
      throw new BadRequestException(
        'Indica partidos o fechas para la suspensión.',
      );
    }
    await this.access.assertTournamentInPhases(
      current.tournament_id,
      ['in_progress', 'finished'],
      'La gestión disciplinaria de este torneo ya está cerrada.',
    );
    const now = new Date();
    const appealDeadline =
      dto.decision === 'approved'
        ? this.addDays(now, APPEAL_WINDOW_DAYS)
        : null;

    await this.prisma.$transaction(
      async (transaction) => {
        const changed = await transaction.disciplinary_actions.updateMany({
          where: {
            id,
            decision_status: { in: ['reported', 'under_review'] },
          },
          data: {
            decision_status: dto.decision,
            review_started_by: current.review_started_by ?? requestingUserId,
            review_started_at: current.review_started_at ?? now,
            decided_by: requestingUserId,
            decided_at: now,
            decision_notes: dto.notes.trim(),
            appeal_deadline: appealDeadline,
            updated_at: now,
          },
        });
        if (changed.count !== 1) {
          throw new ConflictException('Otro usuario ya decidió este informe.');
        }
        await this.createEvent(
          transaction,
          id,
          requestingUserId,
          dto.decision,
          dto.notes.trim(),
        );

        if (dto.decision === 'approved') {
          const automaticSuspension = await this.resolveAutomaticSuspension(
            transaction,
            current,
          );
          const suspension = dto.suspension ?? automaticSuspension;
          if (suspension) {
            await transaction.suspensions.create({
              data: {
                disciplinary_action_id: id,
                matches_count: suspension.matchesCount ?? null,
                start_date: suspension.startDate
                  ? new Date(suspension.startDate)
                  : null,
                end_date: suspension.endDate
                  ? new Date(suspension.endDate)
                  : null,
                reason:
                  suspension.reason?.trim() || 'Suspensión disciplinaria.',
                status: 'active',
                created_by: requestingUserId,
              },
            });
            await this.createEvent(
              transaction,
              id,
              requestingUserId,
              'suspension_created',
              suspension.reason ?? 'Suspensión aplicada.',
              {
                matchesCount: suspension.matchesCount ?? null,
                automatic: Boolean(automaticSuspension && !dto.suspension),
              },
            );
          }
          if (dto.fine) {
            await transaction.fines.create({
              data: {
                disciplinary_action_id: id,
                amount: new Prisma.Decimal(dto.fine.amount),
                due_date: dto.fine.dueDate ? new Date(dto.fine.dueDate) : null,
                notes: dto.fine.notes?.trim() || null,
                created_by: requestingUserId,
              },
            });
            await this.createEvent(
              transaction,
              id,
              requestingUserId,
              'fine_created',
              dto.fine.notes?.trim() || 'Multa aplicada.',
              { amount: dto.fine.amount, currencyCode: 'COP' },
            );
          }
          if (dto.block) {
            if (current.player_id === requestingUserId) {
              throw new BadRequestException(
                'No puedes bloquear tu propia cuenta.',
              );
            }
            const blockedUntil = this.calculateBlockedUntil(
              now,
              dto.block.duration,
            );
            await transaction.users.update({
              where: { id: current.player_id },
              data: {
                status: 'inactive',
                blocked_until: blockedUntil,
                block_reason: dto.block.reason.trim(),
                blocked_by: requestingUserId,
                block_source_action_id: id,
                updated_at: now,
              },
            });
            await transaction.auth_sessions.updateMany({
              where: { user_id: current.player_id, revoked_at: null },
              data: { revoked_at: now },
            });
            await this.createEvent(
              transaction,
              id,
              requestingUserId,
              'account_blocked',
              dto.block.reason.trim(),
              { blockedUntil: blockedUntil.toISOString() },
            );
          }
        }
        const tournament = await transaction.tournaments.findUniqueOrThrow({
          where: { id: current.tournament_id },
          select: { name: true },
        });
        const measureText =
          dto.decision === 'dismissed'
            ? 'El informe fue desestimado y no generó sanciones.'
            : this.buildMeasuresText(dto);
        await this.notifyMany(transaction, [current.player_id], {
          type: 'discipline_decision',
          title:
            dto.decision === 'approved'
              ? 'Se decidió tu caso disciplinario'
              : 'Tu informe disciplinario fue desestimado',
          message: `${tournament.name}: ${measureText}${
            appealDeadline
              ? ` Puedes apelar hasta el ${this.formatDate(appealDeadline)}.`
              : ''
          }`,
          entityType: 'disciplinary_action',
          entityId: id.toString(),
          actionUrl: '/discipline',
          actionLabel: 'Ver decisión',
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    return this.findOne(id, requestingUserId);
  }

  async appeal(
    id: bigint,
    requestingUserId: bigint,
    dto: CreateDisciplinaryAppealDto,
  ) {
    await this.access.assertHasAnyRole(requestingUserId, ['PLAYER']);
    const current = await this.findExisting(id);
    if (current.player_id !== requestingUserId) {
      throw new ForbiddenException(
        'Solo el jugador afectado puede apelar esta decisión.',
      );
    }
    if (current.decision_status !== 'approved' || !current.appeal_deadline) {
      throw new BadRequestException(
        'Este caso no tiene una decisión sancionatoria apelable.',
      );
    }
    if (current.appeal_deadline.getTime() < Date.now()) {
      throw new BadRequestException('El plazo de apelación ya finalizó.');
    }
    try {
      await this.prisma.$transaction(async (transaction) => {
        await transaction.disciplinary_appeals.create({
          data: {
            disciplinary_action_id: id,
            player_id: requestingUserId,
            message: dto.message.trim(),
          },
        });
        await this.createEvent(
          transaction,
          id,
          requestingUserId,
          'appealed',
          dto.message.trim(),
        );
        await this.notifyMany(
          transaction,
          await this.findSuperAdminIds(transaction),
          {
            type: 'discipline_appeal',
            title: 'Nueva apelación disciplinaria',
            message: 'Un jugador apeló una decisión y espera revisión.',
            entityType: 'disciplinary_action',
            entityId: id.toString(),
            actionUrl: '/discipline',
            actionLabel: 'Revisar apelación',
          },
        );
      });
    } catch (error) {
      if (this.isUniqueConstraint(error)) {
        throw new ConflictException(
          'Este caso ya tiene una apelación registrada.',
        );
      }
      throw error;
    }
    return this.findOne(id, requestingUserId);
  }

  async resolveAppeal(
    id: bigint,
    requestingUserId: bigint,
    dto: ResolveDisciplinaryAppealDto,
  ) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    const appeal = current.disciplinary_appeals;
    if (!appeal || appeal.status !== 'pending') {
      throw new BadRequestException(
        'Este caso no tiene una apelación pendiente.',
      );
    }
    const now = new Date();
    await this.prisma.$transaction(async (transaction) => {
      await transaction.disciplinary_appeals.update({
        where: { disciplinary_action_id: id },
        data: {
          status: dto.decision,
          reviewed_by: requestingUserId,
          reviewed_at: now,
          resolution_notes: dto.notes.trim(),
          updated_at: now,
        },
      });
      if (dto.decision === 'accepted') {
        await transaction.disciplinary_actions.update({
          where: { id },
          data: {
            decision_status: 'dismissed',
            decision_notes:
              `${current.decision_notes ?? ''}\nApelación aceptada: ${dto.notes.trim()}`.trim(),
            updated_at: now,
          },
        });
        await transaction.suspensions.updateMany({
          where: { disciplinary_action_id: id, status: 'active' },
          data: { status: 'revoked', completed_at: now, updated_at: now },
        });
        await transaction.fines.updateMany({
          where: {
            disciplinary_action_id: id,
            payment_status: 'pending',
          },
          data: { payment_status: 'waived', updated_at: now },
        });
        await transaction.users.updateMany({
          where: { id: current.player_id, block_source_action_id: id },
          data: {
            status: 'active',
            blocked_until: null,
            block_reason: null,
            blocked_by: null,
            block_source_action_id: null,
            updated_at: now,
          },
        });
      }
      await this.createEvent(
        transaction,
        id,
        requestingUserId,
        dto.decision === 'accepted' ? 'appeal_accepted' : 'appeal_rejected',
        dto.notes.trim(),
      );
      await this.notifyMany(transaction, [current.player_id], {
        type: 'discipline_appeal',
        title:
          dto.decision === 'accepted'
            ? 'Tu apelación fue aceptada'
            : 'Tu apelación fue rechazada',
        message: dto.notes.trim(),
        entityType: 'disciplinary_action',
        entityId: id.toString(),
        actionUrl: '/discipline',
        actionLabel: 'Ver resolución',
      });
    });
    return this.findOne(id, requestingUserId);
  }

  async updateCompliance(
    id: bigint,
    requestingUserId: bigint,
    dto: UpdateDisciplinaryComplianceDto,
  ) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    if (current.decision_status !== 'approved') {
      throw new BadRequestException(
        'Solo se puede registrar cumplimiento en sanciones aprobadas.',
      );
    }
    if (!dto.suspensionStatus && !dto.fineStatus && !dto.unblockAccount) {
      throw new BadRequestException(
        'Indica al menos una medida por actualizar.',
      );
    }
    if (dto.fineStatus === 'paid' && !dto.paymentReference?.trim()) {
      throw new BadRequestException(
        'La referencia de pago es obligatoria para marcar una multa como pagada.',
      );
    }
    const now = new Date();
    await this.prisma.$transaction(async (transaction) => {
      if (dto.suspensionStatus) {
        const result = await transaction.suspensions.updateMany({
          where: { disciplinary_action_id: id, status: 'active' },
          data: {
            status: dto.suspensionStatus,
            completed_at: now,
            updated_at: now,
          },
        });
        if (!result.count) {
          throw new BadRequestException(
            'No existe una suspensión activa en este caso.',
          );
        }
        await this.createEvent(
          transaction,
          id,
          requestingUserId,
          dto.suspensionStatus === 'served'
            ? 'suspension_served'
            : 'suspension_revoked',
          dto.notes?.trim(),
        );
      }
      if (dto.fineStatus) {
        const result = await transaction.fines.updateMany({
          where: {
            disciplinary_action_id: id,
            payment_status: 'pending',
          },
          data: {
            payment_status: dto.fineStatus,
            paid_at: dto.fineStatus === 'paid' ? now : null,
            payment_reference:
              dto.fineStatus === 'paid' ? dto.paymentReference?.trim() : null,
            updated_at: now,
          },
        });
        if (!result.count) {
          throw new BadRequestException(
            'No existe una multa pendiente en este caso.',
          );
        }
        await this.createEvent(
          transaction,
          id,
          requestingUserId,
          dto.fineStatus === 'paid'
            ? 'fine_paid'
            : dto.fineStatus === 'waived'
              ? 'fine_waived'
              : 'fine_cancelled',
          dto.notes?.trim(),
        );
      }
      if (dto.unblockAccount) {
        const result = await transaction.users.updateMany({
          where: { id: current.player_id, block_source_action_id: id },
          data: {
            status: 'active',
            blocked_until: null,
            block_reason: null,
            blocked_by: null,
            block_source_action_id: null,
            updated_at: now,
          },
        });
        if (!result.count) {
          throw new BadRequestException(
            'La cuenta no está bloqueada por este caso.',
          );
        }
        await this.createEvent(
          transaction,
          id,
          requestingUserId,
          'account_unblocked',
          dto.notes?.trim(),
        );
      }
      await this.notifyMany(transaction, [current.player_id], {
        type: 'discipline_compliance',
        title: 'Se actualizó el cumplimiento de tu sanción',
        message:
          dto.notes?.trim() || 'Una medida disciplinaria cambió de estado.',
        entityType: 'disciplinary_action',
        entityId: id.toString(),
        actionUrl: '/discipline',
        actionLabel: 'Ver estado',
      });
    });
    return this.findOne(id, requestingUserId);
  }

  async update(
    id: bigint,
    requestingUserId: bigint,
    dto: UpdateDisciplinaryActionDto,
  ) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    if (dto.decisionStatus !== undefined || dto.decisionNotes !== undefined) {
      throw new BadRequestException(
        'Usa el endpoint de decisión para aprobar o desestimar el informe.',
      );
    }
    const current = await this.findExisting(id);
    if (!['reported', 'under_review'].includes(current.decision_status)) {
      throw new BadRequestException(
        'Un informe decidido ya no puede corregirse.',
      );
    }
    const tournamentId = dto.tournamentId
      ? BigInt(dto.tournamentId)
      : current.tournament_id;
    const matchId =
      dto.matchId === null
        ? null
        : dto.matchId
          ? BigInt(dto.matchId)
          : current.match_id;
    const teamId = dto.teamId ? BigInt(dto.teamId) : current.team_id;
    const playerId = dto.playerId ? BigInt(dto.playerId) : current.player_id;
    if (!matchId) {
      throw new BadRequestException(
        'El informe debe conservar un partido asociado.',
      );
    }
    await this.assertValidSubject(tournamentId, matchId, teamId, playerId);
    await this.prisma.disciplinary_actions.update({
      where: { id },
      data: {
        tournament_id: dto.tournamentId ? tournamentId : undefined,
        match_id: dto.matchId !== undefined ? matchId : undefined,
        team_id: dto.teamId ? teamId : undefined,
        player_id: dto.playerId ? playerId : undefined,
        card_type: dto.cardType,
        reason: dto.reason?.trim(),
        occurred_at: dto.occurredAt ? new Date(dto.occurredAt) : undefined,
        updated_at: new Date(),
      },
    });
    return this.findOne(id, requestingUserId);
  }

  async remove(id: bigint, requestingUserId: bigint) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    if (current.decision_status !== 'reported') {
      throw new BadRequestException(
        'Solo se pueden eliminar informes que aún no estén en revisión.',
      );
    }
    await this.prisma.disciplinary_actions.delete({ where: { id } });
    return { deleted: true, id: id.toString() };
  }

  private async findExisting(id: bigint): Promise<ActionRecord> {
    const action = await this.prisma.disciplinary_actions.findUnique({
      where: { id },
      select: actionSelect,
    });
    if (!action) {
      throw new NotFoundException(
        `No se encontró el caso disciplinario con ID ${id.toString()}.`,
      );
    }
    return action;
  }

  private async buildVisibleWhere(
    requestingUserId: bigint,
    roles: Set<string>,
  ): Promise<Prisma.disciplinary_actionsWhereInput | undefined> {
    if (roles.has('SUPER_ADMIN')) return undefined;
    const visibility: Prisma.disciplinary_actionsWhereInput[] = [];
    if (roles.has('ASSOCIATION_ADMIN')) {
      const tournamentIds =
        await this.access.findManageableTournamentIds(requestingUserId);
      visibility.push({ tournament_id: { in: tournamentIds ?? [] } });
    }
    if (roles.has('REFEREE')) {
      visibility.push({ reported_by: requestingUserId });
    }
    if (roles.has('PLAYER')) visibility.push({ player_id: requestingUserId });
    if (!visibility.length) return { id: { equals: BigInt(-1) } };
    return { OR: visibility };
  }

  private async assertCanViewAction(
    action: ActionRecord,
    requestingUserId: bigint,
  ) {
    const roles = await this.access.findRoleCodes(requestingUserId);
    if (
      roles.has('SUPER_ADMIN') ||
      (roles.has('PLAYER') && action.player_id === requestingUserId) ||
      (roles.has('REFEREE') && action.reported_by === requestingUserId)
    ) {
      return;
    }
    if (roles.has('ASSOCIATION_ADMIN')) {
      const ids =
        await this.access.findManageableTournamentIds(requestingUserId);
      if (ids?.some((value) => value === action.tournament_id)) return;
    }
    throw new ForbiddenException(
      'No tienes permisos para consultar este caso disciplinario.',
    );
  }

  private async assertAcceptedRefereeAssignment(
    refereeId: bigint,
    matchId: bigint,
  ) {
    const assignment = await this.prisma.match_referees.findUnique({
      where: {
        match_id_referee_id: { match_id: matchId, referee_id: refereeId },
      },
      select: { assignment_status: true },
    });
    if (!assignment || assignment.assignment_status !== 'accepted') {
      throw new ForbiddenException(
        'Solo un árbitro con asignación aceptada puede informar este partido.',
      );
    }
  }

  private async assertValidSubject(
    tournamentId: bigint,
    matchId: bigint,
    teamId: bigint,
    playerId: bigint,
  ) {
    const match = await this.prisma.matches.findUnique({
      where: { id: matchId },
      select: {
        tournament_id: true,
        home_team_id: true,
        away_team_id: true,
      },
    });
    if (!match || match.tournament_id !== tournamentId) {
      throw new BadRequestException(
        'El partido no pertenece al torneo indicado.',
      );
    }
    if (teamId !== match.home_team_id && teamId !== match.away_team_id) {
      throw new BadRequestException(
        'El equipo indicado no participa en este partido.',
      );
    }
    const roster = await this.prisma.tournament_team_players.findUnique({
      where: {
        tournament_id_team_id_player_id: {
          tournament_id: tournamentId,
          team_id: teamId,
          player_id: playerId,
        },
      },
      select: { registration_status: true },
    });
    if (!roster || roster.registration_status !== 'approved') {
      throw new BadRequestException(
        'El jugador debe estar aprobado en la plantilla del torneo.',
      );
    }
  }

  private async resolveAutomaticSuspension(
    transaction: Prisma.TransactionClient,
    action: ActionRecord,
  ): Promise<DisciplinarySuspensionDecisionDto | null> {
    if (action.card_type === 'red' || action.card_type === 'double_yellow') {
      return {
        matchesCount: 1,
        reason:
          action.card_type === 'red'
            ? 'Suspensión automática por tarjeta roja.'
            : 'Suspensión automática por doble tarjeta amarilla.',
      };
    }
    if (action.card_type !== 'yellow') return null;
    const yellowCards = await transaction.disciplinary_actions.count({
      where: {
        tournament_id: action.tournament_id,
        player_id: action.player_id,
        card_type: 'yellow',
        decision_status: 'approved',
      },
    });
    if (
      yellowCards === 0 ||
      yellowCards % YELLOW_CARD_SUSPENSION_THRESHOLD !== 0
    ) {
      return null;
    }
    return {
      matchesCount: 1,
      reason: `Suspensión automática por acumulación de ${yellowCards} tarjetas amarillas.`,
    };
  }

  private async getAccumulationForActions(actions: ActionRecord[]) {
    const keys = new Map<string, { tournamentId: bigint; playerId: bigint }>();
    for (const action of actions) {
      keys.set(this.accumulationKey(action), {
        tournamentId: action.tournament_id,
        playerId: action.player_id,
      });
    }
    const result = new Map<
      string,
      { yellowCards: number; doubleYellowCards: number; redCards: number }
    >();
    await Promise.all(
      [...keys.entries()].map(async ([key, value]) => {
        const grouped = await this.prisma.disciplinary_actions.groupBy({
          by: ['card_type'],
          where: {
            tournament_id: value.tournamentId,
            player_id: value.playerId,
            decision_status: 'approved',
          },
          _count: { _all: true },
        });
        const counts = {
          yellowCards: 0,
          doubleYellowCards: 0,
          redCards: 0,
        };
        for (const row of grouped) {
          if (row.card_type === 'yellow') {
            counts.yellowCards = row._count._all;
          }
          if (row.card_type === 'double_yellow') {
            counts.doubleYellowCards = row._count._all;
          }
          if (row.card_type === 'red') counts.redCards = row._count._all;
        }
        result.set(key, counts);
      }),
    );
    return result;
  }

  private accumulationKey(
    action: Pick<ActionRecord, 'tournament_id' | 'player_id'>,
  ) {
    return `${action.tournament_id.toString()}:${action.player_id.toString()}`;
  }

  private toResponse(
    action: ActionRecord,
    accumulation = {
      yellowCards: 0,
      doubleYellowCards: 0,
      redCards: 0,
    },
  ) {
    const roster = action.tournament_team_players;
    const member = roster.team_members;
    const tournament = roster.tournament_team_registrations.tournaments;
    const match = action.matches;
    return {
      id: action.id.toString(),
      tournament: {
        id: tournament.id.toString(),
        name: tournament.name,
        phase: tournament.phase,
      },
      match: match
        ? {
            id: match.id.toString(),
            date: match.match_date?.toISOString() ?? null,
            venue: match.venue,
            status: match.status,
            score:
              match.home_score === null || match.away_score === null
                ? null
                : `${match.home_score}-${match.away_score}`,
            homeTeam:
              match
                .tournament_team_registrations_matches_tournament_id_home_team_idTotournament_team_registrations
                .teams.name,
            awayTeam:
              match
                .tournament_team_registrations_matches_tournament_id_away_team_idTotournament_team_registrations
                .teams.name,
          }
        : null,
      team: { id: member.teams.id.toString(), name: member.teams.name },
      player: {
        id: member.users.id.toString(),
        name: member.users.full_name,
        email: member.users.email,
        photoUrl: member.users.photo_url,
        status: member.users.status,
        jerseyNumber: roster.jersey_number,
      },
      cardType: action.card_type,
      reason: action.reason,
      occurredAt: action.occurred_at.toISOString(),
      status: action.decision_status,
      reportedBy: this.toPerson(
        action.users_disciplinary_actions_reported_byTousers,
      ),
      review: action.reviewer
        ? {
            by: this.toPerson(action.reviewer),
            at: action.review_started_at?.toISOString() ?? null,
          }
        : null,
      decision: action.users_disciplinary_actions_decided_byTousers
        ? {
            by: this.toPerson(
              action.users_disciplinary_actions_decided_byTousers,
            ),
            at: action.decided_at?.toISOString() ?? null,
            notes: action.decision_notes,
          }
        : null,
      appealDeadline: action.appeal_deadline?.toISOString() ?? null,
      canAppeal:
        action.decision_status === 'approved' &&
        !action.disciplinary_appeals &&
        Boolean(
          action.appeal_deadline &&
          action.appeal_deadline.getTime() >= Date.now(),
        ),
      appeal: action.disciplinary_appeals
        ? {
            id: action.disciplinary_appeals.id.toString(),
            message: action.disciplinary_appeals.message,
            status: action.disciplinary_appeals.status,
            createdAt: action.disciplinary_appeals.created_at.toISOString(),
            resolutionNotes: action.disciplinary_appeals.resolution_notes,
            reviewedAt:
              action.disciplinary_appeals.reviewed_at?.toISOString() ?? null,
            reviewedBy: action.disciplinary_appeals.reviewer
              ? this.toPerson(action.disciplinary_appeals.reviewer)
              : null,
          }
        : null,
      suspension: action.suspensions
        ? {
            id: action.suspensions.id.toString(),
            matchesCount: action.suspensions.matches_count,
            servedMatches: action.suspensions.served_matches,
            startDate:
              action.suspensions.start_date?.toISOString().slice(0, 10) ?? null,
            endDate:
              action.suspensions.end_date?.toISOString().slice(0, 10) ?? null,
            reason: action.suspensions.reason,
            status: action.suspensions.status,
            completedAt: action.suspensions.completed_at?.toISOString() ?? null,
          }
        : null,
      fine: action.fines
        ? {
            id: action.fines.id.toString(),
            amount: action.fines.amount.toString(),
            currencyCode: action.fines.currency_code.trim(),
            dueDate: action.fines.due_date?.toISOString().slice(0, 10) ?? null,
            status: action.fines.payment_status,
            paidAt: action.fines.paid_at?.toISOString() ?? null,
            paymentReference: action.fines.payment_reference,
            notes: action.fines.notes,
          }
        : null,
      accumulation: {
        ...accumulation,
        nextAutomaticSuspensionAt:
          (Math.floor(
            accumulation.yellowCards / YELLOW_CARD_SUSPENSION_THRESHOLD,
          ) +
            1) *
          YELLOW_CARD_SUSPENSION_THRESHOLD,
      },
      timeline: action.disciplinary_events.map((event) => ({
        id: event.id.toString(),
        type: event.event_type,
        message: event.message,
        metadata: event.metadata,
        actor: this.toPerson(event.actor),
        createdAt: event.created_at.toISOString(),
      })),
      createdAt: action.created_at.toISOString(),
      updatedAt: action.updated_at.toISOString(),
    };
  }

  private toReportTeam(
    team: { id: bigint; name: string },
    players: Array<{
      player_id: bigint;
      jersey_number: number | null;
      team_members: {
        users: { full_name: string; photo_url: string | null };
      };
    }>,
  ) {
    return {
      id: team.id.toString(),
      name: team.name,
      players: players.map((item) => ({
        id: item.player_id.toString(),
        name: item.team_members.users.full_name,
        photoUrl: item.team_members.users.photo_url,
        jerseyNumber: item.jersey_number,
      })),
    };
  }

  private toPerson(person: { id: bigint; full_name: string }) {
    return { id: person.id.toString(), name: person.full_name };
  }

  private async createEvent(
    transaction: Prisma.TransactionClient,
    actionId: bigint,
    actorId: bigint,
    eventType: string,
    message?: string | null,
    metadata?: Prisma.InputJsonObject,
  ) {
    await transaction.disciplinary_events.create({
      data: {
        disciplinary_action_id: actionId,
        actor_user_id: actorId,
        event_type: eventType,
        message: message?.trim() || null,
        metadata: metadata ?? undefined,
      },
    });
  }

  private async findSuperAdminIds(database: DatabaseClient) {
    const users = await database.user_roles.findMany({
      where: { role_code: 'SUPER_ADMIN', users: { status: 'active' } },
      select: { user_id: true },
    });
    return users.map((item) => item.user_id);
  }

  private async notifyMany(
    transaction: Prisma.TransactionClient,
    userIds: bigint[],
    data: {
      type: string;
      title: string;
      message: string;
      entityType: string;
      entityId: string;
      actionUrl: string;
      actionLabel: string;
    },
  ) {
    if (!userIds.length) return;
    await transaction.notifications.createMany({
      data: [...new Set(userIds.map(String))].map((userId) => ({
        user_id: BigInt(userId),
        type: data.type,
        title: data.title,
        message: data.message,
        entity_type: data.entityType,
        entity_id: data.entityId,
        metadata: {
          actionUrl: data.actionUrl,
          actionLabel: data.actionLabel,
        },
      })),
    });
  }

  private buildMeasuresText(dto: DecideDisciplinaryActionDto) {
    const measures: string[] = [];
    if (dto.suspension) measures.push('se aplicó una suspensión');
    if (dto.fine) {
      measures.push(
        `se aplicó una multa de $${dto.fine.amount.toLocaleString('es-CO')}`,
      );
    }
    if (dto.block) {
      measures.push('la cuenta fue bloqueada temporalmente');
    }
    return measures.length
      ? `${measures.join(', ')}.`
      : 'El informe fue aprobado. Consulta el detalle para ver las medidas automáticas aplicadas, si corresponden.';
  }

  private calculateBlockedUntil(
    start: Date,
    duration:
      | 'one_week'
      | 'one_month'
      | 'three_months'
      | 'six_months'
      | 'nine_months'
      | 'one_year',
  ) {
    const end = new Date(start);
    if (duration === 'one_week') end.setDate(end.getDate() + 7);
    if (duration === 'one_month') end.setMonth(end.getMonth() + 1);
    if (duration === 'three_months') end.setMonth(end.getMonth() + 3);
    if (duration === 'six_months') end.setMonth(end.getMonth() + 6);
    if (duration === 'nine_months') end.setMonth(end.getMonth() + 9);
    if (duration === 'one_year') end.setFullYear(end.getFullYear() + 1);
    return end;
  }

  private addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private formatDate(date: Date) {
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'long',
      timeZone: 'America/Bogota',
    }).format(date);
  }

  private isUniqueConstraint(error: unknown) {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    );
  }
}
