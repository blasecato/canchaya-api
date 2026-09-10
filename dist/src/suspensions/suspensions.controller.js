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
exports.SuspensionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_suspension_dto_1 = require("./dto/create-suspension.dto");
const update_suspension_dto_1 = require("./dto/update-suspension.dto");
const suspensions_service_1 = require("./suspensions.service");
let SuspensionsController = class SuspensionsController {
    suspensionsService;
    constructor(suspensionsService) {
        this.suspensionsService = suspensionsService;
    }
    create(request, createSuspensionDto) {
        return this.suspensionsService.create(request.auth.userId, createSuspensionDto);
    }
    findAll(request) {
        return this.suspensionsService.findAll(request.auth.userId);
    }
    findOne(id, request) {
        return this.suspensionsService.findOne(id, request.auth.userId);
    }
    update(id, request, updateSuspensionDto) {
        return this.suspensionsService.update(id, request.auth.userId, updateSuspensionDto);
    }
    remove(id, request) {
        return this.suspensionsService.remove(id, request.auth.userId);
    }
};
exports.SuspensionsController = SuspensionsController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una suspensión' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Suspensión registrada correctamente.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_suspension_dto_1.CreateSuspensionDto]),
    __metadata("design:returntype", void 0)
], SuspensionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las suspensiones' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de suspensiones.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuspensionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar una suspensión por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Suspensión encontrada.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Suspensión no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], SuspensionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una suspensión' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Suspensión actualizada correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Suspensión no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_suspension_dto_1.UpdateSuspensionDto]),
    __metadata("design:returntype", void 0)
], SuspensionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una suspensión' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Suspensión eliminada correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Suspensión no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], SuspensionsController.prototype, "remove", null);
exports.SuspensionsController = SuspensionsController = __decorate([
    (0, swagger_1.ApiTags)('Suspensions'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, common_1.Controller)('suspensions'),
    __metadata("design:paramtypes", [suspensions_service_1.SuspensionsService])
], SuspensionsController);
//# sourceMappingURL=suspensions.controller.js.map