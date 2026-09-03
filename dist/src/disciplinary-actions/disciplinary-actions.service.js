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
exports.DisciplinaryActionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DisciplinaryActionsService = class DisciplinaryActionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createDisciplinaryActionDto) {
        return this.prisma.disciplinary_actions.create({
            data: {
                tournament_id: BigInt(createDisciplinaryActionDto.tournamentId),
                match_id: createDisciplinaryActionDto.matchId === null
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
                decided_by: createDisciplinaryActionDto.decidedBy === null
                    ? null
                    : createDisciplinaryActionDto.decidedBy !== undefined
                        ? BigInt(createDisciplinaryActionDto.decidedBy)
                        : undefined,
                decided_at: createDisciplinaryActionDto.decidedAt === null
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
    async findOne(id) {
        const disciplinaryAction = await this.prisma.disciplinary_actions.findUnique({ where: { id } });
        if (!disciplinaryAction) {
            throw new common_1.NotFoundException(`No se encontró la acción disciplinaria con ID ${id}.`);
        }
        return disciplinaryAction;
    }
    async update(id, updateDisciplinaryActionDto) {
        await this.findOne(id);
        return this.prisma.disciplinary_actions.update({
            where: { id },
            data: {
                tournament_id: updateDisciplinaryActionDto.tournamentId !== undefined
                    ? BigInt(updateDisciplinaryActionDto.tournamentId)
                    : undefined,
                match_id: updateDisciplinaryActionDto.matchId === null
                    ? null
                    : updateDisciplinaryActionDto.matchId !== undefined
                        ? BigInt(updateDisciplinaryActionDto.matchId)
                        : undefined,
                team_id: updateDisciplinaryActionDto.teamId !== undefined
                    ? BigInt(updateDisciplinaryActionDto.teamId)
                    : undefined,
                player_id: updateDisciplinaryActionDto.playerId !== undefined
                    ? BigInt(updateDisciplinaryActionDto.playerId)
                    : undefined,
                card_type: updateDisciplinaryActionDto.cardType,
                reason: updateDisciplinaryActionDto.reason,
                occurred_at: updateDisciplinaryActionDto.occurredAt !== undefined
                    ? new Date(updateDisciplinaryActionDto.occurredAt)
                    : undefined,
                reported_by: updateDisciplinaryActionDto.reportedBy !== undefined
                    ? BigInt(updateDisciplinaryActionDto.reportedBy)
                    : undefined,
                decision_status: updateDisciplinaryActionDto.decisionStatus,
                decided_by: updateDisciplinaryActionDto.decidedBy === null
                    ? null
                    : updateDisciplinaryActionDto.decidedBy !== undefined
                        ? BigInt(updateDisciplinaryActionDto.decidedBy)
                        : undefined,
                decided_at: updateDisciplinaryActionDto.decidedAt === null
                    ? null
                    : updateDisciplinaryActionDto.decidedAt !== undefined
                        ? new Date(updateDisciplinaryActionDto.decidedAt)
                        : undefined,
                decision_notes: updateDisciplinaryActionDto.decisionNotes,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.disciplinary_actions.delete({ where: { id } });
    }
};
exports.DisciplinaryActionsService = DisciplinaryActionsService;
exports.DisciplinaryActionsService = DisciplinaryActionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DisciplinaryActionsService);
//# sourceMappingURL=disciplinary-actions.service.js.map