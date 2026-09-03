import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';

@Injectable()
export class FinesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFineDto: CreateFineDto) {
    return this.prisma.fines.create({
      data: {
        disciplinary_action_id: BigInt(createFineDto.disciplinaryActionId),
        amount: createFineDto.amount,
        currency_code: createFineDto.currencyCode,
        due_date:
          createFineDto.dueDate === null
            ? null
            : createFineDto.dueDate !== undefined
              ? new Date(createFineDto.dueDate)
              : undefined,
        payment_status: createFineDto.paymentStatus,
        paid_at:
          createFineDto.paidAt === null
            ? null
            : createFineDto.paidAt !== undefined
              ? new Date(createFineDto.paidAt)
              : undefined,
        payment_reference: createFineDto.paymentReference,
        notes: createFineDto.notes,
        created_by: BigInt(createFineDto.createdBy),
      },
    });
  }

  findAll() {
    return this.prisma.fines.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: bigint) {
    const fine = await this.prisma.fines.findUnique({ where: { id } });

    if (!fine) {
      throw new NotFoundException(`No se encontró la multa con ID ${id}.`);
    }

    return fine;
  }

  async update(id: bigint, updateFineDto: UpdateFineDto) {
    await this.findOne(id);

    return this.prisma.fines.update({
      where: { id },
      data: {
        disciplinary_action_id:
          updateFineDto.disciplinaryActionId !== undefined
            ? BigInt(updateFineDto.disciplinaryActionId)
            : undefined,
        amount: updateFineDto.amount,
        currency_code: updateFineDto.currencyCode,
        due_date:
          updateFineDto.dueDate === null
            ? null
            : updateFineDto.dueDate !== undefined
              ? new Date(updateFineDto.dueDate)
              : undefined,
        payment_status: updateFineDto.paymentStatus,
        paid_at:
          updateFineDto.paidAt === null
            ? null
            : updateFineDto.paidAt !== undefined
              ? new Date(updateFineDto.paidAt)
              : undefined,
        payment_reference: updateFineDto.paymentReference,
        notes: updateFineDto.notes,
        created_by:
          updateFineDto.createdBy !== undefined
            ? BigInt(updateFineDto.createdBy)
            : undefined,
      },
    });
  }

  async remove(id: bigint) {
    await this.findOne(id);
    return this.prisma.fines.delete({ where: { id } });
  }
}
