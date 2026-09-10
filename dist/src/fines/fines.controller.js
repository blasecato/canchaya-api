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
exports.FinesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_fine_dto_1 = require("./dto/create-fine.dto");
const update_fine_dto_1 = require("./dto/update-fine.dto");
const fines_service_1 = require("./fines.service");
let FinesController = class FinesController {
    finesService;
    constructor(finesService) {
        this.finesService = finesService;
    }
    create(request, createFineDto) {
        return this.finesService.create(request.auth.userId, createFineDto);
    }
    findAll(request) {
        return this.finesService.findAll(request.auth.userId);
    }
    findOne(id, request) {
        return this.finesService.findOne(id, request.auth.userId);
    }
    update(id, request, updateFineDto) {
        return this.finesService.update(id, request.auth.userId, updateFineDto);
    }
    remove(id, request) {
        return this.finesService.remove(id, request.auth.userId);
    }
};
exports.FinesController = FinesController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una multa' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Multa registrada correctamente.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_fine_dto_1.CreateFineDto]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las multas' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de multas.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar una multa por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Multa encontrada.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Multa no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una multa' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Multa actualizada correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Multa no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_fine_dto_1.UpdateFineDto]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una multa' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Multa eliminada correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Multa no encontrada.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "remove", null);
exports.FinesController = FinesController = __decorate([
    (0, swagger_1.ApiTags)('Fines'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, common_1.Controller)('fines'),
    __metadata("design:paramtypes", [fines_service_1.FinesService])
], FinesController);
//# sourceMappingURL=fines.controller.js.map