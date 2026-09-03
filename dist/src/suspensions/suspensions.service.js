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
exports.SuspensionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SuspensionsService = class SuspensionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createSuspensionDto) {
        return this.prisma.suspensions.create({
            data: {
                disciplinary_action_id: BigInt(createSuspensionDto.disciplinaryActionId),
                matches_count: createSuspensionDto.matchesCount,
                start_date: createSuspensionDto.startDate === null
                    ? null
                    : createSuspensionDto.startDate !== undefined
                        ? new Date(createSuspensionDto.startDate)
                        : undefined,
                end_date: createSuspensionDto.endDate === null
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
    async findOne(id) {
        const suspension = await this.prisma.suspensions.findUnique({
            where: { id },
        });
        if (!suspension) {
            throw new common_1.NotFoundException(`No se encontró la suspensión con ID ${id}.`);
        }
        return suspension;
    }
    async update(id, updateSuspensionDto) {
        await this.findOne(id);
        return this.prisma.suspensions.update({
            where: { id },
            data: {
                disciplinary_action_id: updateSuspensionDto.disciplinaryActionId !== undefined
                    ? BigInt(updateSuspensionDto.disciplinaryActionId)
                    : undefined,
                matches_count: updateSuspensionDto.matchesCount,
                start_date: updateSuspensionDto.startDate === null
                    ? null
                    : updateSuspensionDto.startDate !== undefined
                        ? new Date(updateSuspensionDto.startDate)
                        : undefined,
                end_date: updateSuspensionDto.endDate === null
                    ? null
                    : updateSuspensionDto.endDate !== undefined
                        ? new Date(updateSuspensionDto.endDate)
                        : undefined,
                reason: updateSuspensionDto.reason,
                status: updateSuspensionDto.status,
                created_by: updateSuspensionDto.createdBy !== undefined
                    ? BigInt(updateSuspensionDto.createdBy)
                    : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.suspensions.delete({ where: { id } });
    }
};
exports.SuspensionsService = SuspensionsService;
exports.SuspensionsService = SuspensionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuspensionsService);
//# sourceMappingURL=suspensions.service.js.map