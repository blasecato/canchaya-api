import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';

@Injectable()
export class FinesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: CompetitionAccessService,
  ) {}

  async create(requestingUserId: bigint, dto: CreateFineDto) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const action = await this.findDisciplinaryAction(
      BigInt(dto.disciplinaryActionId),
    );
    this.assertApprovedAction(action);
    await this.access.assertTournamentInPhases(
      action.tournament_id,
      ['in_progress', 'finished'],
      'Las multas solo se pueden gestionar durante el torneo o su cierre.',
    );
    this.assertPaymentData(dto.paymentStatus, dto.paidAt);

    return this.prisma.fines.create({
      data: {
        disciplinary_action_id: action.id,
        amount: dto.amount,
        currency_code: dto.currencyCode,
        due_date:
          dto.dueDate === null
            ? null
            : dto.dueDate !== undefined
              ? new Date(dto.dueDate)
              : undefined,
        payment_status: dto.paymentStatus,
        paid_at:
          dto.paidAt === null
            ? null
            : dto.paidAt !== undefined
              ? new Date(dto.paidAt)
              : undefined,
        payment_reference: dto.paymentReference,
        notes: dto.notes,
        created_by: requestingUserId,
      },
    });
  }

  async findAll(requestingUserId: bigint) {
    const roles = await this.access.findRoleCodes(requestingUserId);
    const where = await this.buildVisibleWhere(requestingUserId, roles);
    return this.prisma.fines.findMany({ where, orderBy: { id: 'asc' } });
  }

  async findOne(id: bigint, requestingUserId: bigint) {
    const fine = await this.findExisting(id);
    await this.assertCanViewFine(fine.disciplinary_actions, requestingUserId);
    return fine;
  }

  async update(id: bigint, requestingUserId: bigint, dto: UpdateFineDto) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    const current = await this.findExisting(id);
    await this.access.assertTournamentInPhases(
      current.disciplinary_actions.tournament_id,
      ['in_progress', 'finished'],
      'Las multas ya están cerradas para este estado del torneo.',
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
        'No puedes mover la multa a un torneo con su gestión disciplinaria cerrada.',
      );
    }

    const paymentStatus = dto.paymentStatus ?? current.payment_status;
    const paidAt =
      dto.paidAt !== undefined
        ? dto.paidAt
        : (current.paid_at?.toISOString() ?? null);
    this.assertPaymentData(paymentStatus, paidAt);

    return this.prisma.fines.update({
      where: { id },
      data: {
        disciplinary_action_id:
          dto.disciplinaryActionId !== undefined ? action.id : undefined,
        amount: dto.amount,
        currency_code: dto.currencyCode,
        due_date:
          dto.dueDate === null
            ? null
            : dto.dueDate !== undefined
              ? new Date(dto.dueDate)
              : undefined,
        payment_status: dto.paymentStatus,
        paid_at:
          dto.paidAt === null
            ? null
            : dto.paidAt !== undefined
              ? new Date(dto.paidAt)
              : undefined,
        payment_reference: dto.paymentReference,
        notes: dto.notes,
      },
    });
  }

  async remove(id: bigint, requestingUserId: bigint) {
    await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
    await this.findExisting(id);
    return this.prisma.fines.delete({ where: { id } });
  }

  private async findExisting(id: bigint) {
    const fine = await this.prisma.fines.findUnique({
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
    if (!fine) {
      throw new NotFoundException(
        `No se encontró la multa con ID ${id.toString()}.`,
      );
    }
    return fine;
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
  ): Promise<Prisma.finesWhereInput | undefined> {
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

  private async assertCanViewFine(
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
      'No tienes permisos para consultar esta multa.',
    );
  }

  private assertPaymentData(
    paymentStatus?: string,
    paidAt?: string | null,
  ): void {
    if (paymentStatus === 'paid' && !paidAt) {
      throw new BadRequestException(
        'Una multa marcada como pagada debe incluir la fecha de pago.',
      );
    }
  }

  private assertApprovedAction(action: { decision_status: string }): void {
    if (action.decision_status !== 'approved') {
      throw new BadRequestException(
        'La multa solo puede asociarse a un informe aprobado.',
      );
    }
  }
}
