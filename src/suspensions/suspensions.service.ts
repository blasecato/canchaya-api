import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';

@Injectable()
export class SuspensionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSuspensionDto: CreateSuspensionDto) {
    return this.prisma.suspensions.create({
      data: {
        disciplinary_action_id: BigInt(
          createSuspensionDto.disciplinaryActionId,
        ),
        matches_count: createSuspensionDto.matchesCount,
        start_date:
          createSuspensionDto.startDate === null
            ? null
            : createSuspensionDto.startDate !== undefined
              ? new Date(createSuspensionDto.startDate)
              : undefined,
        end_date:
          createSuspensionDto.endDate === null
            ? null
            : createSuspensionDto.endDate !== undefined
              ? new Date(createSuspensionDto.endDate)
              : undefined,
        reason: createSuspensionDto.reason,
        status: createSuspensionDto.status,
        created_by: BigInt(createSuspensionDto.createdBy),
      },
    });
  }

  findAll() {
    return this.prisma.suspensions.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: bigint) {
    const suspension = await this.prisma.suspensions.findUnique({
      where: { id },
    });

    if (!suspension) {
      throw new NotFoundException(`No se encontró la suspensión con ID ${id}.`);
    }

    return suspension;
  }

  async update(id: bigint, updateSuspensionDto: UpdateSuspensionDto) {
    await this.findOne(id);

    return this.prisma.suspensions.update({
      where: { id },
      data: {
        disciplinary_action_id:
          updateSuspensionDto.disciplinaryActionId !== undefined
            ? BigInt(updateSuspensionDto.disciplinaryActionId)
            : undefined,
        matches_count: updateSuspensionDto.matchesCount,
        start_date:
          updateSuspensionDto.startDate === null
            ? null
            : updateSuspensionDto.startDate !== undefined
              ? new Date(updateSuspensionDto.startDate)
              : undefined,
        end_date:
          updateSuspensionDto.endDate === null
            ? null
            : updateSuspensionDto.endDate !== undefined
              ? new Date(updateSuspensionDto.endDate)
              : undefined,
        reason: updateSuspensionDto.reason,
        status: updateSuspensionDto.status,
        created_by:
          updateSuspensionDto.createdBy !== undefined
            ? BigInt(updateSuspensionDto.createdBy)
            : undefined,
      },
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.suspensions.delete({ where: { id } });
  }
}
