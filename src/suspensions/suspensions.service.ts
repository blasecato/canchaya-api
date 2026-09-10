import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';

@Injectable()
export class SuspensionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  async create(requestingUserId: bigint, dto: CreateSuspensionDto) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const action = await this.findDisciplinaryAction(
      BigInt(dto.disciplinaryActionId),
    );
    this.assertApprovedAction(action);
    await this.access.assertTournamentInPhases(
      action.tournament_id,
      ['in_progress', 'finished'],
      'Las suspensiones solo se pueden gestionar durante el torneo o su cierre.',
    );
    this.assertValidPeriod(dto.matchesCount, dto.startDate, dto.endDate);

    return this.prisma.suspensions.create({
      data: {
        disciplinary_action_id: action.id,
        matches_count: dto.matchesCount,
        start_date:
          dto.startDate === null
            ? null
            : dto.startDate !== undefined
              ? new Date(dto.startDate)
              : undefined,
        end_date:
          dto.endDate === null
            ? null
            : dto.endDate !== undefined
              ? new Date(dto.endDate)
              : undefined,
        reason: dto.reason,
        status: dto.status,
        created_by: requestingUserId,
      },
    });
  }

  async findAll(requestingUserId: bigint) {
    const roles = await this.access.findRoleCodes(requestingUserId);
    const where = await this.buildVisibleWhere(requestingUserId, roles);
    return this.prisma.suspensions.findMany({
      where,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: bigint, requestingUserId: bigint) {
    const suspension = await this.findExisting(id);
    await this.assertCanViewSuspension(
      suspension.disciplinary_actions,
      requestingUserId,
    );
    return suspension;
  }

  async update(id: bigint, requestingUserId: bigint, dto: UpdateSuspensionDto) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    await this.access.assertTournamentInPhases(
      current.disciplinary_actions.tournament_id,
      ['in_progress', 'finished'],
      'Las suspensiones ya están cerradas para este estado del torneo.',
    );

    const action =
      dto.disciplinaryActionId !== undefined
        ? await this.findDisciplinaryAction(BigInt(dto.disciplinaryActionId))
        : current.disciplinary_actions;
    this.assertApprovedAction(action);
    if (action.id !== current.disciplinary_action_id) {
      await this.access.assertTournamentInPhases(
        action.tournament_id,
        ['in_progress', 'finished'],
        'No puedes mover la suspensión a un torneo con su gestión disciplinaria cerrada.',
      );
    }

    const matchesCount =
      dto.matchesCount !== undefined ? dto.matchesCount : current.matches_count;
    const startDate =
      dto.startDate !== undefined
        ? dto.startDate
        : (current.start_date?.toISOString().slice(0, 10) ?? null);
    const endDate =
      dto.endDate !== undefined
        ? dto.endDate
        : (current.end_date?.toISOString().slice(0, 10) ?? null);
    this.assertValidPeriod(matchesCount, startDate, endDate);

    return this.prisma.suspensions.update({
      where: { id },
      data: {
        disciplinary_action_id:
          dto.disciplinaryActionId !== undefined ? action.id : undefined,
        matches_count: dto.matchesCount,
        start_date:
          dto.startDate === null
            ? null
            : dto.startDate !== undefined
              ? new Date(dto.startDate)
              : undefined,
        end_date:
          dto.endDate === null
            ? null
            : dto.endDate !== undefined
              ? new Date(dto.endDate)
              : undefined,
        reason: dto.reason,
        status: dto.status,
      },
    });
  }

  async remove(id: bigint, requestingUserId: bigint) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    await this.findExisting(id);
    return this.prisma.suspensions.delete({ where: { id } });
  }

  private async findExisting(id: bigint) {
    const suspension = await this.prisma.suspensions.findUnique({
      where: { id },
      include: {
        disciplinary_actions: {
          select: {
            id: true,
            tournament_id: true,
            player_id: true,
            decision_status: true,
          },
        },
      },
    });
    if (!suspension) {
      throw new NotFoundException(
        `No se encontró la suspensión con ID ${id.toString()}.`,
      );
    }
    return suspension;
  }

  private async findDisciplinaryAction(id: bigint) {
    const action = await this.prisma.disciplinary_actions.findUnique({
      where: { id },
      select: {
        id: true,
        tournament_id: true,
        player_id: true,
        decision_status: true,
      },
    });
    if (!action) {
      throw new NotFoundException(
        `No se encontró la acción disciplinaria con ID ${id.toString()}.`,
      );
    }
    return action;
  }

  private async buildVisibleWhere(
    requestingUserId: bigint,
    roles: Set<string>,
  ): Promise<Prisma.suspensionsWhereInput | undefined> {
    if (roles.has('SUPER_ADMIN')) return undefined;

    const visibility: Prisma.disciplinary_actionsWhereInput[] = [];
    if (roles.has('ASSOCIATION_ADMIN')) {
      const tournamentIds =
        await this.access.findManageableTournamentIds(requestingUserId);
      visibility.push({ tournament_id: { in: tournamentIds ?? [] } });
    }
    if (roles.has('PLAYER')) {
      visibility.push({ player_id: requestingUserId });
    }
    return { disciplinary_actions: { OR: visibility } };
  }

  private async assertCanViewSuspension(
    action: { tournament_id: bigint; player_id: bigint },
    requestingUserId: bigint,
  ): Promise<void> {
    const roles = await this.access.findRoleCodes(requestingUserId);
    if (
      roles.has('SUPER_ADMIN') ||
      (roles.has('PLAYER') && action.player_id === requestingUserId)
    ) {
      return;
    }
    if (roles.has('ASSOCIATION_ADMIN')) {
      const tournamentIds =
        await this.access.findManageableTournamentIds(requestingUserId);
      if (tournamentIds?.some((id) => id === action.tournament_id)) return;
    }
    throw new ForbiddenException(
      'No tienes permisos para consultar esta suspensión.',
    );
  }

  private assertValidPeriod(
    matchesCount?: number | null,
    startDate?: string | null,
    endDate?: string | null,
  ): void {
    if (matchesCount == null && !startDate) {
      throw new BadRequestException(
        'La suspensión debe indicar una cantidad de partidos o una fecha de inicio.',
      );
    }
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      throw new BadRequestException(
        'La fecha final no puede ser anterior a la fecha inicial de la suspensión.',
      );
    }
  }

  private assertApprovedAction(action: { decision_status: string }): void {
    if (action.decision_status !== 'approved') {
      throw new BadRequestException(
        'La suspensión solo puede asociarse a un informe aprobado.',
      );
    }
  }
}
