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
exports.TeamsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const create_team_dto_1 = require("./dto/create-team.dto");
const list_teams_query_dto_1 = require("./dto/list-teams-query.dto");
const list_team_players_query_dto_1 = require("./dto/list-team-players-query.dto");
const update_team_dto_1 = require("./dto/update-team.dto");
const team_carnets_response_dto_1 = require("./dto/team-carnets-response.dto");
const team_carnets_query_dto_1 = require("./dto/team-carnets-query.dto");
const team_rosters_response_dto_1 = require("./dto/team-rosters-response.dto");
const update_tournament_roster_player_dto_1 = require("./dto/update-tournament-roster-player.dto");
const teams_service_1 = require("./teams.service");
const teamPhotoUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('El escudo debe ser una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
const photoProperty = {
    type: 'string',
    format: 'binary',
    description: 'Escudo opcional JPEG, PNG o WebP de máximo 2 MB.',
};
let TeamsController = class TeamsController {
    teamsService;
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    findFilters(request) {
        return this.teamsService.findFilters(request.auth.userId);
    }
    findCaptainOptions(query) {
        return this.teamsService.findPlayerOptions(query);
    }
    create(request, createTeamDto, photo) {
        return this.teamsService.create(request.auth.userId, createTeamDto, photo);
    }
    findAll(query, request) {
        return this.teamsService.findAll(query, request.auth.userId);
    }
    findCarnets(id, query, request) {
        return this.teamsService.findCarnets(id, request.auth.userId, query.tournamentId ? BigInt(query.tournamentId) : undefined);
    }
    findTournamentRosters(id, request) {
        return this.teamsService.findTournamentRosters(id, request.auth.userId);
    }
    updateTournamentRosterPlayer(id, tournamentId, playerId, request, dto) {
        return this.teamsService.updateTournamentRosterPlayer(id, tournamentId, playerId, request.auth.userId, dto);
    }
    removeMember(id, playerId, request) {
        return this.teamsService.removeMember(id, playerId, request.auth.userId);
    }
    findOne(id, request) {
        return this.teamsService.findOne(id, request.auth.userId);
    }
    leave(id, request) {
        return this.teamsService.leave(id, request.auth.userId);
    }
    update(id, request, updateTeamDto, photo) {
        return this.teamsService.update(id, request.auth.userId, updateTeamDto, photo);
    }
    remove(id, request) {
        return this.teamsService.remove(id, request.auth.userId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Get)('filters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar torneos disponibles para filtrar equipos',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findFilters", null);
__decorate([
    (0, common_1.Get)('captain-options'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar jugadores activos disponibles para un equipo',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_team_players_query_dto_1.ListTeamPlayersQueryDto]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findCaptainOptions", null);
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', teamPhotoUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_team_dto_1.CreateTeamDto) },
                { type: 'object', properties: { photo: photoProperty } },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un equipo con un capitán obligatorio' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Equipo registrado correctamente.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_team_dto_1.CreateTeamDto, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar equipos por rol, filtros y paginación' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Página de equipos visible para el usuario.' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_teams_query_dto_1.ListTeamsQueryDto, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/carnets'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar datos privados para generar los carnés de un equipo',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '26', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: team_carnets_response_dto_1.TeamCarnetsResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, team_carnets_query_dto_1.TeamCarnetsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "findCarnets", null);
__decorate([
    (0, common_1.Get)(':id/rosters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar dorsales y posiciones del equipo por torneo',
    }),
    (0, swagger_1.ApiOkResponse)({ type: team_rosters_response_dto_1.TeamRostersResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "findTournamentRosters", null);
__decorate([
    (0, common_1.Patch)(':id/rosters/:tournamentId/players/:playerId'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar dorsal y posición de un jugador en un torneo',
    }),
    (0, swagger_1.ApiOkResponse)({ type: team_rosters_response_dto_1.TeamRosterPlayerResponseDto }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Param)('playerId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, BigInt, Object, update_tournament_roster_player_dto_1.UpdateTournamentRosterPlayerDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "updateTournamentRosterPlayer", null);
__decorate([
    (0, common_1.Delete)(':id/members/:playerId'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retirar un jugador respetando los mínimos de los torneos',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('playerId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un equipo visible por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/leave'),
    (0, require_roles_decorator_1.RequireRoles)('PLAYER'),
    (0, swagger_1.ApiOperation)({ summary: 'Abandonar un equipo como jugador no capitán' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "leave", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', teamPhotoUploadOptions)),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un equipo administrable' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_team_dto_1.UpdateTeamDto, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar lógicamente un equipo y conservar su historial',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "remove", null);
exports.TeamsController = TeamsController = __decorate([
    (0, swagger_1.ApiTags)('Teams'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiExtraModels)(create_team_dto_1.CreateTeamDto, update_team_dto_1.UpdateTeamDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map