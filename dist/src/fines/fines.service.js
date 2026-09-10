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
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
let FinesService = class FinesService {
    prisma;
    access;
    constructor(prisma, access) {
        this.prisma = prisma;
        this.access = access;
    }
    async create(requestingUserId, dto) {
        await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
        const action = await this.findDisciplinaryAction(BigInt(dto.disciplinaryActionId));
        this.assertApprovedAction(action);
        await this.access.assertTournamentInPhases(action.tournament_id, ['in_progress', 'finished'], 'Las multas solo se pueden gestionar durante el torneo o su cierre.');
        this.assertPaymentData(dto.paymentStatus, dto.paidAt);
        return this.prisma.fines.create({
            data: {
                disciplinary_action_id: action.id,
                amount: dto.amount,
                currency_code: dto.currencyCode,
                due_date: dto.dueDate === null
                    ? null
                    : dto.dueDate !== undefined
                        ? new Date(dto.dueDate)
                        : undefined,
                payment_status: dto.paymentStatus,
                paid_at: dto.paidAt === null
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
    async findAll(requestingUserId) {
        const roles = await this.access.findRoleCodes(requestingUserId);
        const where = await this.buildVisibleWhere(requestingUserId, roles);
        return this.prisma.fines.findMany({ where, orderBy: { id: 'asc' } });
    }
    async findOne(id, requestingUserId) {
        const fine = await this.findExisting(id);
        await this.assertCanViewFine(fine.disciplinary_actions, requestingUserId);
        return fine;
    }
    async update(id, requestingUserId, dto) {
        await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
        const current = await this.findExisting(id);
        await this.access.assertTournamentInPhases(current.disciplinary_actions.tournament_id, ['in_progress', 'finished'], 'Las multas ya están cerradas para este estado del torneo.');
        const action = dto.disciplinaryActionId !== undefined
            ? await this.findDisciplinaryAction(BigInt(dto.disciplinaryActionId))
            : current.disciplinary_actions;
        this.assertApprovedAction(action);
        if (action.id !== current.disciplinary_action_id) {
            await this.access.assertTournamentInPhases(action.tournament_id, ['in_progress', 'finished'], 'No puedes mover la multa a un torneo con su gestión disciplinaria cerrada.');
        }
        const paymentStatus = dto.paymentStatus ?? current.payment_status;
        const paidAt = dto.paidAt !== undefined
            ? dto.paidAt
            : (current.paid_at?.toISOString() ?? null);
        this.assertPaymentData(paymentStatus, paidAt);
        return this.prisma.fines.update({
            where: { id },
            data: {
                disciplinary_action_id: dto.disciplinaryActionId !== undefined ? action.id : undefined,
                amount: dto.amount,
                currency_code: dto.currencyCode,
                due_date: dto.dueDate === null
                    ? null
                    : dto.dueDate !== undefined
                        ? new Date(dto.dueDate)
                        : undefined,
                payment_status: dto.paymentStatus,
                paid_at: dto.paidAt === null
                    ? null
                    : dto.paidAt !== undefined
                        ? new Date(dto.paidAt)
                        : undefined,
                payment_reference: dto.paymentReference,
                notes: dto.notes,
            },
        });
    }
    async remove(id, requestingUserId) {
        await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
        await this.findExisting(id);
        return this.prisma.fines.delete({ where: { id } });
    }
    async findExisting(id) {
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
            throw new common_1.NotFoundException(`No se encontró la multa con ID ${id.toString()}.`);
        }
        return fine;
    }
    async findDisciplinaryAction(id) {
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
            throw new common_1.NotFoundException(`No se encontró la acción disciplinaria con ID ${id.toString()}.`);
        }
        return action;
    }
    async buildVisibleWhere(requestingUserId, roles) {
        if (roles.has('SUPER_ADMIN'))
            return undefined;
        const visibility = [];
        if (roles.has('ASSOCIATION_ADMIN')) {
            const tournamentIds = await this.access.findManageableTournamentIds(requestingUserId);
            visibility.push({ tournament_id: { in: tournamentIds ?? [] } });
        }
        if (roles.has('PLAYER')) {
            visibility.push({ player_id: requestingUserId });
        }
        return { disciplinary_actions: { OR: visibility } };
    }
    async assertCanViewFine(action, requestingUserId) {
        const roles = await this.access.findRoleCodes(requestingUserId);
        if (roles.has('SUPER_ADMIN') ||
            (roles.has('PLAYER') && action.player_id === requestingUserId)) {
            return;
        }
        if (roles.has('ASSOCIATION_ADMIN')) {
            const tournamentIds = await this.access.findManageableTournamentIds(requestingUserId);
            if (tournamentIds?.some((id) => id === action.tournament_id))
                return;
        }
        throw new common_1.ForbiddenException('No tienes permisos para consultar esta multa.');
    }
    assertPaymentData(paymentStatus, paidAt) {
        if (paymentStatus === 'paid' && !paidAt) {
            throw new common_1.BadRequestException('Una multa marcada como pagada debe incluir la fecha de pago.');
        }
    }
    assertApprovedAction(action) {
        if (action.decision_status !== 'approved') {
            throw new common_1.BadRequestException('La multa solo puede asociarse a un informe aprobado.');
        }
    }
};
exports.FinesService = FinesService;
exports.FinesService = FinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], FinesService);
//# sourceMappingURL=fines.service.js.map