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
exports.RefereesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_referee_availability_dto_1 = require("./dto/create-referee-availability.dto");
const list_referee_availability_query_dto_1 = require("./dto/list-referee-availability-query.dto");
const list_referee_matches_query_dto_1 = require("./dto/list-referee-matches-query.dto");
const update_referee_availability_dto_1 = require("./dto/update-referee-availability.dto");
const referee_assignments_service_1 = require("./referee-assignments.service");
const referees_service_1 = require("./referees.service");
let RefereesController = class RefereesController {
    refereesService;
    assignmentsService;
    constructor(refereesService, assignmentsService) {
        this.refereesService = refereesService;
        this.assignmentsService = assignmentsService;
    }
    findAll(search) {
        return this.refereesService.findAll(search);
    }
    findMyAvailability(request, query) {
        return this.refereesService.findAvailability(request.auth.userId, request.auth.userId, query);
    }
    createMyAvailability(request, dto) {
        return this.refereesService.createAvailability(request.auth.userId, dto);
    }
    updateMyAvailability(request, availabilityId, dto) {
        return this.refereesService.updateAvailability(request.auth.userId, availabilityId, dto);
    }
    removeMyAvailability(request, availabilityId) {
        return this.refereesService.removeAvailability(request.auth.userId, availabilityId);
    }
    findAvailability(id, request, query) {
        return this.refereesService.findAvailability(id, request.auth.userId, query);
    }
    findAssignableMatches(id, request) {
        return this.assignmentsService.findAssignableMatches(request.auth.userId, id);
    }
    findMatches(id, request, query) {
        return this.refereesService.findMatches(id, request.auth.userId, query);
    }
    removeRole(id, request) {
        return this.refereesService.removeRole(id, request.auth.userId);
    }
};
exports.RefereesController = RefereesController;
__decorate([
    openapi.ApiQuery({ name: "search", required: false }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar árbitros activos y disponibilidad de hoy' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me/availability'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar mi disponibilidad arbitral' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_referee_availability_query_dto_1.ListRefereeAvailabilityQueryDto]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "findMyAvailability", null);
__decorate([
    (0, common_1.Post)('me/availability'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un bloque de disponibilidad arbitral' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_referee_availability_dto_1.CreateRefereeAvailabilityDto]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "createMyAvailability", null);
__decorate([
    (0, common_1.Patch)('me/availability/:availabilityId'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un bloque de disponibilidad arbitral' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('availabilityId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BigInt, update_referee_availability_dto_1.UpdateRefereeAvailabilityDto]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "updateMyAvailability", null);
__decorate([
    (0, common_1.Delete)('me/availability/:availabilityId'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un bloque de disponibilidad arbitral' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('availabilityId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BigInt]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "removeMyAvailability", null);
__decorate([
    (0, common_1.Get)(':id/availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar disponibilidad de un árbitro' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, list_referee_availability_query_dto_1.ListRefereeAvailabilityQueryDto]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "findAvailability", null);
__decorate([
    (0, common_1.Get)(':id/assignable-matches'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar partidos donde se puede asignar un árbitro',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "findAssignableMatches", null);
__decorate([
    (0, common_1.Get)(':id/matches'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar partidos dirigidos y próximos de un árbitro',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, list_referee_matches_query_dto_1.ListRefereeMatchesQueryDto]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "findMatches", null);
__decorate([
    (0, common_1.Patch)(':id/remove-role'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar el rol de árbitro por el rol de jugador' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], RefereesController.prototype, "removeRole", null);
exports.RefereesController = RefereesController = __decorate([
    (0, swagger_1.ApiTags)('Referees'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE'),
    (0, common_1.Controller)('referees'),
    __metadata("design:paramtypes", [referees_service_1.RefereesService,
        referee_assignments_service_1.RefereeAssignmentsService])
], RefereesController);
//# sourceMappingURL=referees.controller.js.map