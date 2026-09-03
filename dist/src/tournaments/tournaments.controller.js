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
exports.TournamentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const association_tournament_response_dto_1 = require("../associations/dto/association-tournament-response.dto");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const create_tournament_dto_1 = require("./dto/create-tournament.dto");
const update_tournament_dto_1 = require("./dto/update-tournament.dto");
const tournaments_service_1 = require("./tournaments.service");
const PHOTO_SCHEMA = {
    type: 'string',
    format: 'binary',
    description: 'Foto opcional JPEG, PNG o WebP de máximo 2 MB.',
};
const tournamentImageUploadOptions = {
    limits: {
        files: 21,
        fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
        fields: 23,
        parts: 48,
    },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('Las imágenes deben ser JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let TournamentsController = class TournamentsController {
    tournamentsService;
    constructor(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    create(associationId, request, createTournamentDto, images) {
        return this.tournamentsService.create(associationId, request.auth.userId, createTournamentDto, images?.photo?.[0], images?.sponsorLogos ?? []);
    }
    findOne(associationId, tournamentId, request) {
        return this.tournamentsService.findOne(associationId, tournamentId, request.auth.userId);
    }
    update(associationId, tournamentId, request, updateTournamentDto, images) {
        return this.tournamentsService.update(associationId, tournamentId, request.auth.userId, updateTournamentDto, images?.photo?.[0], images?.sponsorLogos ?? []);
    }
    remove(associationId, tournamentId, request) {
        return this.tournamentsService.remove(associationId, tournamentId, request.auth.userId);
    }
};
exports.TournamentsController = TournamentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'photo', maxCount: 1 },
        { name: 'sponsorLogos', maxCount: 20 },
    ], tournamentImageUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_tournament_dto_1.CreateTournamentDto) },
                {
                    type: 'object',
                    properties: {
                        photo: PHOTO_SCHEMA,
                        sponsorLogos: {
                            type: 'array',
                            items: { type: 'string', format: 'binary' },
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un torneo dentro de una asociación' }),
    (0, swagger_1.ApiParam)({ name: 'associationId', example: '1', type: String }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Torneo registrado correctamente.',
        type: association_tournament_response_dto_1.AssociationTournamentResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos, fechas o formato de imagen inválidos.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'La asociación o el tipo de torneo no existe.',
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'La foto supera el límite de 2 MB.',
    }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, create_tournament_dto_1.CreateTournamentDto, Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':tournamentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un torneo dentro de su asociación' }),
    (0, swagger_1.ApiParam)({ name: 'associationId', example: '1', type: String }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Torneo encontrado.',
        type: association_tournament_response_dto_1.AssociationTournamentResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'El torneo no existe en la asociación o no está disponible para este usuario.',
    }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':tournamentId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'photo', maxCount: 1 },
        { name: 'sponsorLogos', maxCount: 20 },
    ], tournamentImageUploadOptions)),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(update_tournament_dto_1.UpdateTournamentDto) },
                {
                    type: 'object',
                    properties: {
                        photo: PHOTO_SCHEMA,
                        sponsorLogos: {
                            type: 'array',
                            items: { type: 'string', format: 'binary' },
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un torneo de una asociación' }),
    (0, swagger_1.ApiParam)({ name: 'associationId', example: '1', type: String }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Torneo actualizado correctamente.',
        type: association_tournament_response_dto_1.AssociationTournamentResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos, fechas o formato de imagen inválidos.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'El torneo no existe dentro de la asociación.',
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'La foto supera el límite de 2 MB.',
    }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, update_tournament_dto_1.UpdateTournamentDto, Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':tournamentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar permanentemente un torneo en borrador sin inscripciones',
    }),
    (0, swagger_1.ApiParam)({ name: 'associationId', example: '1', type: String }),
    (0, swagger_1.ApiParam)({ name: 'tournamentId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Torneo eliminado correctamente.',
        type: association_tournament_response_dto_1.AssociationTournamentResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'El torneo no es un borrador o ya tiene inscripciones.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'El torneo no existe dentro de la asociación.',
    }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('tournamentId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", Promise)
], TournamentsController.prototype, "remove", null);
exports.TournamentsController = TournamentsController = __decorate([
    (0, swagger_1.ApiTags)('Association tournaments'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token de acceso ausente, inválido, expirado o revocado.',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'El usuario no tiene permisos para administrar torneos en esta asociación.',
    }),
    (0, swagger_1.ApiExtraModels)(create_tournament_dto_1.CreateTournamentDto, update_tournament_dto_1.UpdateTournamentDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('associations/:associationId/tournaments'),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], TournamentsController);
//# sourceMappingURL=tournaments.controller.js.map