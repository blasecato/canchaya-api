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
exports.AssociationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const associations_service_1 = require("./associations.service");
const association_response_dto_1 = require("./dto/association-response.dto");
const association_detail_response_dto_1 = require("./dto/association-detail-response.dto");
const association_tournament_response_dto_1 = require("./dto/association-tournament-response.dto");
const create_association_dto_1 = require("./dto/create-association.dto");
const list_association_tournaments_query_dto_1 = require("./dto/list-association-tournaments-query.dto");
const update_association_dto_1 = require("./dto/update-association.dto");
let AssociationsController = class AssociationsController {
    associationsService;
    constructor(associationsService) {
        this.associationsService = associationsService;
    }
    create(request, createAssociationDto, images) {
        const logo = images?.logo?.[0];
        const cover = images?.cover?.[0];
        if (!logo || !cover) {
            throw new common_1.BadRequestException('El logo y la portada de la asociación son obligatorios.');
        }
        return this.associationsService.create(createAssociationDto, logo, cover, request.auth.userId);
    }
    findAll(request) {
        return this.associationsService.findAll(request.auth.userId);
    }
    findMine(request) {
        return this.associationsService.findMine(request.auth.userId);
    }
    findAdministeredBy(userId) {
        return this.associationsService.findAdministeredBy(userId);
    }
    findAvailableTournaments(id, request, query) {
        return this.associationsService.findAvailableTournaments(id, request.auth.userId, query.scope);
    }
    findOne(id, request) {
        return this.associationsService.findOne(id, request.auth.userId);
    }
    update(id, request, updateAssociationDto, images) {
        return this.associationsService.update(id, request.auth.userId, updateAssociationDto, { logo: images?.logo?.[0], cover: images?.cover?.[0] });
    }
    remove(id) {
        return this.associationsService.remove(id);
    }
};
exports.AssociationsController = AssociationsController;
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ], {
        limits: {
            fields: 9,
            files: 2,
            fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
            parts: 12,
        },
        fileFilter: (_request, file, callback) => {
            if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
                callback(new common_1.BadRequestException('El logo y la portada deben ser imágenes JPEG, PNG o WebP.'), false);
                return;
            }
            callback(null, true);
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_association_dto_1.CreateAssociationDto) },
                {
                    type: 'object',
                    required: ['logo', 'cover'],
                    properties: {
                        logo: {
                            type: 'string',
                            format: 'binary',
                            description: 'Imagen JPEG, PNG o WebP de máximo 2 MB.',
                        },
                        cover: {
                            type: 'string',
                            format: 'binary',
                            description: 'Portada JPEG, PNG o WebP de máximo 2 MB.',
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar una asociación' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Asociación registrada correctamente.',
        type: association_response_dto_1.AssociationResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos inválidos, propietario inactivo o imágenes no permitidas.',
    }),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'Una de las imágenes supera el límite de 2 MB.',
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'El NIT o el propietario ya están asociados a otro registro.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El usuario propietario no existe.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_association_dto_1.CreateAssociationDto, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar las asociaciones visibles para el usuario',
        description: 'SUPER_ADMIN consulta todas las asociaciones; ASSOCIATION_ADMIN, PLAYER y REFEREE consultan únicamente las asociaciones activas.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado de asociaciones con propietario y métricas.',
        type: association_response_dto_1.AssociationResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar las asociaciones accesibles del usuario autenticado',
        description: 'Devuelve asociaciones donde el usuario es propietario o tiene una asignación activa. Un SUPER_ADMIN obtiene únicamente sus asociaciones vinculadas; para consultar todas debe usar GET /associations.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Asociaciones propias o asignadas, sin duplicados.',
        type: association_response_dto_1.AssociationResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)('administered-by/:userId'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar las asociaciones administradas por un usuario',
    }),
    (0, swagger_1.ApiParam)({ name: 'userId', example: '12', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Asociaciones donde el usuario es propietario o administrador activo.',
        type: association_response_dto_1.AssociationResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('userId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "findAdministeredBy", null);
__decorate([
    (0, common_1.Get)(':id/tournaments'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar los torneos disponibles de una asociación',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'scope',
        required: false,
        enum: ['available', 'management'],
        description: 'management muestra todos los estados y exige permiso para administrar torneos.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Torneos activos disponibles, ordenados por fecha de inicio.',
        type: association_tournament_response_dto_1.AssociationTournamentResponseDto,
        isArray: true,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'La asociación no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, list_association_tournaments_query_dto_1.ListAssociationTournamentsQueryDto]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "findAvailableTournaments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar una asociación por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Asociación encontrada.',
        type: association_detail_response_dto_1.AssociationDetailResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'La asociación no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ], {
        limits: {
            fields: 9,
            files: 2,
            fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
            parts: 12,
        },
        fileFilter: (_request, file, callback) => {
            if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
                callback(new common_1.BadRequestException('El logo y la portada deben ser imágenes JPEG, PNG o WebP.'), false);
                return;
            }
            callback(null, true);
        },
    })),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(update_association_dto_1.UpdateAssociationDto) },
                {
                    type: 'object',
                    properties: {
                        logo: {
                            type: 'string',
                            format: 'binary',
                            description: 'Nuevo logo opcional, de máximo 2 MB.',
                        },
                        cover: {
                            type: 'string',
                            format: 'binary',
                            description: 'Nueva portada opcional, de máximo 2 MB.',
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una asociación' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Asociación actualizada correctamente.',
        type: association_detail_response_dto_1.AssociationDetailResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'La asociación no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_association_dto_1.UpdateAssociationDto, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una asociación' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Asociación eliminada correctamente.',
        type: association_response_dto_1.AssociationResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'La asociación no existe.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "remove", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, swagger_1.ApiTags)('Associations'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token de acceso ausente, inválido, expirado o revocado.',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'El usuario no tiene rol o alcance sobre la asociación.',
    }),
    (0, swagger_1.ApiExtraModels)(create_association_dto_1.CreateAssociationDto, update_association_dto_1.UpdateAssociationDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map