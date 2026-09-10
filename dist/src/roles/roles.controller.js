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
exports.RolesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const roles_service_1 = require("./roles.service");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    findAll() {
        return this.rolesService.findAll();
    }
    findOne(code) {
        return this.rolesService.findOne(code);
    }
    update(code, updateRoleDto) {
        return this.rolesService.update(code, updateRoleDto);
    }
    remove(code) {
        return this.rolesService.remove(code);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un rol' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Rol registrado correctamente.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los roles' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de roles.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un rol por código' }),
    (0, swagger_1.ApiParam)({ name: 'code', example: 'PLAYER' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Rol encontrado.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El rol no existe.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':code'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un rol' }),
    (0, swagger_1.ApiParam)({ name: 'code', example: 'PLAYER' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Rol actualizado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El rol no existe.' }),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':code'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un rol' }),
    (0, swagger_1.ApiParam)({ name: 'code', example: 'PLAYER' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Rol eliminado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El rol no existe.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map