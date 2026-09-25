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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const allow_blocked_user_decorator_1 = require("../auth/decorators/allow-blocked-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const create_user_dto_1 = require("./dto/create-user.dto");
const export_administrators_query_dto_1 = require("./dto/export-administrators-query.dto");
const list_administrators_query_dto_1 = require("./dto/list-administrators-query.dto");
const register_player_dto_1 = require("./dto/register-player.dto");
const public_user_response_dto_1 = require("./dto/public-user-response.dto");
const update_user_profile_dto_1 = require("./dto/update-user-profile.dto");
const users_service_1 = require("./users.service");
const userPhotoUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('La foto de perfil debe ser una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
const profileUpdateBody = {
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(update_user_profile_dto_1.UpdateUserProfileDto) },
            {
                type: 'object',
                properties: {
                    photo: {
                        type: 'string',
                        format: 'binary',
                        description: 'Foto JPEG, PNG o WebP de máximo 2 MB.',
                    },
                },
            },
        ],
    },
};
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async register(dto, uploadedFiles) {
        const files = {
            photo: uploadedFiles.photo?.[0],
            documentFront: uploadedFiles.documentFront?.[0],
            documentBack: uploadedFiles.documentBack?.[0],
        };
        if (!files.photo || !files.documentFront || !files.documentBack) {
            throw new common_1.BadRequestException('La foto de perfil y las dos caras del documento son obligatorias.');
        }
        return this.usersService.registerPlayer(dto, files);
    }
    findAll() {
        return this.usersService.findAll();
    }
    exportAdministrators(query) {
        return this.usersService.exportAdministrators(query);
    }
    findAdministrators(query) {
        return this.usersService.findAdministrators(query);
    }
    findMe(request) {
        return this.usersService.findOne(request.auth.userId);
    }
    updateMe(request, dto, photo) {
        return this.usersService.updateProfile(request.auth.userId, request.auth.userId, dto, photo);
    }
    getIdentityDocument(id, side, request) {
        if (side !== 'front' && side !== 'back') {
            throw new common_1.BadRequestException('El lado del documento debe ser front o back.');
        }
        return this.usersService.getIdentityDocumentDownload(id, request.auth.userId, side);
    }
    findOne(id, request) {
        return this.usersService.findVisibleProfile(id, request.auth.userId);
    }
    update(id, request, dto, photo) {
        return this.usersService.updateProfile(id, request.auth.userId, dto, photo);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un usuario' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Usuario registrado correctamente.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'photo', maxCount: 1 },
        { name: 'documentFront', maxCount: 1 },
        { name: 'documentBack', maxCount: 1 },
    ], {
        limits: {
            files: 3,
            fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
            fields: 9,
        },
        fileFilter: (_request, file, callback) => {
            if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
                callback(new common_1.BadRequestException('Las fotografías deben ser imágenes JPEG, PNG o WebP.'), false);
                return;
            }
            callback(null, true);
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(register_player_dto_1.RegisterPlayerDto) },
                {
                    type: 'object',
                    required: ['photo', 'documentFront', 'documentBack'],
                    properties: {
                        photo: { type: 'string', format: 'binary' },
                        documentFront: { type: 'string', format: 'binary' },
                        documentBack: { type: 'string', format: 'binary' },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar públicamente una cuenta de jugador verificada',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Cuenta de jugador verificada y registrada.',
        type: public_user_response_dto_1.PublicUserResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_player_dto_1.RegisterPlayerDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los usuarios' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado público de usuarios con sus roles.',
        type: public_user_response_dto_1.PublicUserResponseDto,
        isArray: true,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Requiere el rol SUPER_ADMIN.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('administrators/export'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.Header)('Cache-Control', 'private, no-store'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener los datos de contacto exportables de administradores',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado completo, sin paginación, de los administradores que coinciden con los filtros.',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Requiere el rol SUPER_ADMIN.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_administrators_query_dto_1.ExportAdministratorsQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "exportAdministrators", null);
__decorate([
    (0, common_1.Get)('administrators'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar administradores de la plataforma' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado paginado de superadministradores y administradores de asociación.',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Requiere el rol SUPER_ADMIN.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_administrators_query_dto_1.ListAdministratorsQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAdministrators", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, allow_blocked_user_decorator_1.AllowBlockedUser)(),
    (0, common_1.Header)('Cache-Control', 'private, no-store'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar el perfil del usuario autenticado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Perfil público del usuario autenticado.',
        type: public_user_response_dto_1.PublicUserResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Token ausente, inválido, expirado o revocado.',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El usuario no existe.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', userPhotoUploadOptions)),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(profileUpdateBody),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar el perfil del usuario autenticado' }),
    openapi.ApiResponse({ status: 200, type: require("./dto/public-user-response.dto").PublicUserResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_profile_dto_1.UpdateUserProfileDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Get)(':id/identity-documents/:side'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.Header)('Cache-Control', 'private, no-store'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generar acceso temporal a un documento de identidad protegido',
        description: 'La cédula fotografiada es el dato más sensible del perfil, así que solo ' +
            'un superadministrador puede pedir el enlace.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiParam)({ name: 'side', enum: ['front', 'back'] }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Requiere el rol SUPER_ADMIN.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('side')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getIdentityDocument", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un usuario por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuario encontrado.',
        type: public_user_response_dto_1.PublicUserResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El usuario no existe.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Requiere un rol administrativo y acceso al perfil solicitado.',
    }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', userPhotoUploadOptions)),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(profileUpdateBody),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un perfil visible por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario actualizado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El usuario no existe.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Requiere un rol administrativo y acceso al perfil solicitado.',
    }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, update_user_profile_dto_1.UpdateUserProfileDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario eliminado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El usuario no existe.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token de acceso inválido.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Requiere el rol SUPER_ADMIN.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiExtraModels)(update_user_profile_dto_1.UpdateUserProfileDto, register_player_dto_1.RegisterPlayerDto),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map