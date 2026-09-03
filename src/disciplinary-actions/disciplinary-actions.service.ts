import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';

@Injectable()
export class DisciplinaryActionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    return this.prisma.disciplinary_actions.create({
      data: {
        tournament_id: BigInt(createDisciplinaryActionDto.tournamentId),
        match_id:
          createDisciplinaryActionDto.matchId === null
            ? null
            : createDisciplinaryActionDto.matchId !== undefined
              ? BigInt(createDisciplinaryActionDto.matchId)
              : undefined,
        team_id: BigInt(createDisciplinaryActionDto.teamId),
        player_id: BigInt(createDisciplinaryActionDto.playerId),
        card_type: createDisciplinaryActionDto.cardType,
        reason: createDisciplinaryActionDto.reason,
        occurred_at: createDisciplinaryActionDto.occurredAt
          ? new Date(createDisciplinaryActionDto.occurredAt)
          : undefined,
        reported_by: BigInt(createDisciplinaryActionDto.reportedBy),
        decision_status: createDisciplinaryActionDto.decisionStatus,
        decided_by:
          createDisciplinaryActionDto.decidedBy === null
            ? null
            : createDisciplinaryActionDto.decidedBy !== undefined
              ? BigInt(createDisciplinaryActionDto.decidedBy)
              : undefined,
        decided_at:
          createDisciplinaryActionDto.decidedAt === null
            ? null
            : createDisciplinaryActionDto.decidedAt !== undefined
              ? new Date(createDisciplinaryActionDto.decidedAt)
              : undefined,
        decision_notes: createDisciplinaryActionDto.decisionNotes,
      },
    });
  }

  findAll() {
    return this.prisma.disciplinary_actions.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: bigint) {
    const disciplinaryAction =
      await this.prisma.disciplinary_actions.findUnique({ where: { id } });

    if (!disciplinaryAction) {
      throw new NotFoundException(
        `No se encontró la acción disciplinaria con ID ${id}.`,
      );
    }

    return disciplinaryAction;
  }

  async update(
    id: bigint,
    updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    await this.findOne(id);

    return this.prisma.disciplinary_actions.update({
      where: { id },
      data: {
        tournament_id:
          updateDisciplinaryActionDto.tournamentId !== undefined
            ? BigInt(updateDisciplinaryActionDto.tournamentId)
            : undefined,
        match_id:
          updateDisciplinaryActionDto.matchId === null
            ? null
            : updateDisciplinaryActionDto.matchId !== undefined
              ? BigInt(updateDisciplinaryActionDto.matchId)
              : undefined,
        team_id:
          updateDisciplinaryActionDto.teamId !== undefined
            ? BigInt(updateDisciplinaryActionDto.teamId)
            : undefined,
        player_id:
          updateDisciplinaryActionDto.playerId !== undefined
            ? BigInt(updateDisciplinaryActionDto.playerId)
            : undefined,
        card_type: updateDisciplinaryActionDto.cardType,
        reason: updateDisciplinaryActionDto.reason,
        occurred_at:
          updateDisciplinaryActionDto.occurredAt !== undefined
            ? new Date(updateDisciplinaryActionDto.occurredAt)
            : undefined,
        reported_by:
          updateDisciplinaryActionDto.reportedBy !== undefined
            ? BigInt(updateDisciplinaryActionDto.reportedBy)
            : undefined,
        decision_status: updateDisciplinaryActionDto.decisionStatus,
        decided_by:
          updateDisciplinaryActionDto.decidedBy === null
            ? null
            : updateDisciplinaryActionDto.decidedBy !== undefined
              ? BigInt(updateDisciplinaryActionDto.decidedBy)
              : undefined,
        decided_at:
          updateDisciplinaryActionDto.decidedAt === null
            ? null
            : updateDisciplinaryActionDto.decidedAt !== undefined
              ? new Date(updateDisciplinaryActionDto.decidedAt)
              : undefined,
        decision_notes: updateDisciplinaryActionDto.decisionNotes,
      },
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.disciplinary_actions.delete({ where: { id } });
  }
}
