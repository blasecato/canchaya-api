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
exports.TournamentCatalogController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const association_tournament_response_dto_1 = require("../associations/dto/association-tournament-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const list_tournaments_query_dto_1 = require("./dto/list-tournaments-query.dto");
const tournament_catalog_response_dto_1 = require("./dto/tournament-catalog-response.dto");
const tournaments_service_1 = require("./tournaments.service");
const update_tournament_rules_dto_1 = require("./dto/update-tournament-rules.dto");
const tournament_sponsor_input_dto_1 = require("./dto/tournament-sponsor-input.dto");
const review_team_registration_dto_1 = require("./dto/review-team-registration.dto");
const register_team_dto_1 = require("./dto/register-team.dto");
const sponsorLogoUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES, fields: 20, parts: 22 },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('El logo debe ser una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let TournamentCatalogController = class TournamentCatalogController {
    tournamentsService;
    constructor(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    findFilterOptions() {
        return this.tournamentsService.findCatalogFilterOptions();
    }
    findMine(request) {
        return this.tournamentsService.findMine(request.auth.userId);
    }
    findCatalog(query, request) {
        return this.tournamentsService.findCatalog(query, request.auth.userId);
    }
    findCatalogOne(tournamentId, request) {
        return this.tournamentsService.findCatalogOne(tournamentId, request.auth.userId);
    }
    findSponsors(tournamentId, request) {
        return this.tournamentsService.findSponsors(tournamentId, request.auth.userId);
    }
    createSponsor(tournamentId, request, dto, logo) {
        return this.tournamentsService.createSponsor(tournamentId, request.auth.userId, dto, logo);
    }
    updateSponsor(tournamentId, sponsorId, request, dto, logo) {
        return this.tournamentsService.updateSponsor(tournamentId, sponsorId, request.auth.userId, dto, logo);
    }
    removeSponsor(tournamentId, sponsorId, request) {
        return this.tournamentsService.removeSponsor(tournamentId, sponsorId, request.auth.userId);
    }
    findCaptainTeams(tournamentId, request) {
        return this.tournamentsService.findCaptainTeams(tournamentId, request.auth.userId);
    }
    registerTeam(tournamentId, request, dto) {
        return this.tournamentsService.registerTeam(tournamentId, BigInt(dto.teamId), request.auth.userId);
    }
    findRegistrationDetail(tournamentId, teamId, request) {
        return this.tournamentsService.findRegistrationDetail(tournamentId, teamId, request.auth.userId);
    }
    reviewRegistration(tournamentId, teamId, request, dto) {
        return this.tournamentsService.reviewRegistration(tournamentId, teamId, request.auth.userId, dto);
    }
    resubmitRegistration(tournamentId, teamId, request) {
        return this.tournamentsService.resubmitRegistration(tournamentId, teamId, request.auth.userId);
    }
    updateRules(tournamentId, request, updateTournamentRulesDto) {
        return this.tournamentsService.updateRules(tournamentId, request.auth.userId, updateTournamentRulesDto);
    }
};
exports.TournamentCatalogController = TournamentCatalogController;
__decorate([
    (0, common_1.Get)('filters'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar opciones del catálogo de torneos' }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogFiltersResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findFilterOptions", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, require_roles_decorator_1.RequireRoles)('PLAYER', 'REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar torneos del usuario como jugador inscrito o árbitro asignado',
    }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogItemResponseDto, isArray: true }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar torneos de todas las asociaciones con filtros y paginación',
    }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogPageResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_tournaments_query_dto_1.ListTournamentsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findCatalog", null);
__decorate([
    (0, common_1.Get)(':tournamentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar el perfil completo de un torneo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentDetailResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El torneo solicitado no existe.' }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findCatalogOne", null);
__decorate([
    (0, common_1.Get)(':tournamentId/sponsors'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar los patrocinadores administrables de un torneo',
    }),
    (0, swagger_1.ApiOkResponse)({ type: association_tournament_response_dto_1.TournamentSponsorResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findSponsors", null);
__decorate([
    (0, common_1.Post)(':tournamentId/sponsors'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', sponsorLogoUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(tournament_sponsor_input_dto_1.TournamentSponsorInputDto) },
                {
                    type: 'object',
                    properties: {
                        logo: { type: 'string', format: 'binary' },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar un patrocinador a un torneo' }),
    (0, swagger_1.ApiCreatedResponse)({ type: association_tournament_response_dto_1.TournamentSponsorResponseDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, tournament_sponsor_input_dto_1.TournamentSponsorInputDto, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "createSponsor", null);
__decorate([
    (0, common_1.Patch)(':tournamentId/sponsors/:sponsorId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', sponsorLogoUploadOptions)),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Editar un patrocinador vinculado a un torneo' }),
    (0, swagger_1.ApiOkResponse)({ type: association_tournament_response_dto_1.TournamentSponsorResponseDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('sponsorId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, tournament_sponsor_input_dto_1.TournamentSponsorInputDto, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "updateSponsor", null);
__decorate([
    (0, common_1.Delete)(':tournamentId/sponsors/:sponsorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retirar un patrocinador de un torneo' }),
    (0, swagger_1.ApiOkResponse)({ schema: { example: { sponsorId: '3' } } }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('sponsorId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "removeSponsor", null);
__decorate([
    (0, common_1.Get)(':tournamentId/captain-teams'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar los equipos del usuario disponibles para inscripción',
    }),
    (0, swagger_1.ApiOkResponse)({ type: register_team_dto_1.CaptainTeamOptionResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "findCaptainTeams", null);
__decorate([
    (0, common_1.Post)(':tournamentId/registrations'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER'),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar la inscripción de un equipo al torneo' }),
    (0, swagger_1.ApiOkResponse)({ type: register_team_dto_1.TeamRegistrationResponseDto }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, register_team_dto_1.RegisterTeamDto]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "registerTeam", null);
__decorate([
    (0, common_1.Get)(':tournamentId/registrations/:teamId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('teamId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", void 0)
], TournamentCatalogController.prototype, "findRegistrationDetail", null);
__decorate([
    (0, common_1.Patch)(':tournamentId/registrations/:teamId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('teamId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, review_team_registration_dto_1.ReviewTeamRegistrationDto]),
    __metadata("design:returntype", void 0)
], TournamentCatalogController.prototype, "reviewRegistration", null);
__decorate([
    (0, common_1.Post)(':tournamentId/registrations/:teamId/resubmit'),
    (0, require_roles_decorator_1.RequireRoles)('PLAYER'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('teamId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", void 0)
], TournamentCatalogController.prototype, "resubmitRegistration", null);
__decorate([
    (0, common_1.Patch)(':tournamentId/rules'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar únicamente el reglamento enriquecido de un torneo',
    }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentRulesResponseDto }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'El usuario no administra la asociación a la que pertenece el torneo.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El torneo solicitado no existe.' }),
    __param(0, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_tournament_rules_dto_1.UpdateTournamentRulesDto]),
    __metadata("design:returntype", Promise)
], TournamentCatalogController.prototype, "updateRules", null);
exports.TournamentCatalogController = TournamentCatalogController = __decorate([
    (0, swagger_1.ApiTags)('Tournament catalog'),
    (0, swagger_1.ApiExtraModels)(tournament_sponsor_input_dto_1.TournamentSponsorInputDto),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token de acceso ausente, inválido, expirado o revocado.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER'),
    (0, common_1.Controller)('tournaments'),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], TournamentCatalogController);
//# sourceMappingURL=tournament-catalog.controller.js.map