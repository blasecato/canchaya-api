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
exports.TournamentTypesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_tournament_type_dto_1 = require("./dto/create-tournament-type.dto");
const tournament_type_response_dto_1 = require("./dto/tournament-type-response.dto");
const update_tournament_type_dto_1 = require("./dto/update-tournament-type.dto");
const tournament_types_service_1 = require("./tournament-types.service");
let TournamentTypesController = class TournamentTypesController {
    tournamentTypesService;
    constructor(tournamentTypesService) {
        this.tournamentTypesService = tournamentTypesService;
    }
    create(createTournamentTypeDto) {
        return this.tournamentTypesService.create(createTournamentTypeDto);
    }
    findAll() {
        return this.tournamentTypesService.findAll();
    }
    findOne(id) {
        return this.tournamentTypesService.findOne(id);
    }
    update(id, updateTournamentTypeDto) {
        return this.tournamentTypesService.update(id, updateTournamentTypeDto);
    }
    remove(id) {
        return this.tournamentTypesService.remove(id);
    }
};
exports.TournamentTypesController = TournamentTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un tipo de torneo' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Tipo de torneo registrado correctamente.',
        type: tournament_type_response_dto_1.TournamentTypeResponseDto,
    }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Ya existe un tipo con ese nombre.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tournament_type_dto_1.CreateTournamentTypeDto]),
    __metadata("design:returntype", Promise)
], TournamentTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los tipos de torneo' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado de tipos de torneo.',
        type: tournament_type_response_dto_1.TournamentTypeResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournamentTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un tipo de torneo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tipo de torneo encontrado.',
        type: tournament_type_response_dto_1.TournamentTypeResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El tipo de torneo no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", Promise)
], TournamentTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un tipo de torneo' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tipo de torneo actualizado correctamente.',
        type: tournament_type_response_dto_1.TournamentTypeResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'El rango de jugadores es inválido.' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Ya existe un tipo con ese nombre.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El tipo de torneo no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, update_tournament_type_dto_1.UpdateTournamentTypeDto]),
    __metadata("design:returntype", Promise)
], TournamentTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un tipo de torneo' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tipo de torneo eliminado correctamente.',
        type: tournament_type_response_dto_1.TournamentTypeResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'El tipo está siendo utilizado por uno o más torneos.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El tipo de torneo no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", Promise)
], TournamentTypesController.prototype, "remove", null);
exports.TournamentTypesController = TournamentTypesController = __decorate([
    (0, swagger_1.ApiTags)('Tournament types'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token de acceso ausente, inválido, expirado o revocado.',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'El usuario no tiene un rol autorizado para esta operación.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('tournament-types'),
    __metadata("design:paramtypes", [tournament_types_service_1.TournamentTypesService])
], TournamentTypesController);
//# sourceMappingURL=tournament-types.controller.js.map