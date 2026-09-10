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
const competition_access_service_1 = require("../authorization/competition-access.service");
const prisma_service_1 = require("../prisma/prisma.service");
let SuspensionsService = class SuspensionsService {
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
        await this.access.assertTournamentInPhases(action.tournament_id, ['in_progress', 'finished'], 'Las suspensiones solo se pueden gestionar durante el torneo o su cierre.');
        this.assertValidPeriod(dto.matchesCount, dto.startDate, dto.endDate);
        return this.prisma.suspensions.create({
            data: {
                disciplinary_action_id: action.id,
                matches_count: dto.matchesCount,
                start_date: dto.startDate === null
                    ? null
                    : dto.startDate !== undefined
                        ? new Date(dto.startDate)
                        : undefined,
                end_date: dto.endDate === null
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
    async findAll(requestingUserId) {
        const roles = await this.access.findRoleCodes(requestingUserId);
        const where = await this.buildVisibleWhere(requestingUserId, roles);
        return this.prisma.suspensions.findMany({
            where,
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id, requestingUserId) {
        const suspension = await this.findExisting(id);
        await this.assertCanViewSuspension(suspension.disciplinary_actions, requestingUserId);
        return suspension;
    }
    async update(id, requestingUserId, dto) {
        await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
        const current = await this.findExisting(id);
        await this.access.assertTournamentInPhases(current.disciplinary_actions.tournament_id, ['in_progress', 'finished'], 'Las suspensiones ya están cerradas para este estado del torneo.');
        const action = dto.disciplinaryActionId !== undefined
            ? await this.findDisciplinaryAction(BigInt(dto.disciplinaryActionId))
            : current.disciplinary_actions;
        this.assertApprovedAction(action);
        if (action.id !== current.disciplinary_action_id) {
            await this.access.assertTournamentInPhases(action.tournament_id, ['in_progress', 'finished'], 'No puedes mover la suspensión a un torneo con su gestión disciplinaria cerrada.');
        }
        const matchesCount = dto.matchesCount !== undefined ? dto.matchesCount : current.matches_count;
        const startDate = dto.startDate !== undefined
            ? dto.startDate
            : (current.start_date?.toISOString().slice(0, 10) ?? null);
        const endDate = dto.endDate !== undefined
            ? dto.endDate
            : (current.end_date?.toISOString().slice(0, 10) ?? null);
        this.assertValidPeriod(matchesCount, startDate, endDate);
        return this.prisma.suspensions.update({
            where: { id },
            data: {
                disciplinary_action_id: dto.disciplinaryActionId !== undefined ? action.id : undefined,
                matches_count: dto.matchesCount,
                start_date: dto.startDate === null
                    ? null
                    : dto.startDate !== undefined
                        ? new Date(dto.startDate)
                        : undefined,
                end_date: dto.endDate === null
                    ? null
                    : dto.endDate !== undefined
                        ? new Date(dto.endDate)
                        : undefined,
                reason: dto.reason,
                status: dto.status,
            },
        });
    }
    async remove(id, requestingUserId) {
        await this.access.assertHasAnyRole(requestingUserId, ['SUPER_ADMIN']);
        await this.findExisting(id);
        return this.prisma.suspensions.delete({ where: { id } });
    }
    async findExisting(id) {
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
            throw new common_1.NotFoundException(`No se encontró la suspensión con ID ${id.toString()}.`);
        }
        return suspension;
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
    async assertCanViewSuspension(action, requestingUserId) {
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
        throw new common_1.ForbiddenException('No tienes permisos para consultar esta suspensión.');
    }
    assertValidPeriod(matchesCount, startDate, endDate) {
        if (matchesCount == null && !startDate) {
            throw new common_1.BadRequestException('La suspensión debe indicar una cantidad de partidos o una fecha de inicio.');
        }
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            throw new common_1.BadRequestException('La fecha final no puede ser anterior a la fecha inicial de la suspensión.');
        }
    }
    assertApprovedAction(action) {
        if (action.decision_status !== 'approved') {
            throw new common_1.BadRequestException('La suspensión solo puede asociarse a un informe aprobado.');
        }
    }
};
exports.SuspensionsService = SuspensionsService;
exports.SuspensionsService = SuspensionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        competition_access_service_1.CompetitionAccessService])
], SuspensionsService);
//# sourceMappingURL=suspensions.service.js.map