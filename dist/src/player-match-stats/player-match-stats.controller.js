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
exports.PlayerMatchStatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const create_player_match_stat_dto_1 = require("./dto/create-player-match-stat.dto");
const update_player_match_stat_dto_1 = require("./dto/update-player-match-stat.dto");
const player_match_stats_service_1 = require("./player-match-stats.service");
let PlayerMatchStatsController = class PlayerMatchStatsController {
    playerMatchStatsService;
    constructor(playerMatchStatsService) {
        this.playerMatchStatsService = playerMatchStatsService;
    }
    create(request, createPlayerMatchStatDto) {
        return this.playerMatchStatsService.create(request.auth.userId, createPlayerMatchStatDto);
    }
    findAll(request) {
        return this.playerMatchStatsService.findAll(request.auth.userId);
    }
    findOne(id, request) {
        return this.playerMatchStatsService.findOne(id, request.auth.userId);
    }
    update(id, request, updatePlayerMatchStatDto) {
        return this.playerMatchStatsService.update(id, request.auth.userId, updatePlayerMatchStatDto);
    }
    remove(id, request) {
        return this.playerMatchStatsService.remove(id, request.auth.userId);
    }
};
exports.PlayerMatchStatsController = PlayerMatchStatsController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar estadísticas de un jugador en un partido',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Estadísticas registradas correctamente.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_player_match_stat_dto_1.CreatePlayerMatchStatDto]),
    __metadata("design:returntype", void 0)
], PlayerMatchStatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las estadísticas por partido' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de estadísticas por partido.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayerMatchStatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar estadísticas por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Estadísticas encontradas.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Estadísticas no encontradas.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], PlayerMatchStatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar estadísticas de un partido' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Estadísticas actualizadas correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Estadísticas no encontradas.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_player_match_stat_dto_1.UpdatePlayerMatchStatDto]),
    __metadata("design:returntype", void 0)
], PlayerMatchStatsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar estadísticas de un partido' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Estadísticas eliminadas correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Estadísticas no encontradas.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], PlayerMatchStatsController.prototype, "remove", null);
exports.PlayerMatchStatsController = PlayerMatchStatsController = __decorate([
    (0, swagger_1.ApiTags)('Player match stats'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER'),
    (0, common_1.Controller)('player-match-stats'),
    __metadata("design:paramtypes", [player_match_stats_service_1.PlayerMatchStatsService])
], PlayerMatchStatsController);
//# sourceMappingURL=player-match-stats.controller.js.map