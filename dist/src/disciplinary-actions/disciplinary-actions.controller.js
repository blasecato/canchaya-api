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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaryActionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const allow_blocked_user_decorator_1 = require("../auth/decorators/allow-blocked-user.decorator");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_disciplinary_action_dto_1 = require("./dto/create-disciplinary-action.dto");
const create_disciplinary_appeal_dto_1 = require("./dto/create-disciplinary-appeal.dto");
const decide_disciplinary_action_dto_1 = require("./dto/decide-disciplinary-action.dto");
const list_disciplinary_actions_query_dto_1 = require("./dto/list-disciplinary-actions-query.dto");
const report_options_query_dto_1 = require("./dto/report-options-query.dto");
const resolve_disciplinary_appeal_dto_1 = require("./dto/resolve-disciplinary-appeal.dto");
const update_disciplinary_action_dto_1 = require("./dto/update-disciplinary-action.dto");
const update_disciplinary_compliance_dto_1 = require("./dto/update-disciplinary-compliance.dto");
const disciplinary_actions_service_1 = require("./disciplinary-actions.service");
let DisciplinaryActionsController = class DisciplinaryActionsController {
    disciplinaryActionsService;
    constructor(disciplinaryActionsService) {
        this.disciplinaryActionsService = disciplinaryActionsService;
    }
    create(request, createDisciplinaryActionDto) {
        return this.disciplinaryActionsService.create(request.auth.userId, createDisciplinaryActionDto);
    }
    findAll(request, query) {
        return this.disciplinaryActionsService.findAll(request.auth.userId, query);
    }
    findReportOptions(request, query) {
        return this.disciplinaryActionsService.findReportOptions(request.auth.userId, BigInt(query.matchId));
    }
    findOne(id, request) {
        return this.disciplinaryActionsService.findOne(id, request.auth.userId);
    }
    startReview(id, request) {
        return this.disciplinaryActionsService.startReview(id, request.auth.userId);
    }
    decide(id, request, dto) {
        return this.disciplinaryActionsService.decide(id, request.auth.userId, dto);
    }
    appeal(id, request, dto) {
        return this.disciplinaryActionsService.appeal(id, request.auth.userId, dto);
    }
    resolveAppeal(id, request, dto) {
        return this.disciplinaryActionsService.resolveAppeal(id, request.auth.userId, dto);
    }
    updateCompliance(id, request, dto) {
        return this.disciplinaryActionsService.updateCompliance(id, request.auth.userId, dto);
    }
    update(id, request, updateDisciplinaryActionDto) {
        return this.disciplinaryActionsService.update(id, request.auth.userId, updateDisciplinaryActionDto);
    }
    remove(id, request) {
        return this.disciplinaryActionsService.remove(id, request.auth.userId);
    }
};
exports.DisciplinaryActionsController = DisciplinaryActionsController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un informe arbitral disciplinario' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Acción disciplinaria registrada correctamente.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_disciplinary_action_dto_1.CreateDisciplinaryActionDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, allow_blocked_user_decorator_1.AllowBlockedUser)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las acciones disciplinarias' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de acciones disciplinarias.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_disciplinary_actions_query_dto_1.ListDisciplinaryActionsQueryDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('report-options'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar jugadores disponibles para un informe arbitral',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_options_query_dto_1.ReportOptionsQueryDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "findReportOptions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, allow_blocked_user_decorator_1.AllowBlockedUser)(),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar una acción disciplinaria por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Acción disciplinaria encontrada.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/review'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Tomar un informe disciplinario para revisión' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "startReview", null);
__decorate([
    (0, common_1.Patch)(':id/decision'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Decidir un caso y aplicar sus sanciones' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, decide_disciplinary_action_dto_1.DecideDisciplinaryActionDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "decide", null);
__decorate([
    (0, common_1.Post)(':id/appeals'),
    (0, require_roles_decorator_1.RequireRoles)('PLAYER'),
    (0, allow_blocked_user_decorator_1.AllowBlockedUser)(),
    (0, swagger_1.ApiOperation)({ summary: 'Apelar una decisión disciplinaria propia' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, create_disciplinary_appeal_dto_1.CreateDisciplinaryAppealDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "appeal", null);
__decorate([
    (0, common_1.Patch)(':id/appeals/resolve'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolver una apelación disciplinaria' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, resolve_disciplinary_appeal_dto_1.ResolveDisciplinaryAppealDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "resolveAppeal", null);
__decorate([
    (0, common_1.Patch)(':id/compliance'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar el cumplimiento de una sanción' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_disciplinary_compliance_dto_1.UpdateDisciplinaryComplianceDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "updateCompliance", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una acción disciplinaria' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Acción disciplinaria actualizada correctamente.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_disciplinary_action_dto_1.UpdateDisciplinaryActionDto]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una acción disciplinaria' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Acción disciplinaria eliminada correctamente.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Acción disciplinaria no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], DisciplinaryActionsController.prototype, "remove", null);
exports.DisciplinaryActionsController = DisciplinaryActionsController = __decorate([
    (0, swagger_1.ApiTags)('Disciplinary actions'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER'),
    (0, common_1.Controller)('disciplinary-actions'),
    __metadata("design:paramtypes", [disciplinary_actions_service_1.DisciplinaryActionsService])
], DisciplinaryActionsController);
//# sourceMappingURL=disciplinary-actions.controller.js.map