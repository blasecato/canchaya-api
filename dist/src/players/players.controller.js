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
exports.PlayersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const block_player_dto_1 = require("./dto/block-player.dto");
const create_player_dto_1 = require("./dto/create-player.dto");
const list_players_query_dto_1 = require("./dto/list-players-query.dto");
const update_player_dto_1 = require("./dto/update-player.dto");
const players_service_1 = require("./players.service");
const playerPhotoUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('La foto de perfil debe ser una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
const photoProperty = {
    type: 'string',
    format: 'binary',
    description: 'Foto de perfil opcional JPEG, PNG o WebP de máximo 2 MB.',
};
let PlayersController = class PlayersController {
    playersService;
    constructor(playersService) {
        this.playersService = playersService;
    }
    findFilters() {
        return this.playersService.findFilters();
    }
    findAll(query, request) {
        return this.playersService.findAll(query, request.auth.userId);
    }
    create(dto, photo) {
        return this.playersService.create(dto, photo);
    }
    block(id, request, dto) {
        return this.playersService.block(id, request.auth.userId, dto);
    }
    unblock(id) {
        return this.playersService.unblock(id);
    }
    update(id, dto, photo) {
        return this.playersService.update(id, dto, photo);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Get)('filters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar equipos y torneos para filtrar jugadores',
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findFilters", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar jugadores con métricas, filtros y paginación',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_players_query_dto_1.ListPlayersQueryDto, Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', playerPhotoUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_player_dto_1.CreatePlayerDto) },
                { type: 'object', properties: { photo: photoProperty } },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un usuario con rol de jugador' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDto, Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/block'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bloquear temporalmente un jugador y revocar sus sesiones',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, block_player_dto_1.BlockPlayerDto]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "block", null);
__decorate([
    (0, common_1.Patch)(':id/unblock'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Levantar el bloqueo de un jugador' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "unblock", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', playerPhotoUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(update_player_dto_1.UpdatePlayerDto) },
                { type: 'object', properties: { photo: photoProperty } },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar la información de un jugador' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, update_player_dto_1.UpdatePlayerDto, Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "update", null);
exports.PlayersController = PlayersController = __decorate([
    (0, swagger_1.ApiTags)('Player administration'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiExtraModels)(create_player_dto_1.CreatePlayerDto, update_player_dto_1.UpdatePlayerDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map