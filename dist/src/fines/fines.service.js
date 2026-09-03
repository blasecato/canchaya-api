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
exports.FinesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinesService = class FinesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createFineDto) {
        return this.prisma.fines.create({
            data: {
                disciplinary_action_id: BigInt(createFineDto.disciplinaryActionId),
                amount: createFineDto.amount,
                currency_code: createFineDto.currencyCode,
                due_date: createFineDto.dueDate === null
                    ? null
                    : createFineDto.dueDate !== undefined
                        ? new Date(createFineDto.dueDate)
                        : undefined,
                payment_status: createFineDto.paymentStatus,
                paid_at: createFineDto.paidAt === null
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
    async findOne(id) {
        const fine = await this.prisma.fines.findUnique({ where: { id } });
        if (!fine) {
            throw new common_1.NotFoundException(`No se encontró la multa con ID ${id}.`);
        }
        return fine;
    }
    async update(id, updateFineDto) {
        await this.findOne(id);
        return this.prisma.fines.update({
            where: { id },
            data: {
                disciplinary_action_id: updateFineDto.disciplinaryActionId !== undefined
                    ? BigInt(updateFineDto.disciplinaryActionId)
                    : undefined,
                amount: updateFineDto.amount,
                currency_code: updateFineDto.currencyCode,
                due_date: updateFineDto.dueDate === null
                    ? null
                    : updateFineDto.dueDate !== undefined
                        ? new Date(updateFineDto.dueDate)
                        : undefined,
                payment_status: updateFineDto.paymentStatus,
                paid_at: updateFineDto.paidAt === null
                    ? null
                    : updateFineDto.paidAt !== undefined
                        ? new Date(updateFineDto.paidAt)
                        : undefined,
                payment_reference: updateFineDto.paymentReference,
                notes: updateFineDto.notes,
                created_by: updateFineDto.createdBy !== undefined
                    ? BigInt(updateFineDto.createdBy)
                    : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.fines.delete({ where: { id } });
    }
};
exports.FinesService = FinesService;
exports.FinesService = FinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinesService);
//# sourceMappingURL=fines.service.js.map