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
exports.RefereeAssignmentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const assign_referee_dto_1 = require("./dto/assign-referee.dto");
const replace_referee_dto_1 = require("./dto/replace-referee.dto");
const respond_referee_assignment_dto_1 = require("./dto/respond-referee-assignment.dto");
const referee_assignments_service_1 = require("./referee-assignments.service");
let RefereeAssignmentsController = class RefereeAssignmentsController {
    assignments;
    constructor(assignments) {
        this.assignments = assignments;
    }
    findAll(matchId, request) {
        return this.assignments.findMatchAssignments(request.auth.userId, matchId);
    }
    assign(matchId, request, dto) {
        return this.assignments.assign(request.auth.userId, matchId, dto);
    }
    respond(matchId, refereeId, request, dto) {
        if (refereeId !== request.auth.userId) {
            throw new common_1.ForbiddenException('La asignación solo puede ser respondida por su árbitro.');
        }
        return this.assignments.respond(request.auth.userId, matchId, dto);
    }
    replace(matchId, refereeId, request, dto) {
        return this.assignments.replace(request.auth.userId, matchId, refereeId, dto);
    }
};
exports.RefereeAssignmentsController = RefereeAssignmentsController;
__decorate([
    (0, common_1.Get)(':matchId/referees'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar asignaciones arbitrales de un partido' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('matchId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], RefereeAssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':matchId/referees'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Asignar un árbitro principal o asistente' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('matchId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, assign_referee_dto_1.AssignRefereeDto]),
    __metadata("design:returntype", void 0)
], RefereeAssignmentsController.prototype, "assign", null);
__decorate([
    (0, common_1.Patch)(':matchId/referees/:refereeId/respond'),
    (0, require_roles_decorator_1.RequireRoles)('REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Aceptar o rechazar mi asignación arbitral' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('matchId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('refereeId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, respond_referee_assignment_dto_1.RespondRefereeAssignmentDto]),
    __metadata("design:returntype", void 0)
], RefereeAssignmentsController.prototype, "respond", null);
__decorate([
    (0, common_1.Post)(':matchId/referees/:refereeId/replace'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Reemplazar un árbitro asignado' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('matchId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('refereeId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, replace_referee_dto_1.ReplaceRefereeDto]),
    __metadata("design:returntype", void 0)
], RefereeAssignmentsController.prototype, "replace", null);
exports.RefereeAssignmentsController = RefereeAssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('Referee assignments'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [referee_assignments_service_1.RefereeAssignmentsService])
], RefereeAssignmentsController);
//# sourceMappingURL=referee-assignments.controller.js.map