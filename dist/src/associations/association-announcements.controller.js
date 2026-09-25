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
exports.AssociationAnnouncementsController = exports.PublicAssociationAnnouncementsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const association_announcements_service_1 = require("./association-announcements.service");
const association_announcement_dto_1 = require("./dto/association-announcement.dto");
const announcementUploadOptions = {
    limits: {
        fields: 20,
        files: 1,
        fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
        parts: 22,
    },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('La publicación debe usar una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let PublicAssociationAnnouncementsController = class PublicAssociationAnnouncementsController {
    announcementsService;
    constructor(announcementsService) {
        this.announcementsService = announcementsService;
    }
    findVisible() {
        return this.announcementsService.findVisibleForHome();
    }
};
exports.PublicAssociationAnnouncementsController = PublicAssociationAnnouncementsController;
__decorate([
    (0, common_1.Get)('visible'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar las publicaciones vigentes para la portada pública',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: association_announcement_dto_1.PublicAssociationAnnouncementResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicAssociationAnnouncementsController.prototype, "findVisible", null);
exports.PublicAssociationAnnouncementsController = PublicAssociationAnnouncementsController = __decorate([
    (0, swagger_1.ApiTags)('Association announcements'),
    (0, common_1.Controller)('association-announcements'),
    __metadata("design:paramtypes", [association_announcements_service_1.AssociationAnnouncementsService])
], PublicAssociationAnnouncementsController);
let AssociationAnnouncementsController = class AssociationAnnouncementsController {
    announcementsService;
    constructor(announcementsService) {
        this.announcementsService = announcementsService;
    }
    findAll(associationId, request, query) {
        return this.announcementsService.findAll(associationId, request.auth.userId, query.scope);
    }
    create(associationId, request, dto, image) {
        if (!image) {
            throw new common_1.BadRequestException('Selecciona la imagen o flyer de la publicación.');
        }
        return this.announcementsService.create(associationId, request.auth.userId, dto, image);
    }
    update(associationId, announcementId, request, dto, image) {
        return this.announcementsService.update(associationId, announcementId, request.auth.userId, dto, image);
    }
    remove(associationId, announcementId, request) {
        return this.announcementsService.remove(associationId, announcementId, request.auth.userId);
    }
};
exports.AssociationAnnouncementsController = AssociationAnnouncementsController;
__decorate([
    (0, common_1.Get)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar publicaciones visibles o administrables de la asociación',
    }),
    (0, swagger_1.ApiOkResponse)({ type: association_announcement_dto_1.AssociationAnnouncementResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, association_announcement_dto_1.ListAssociationAnnouncementsQueryDto]),
    __metadata("design:returntype", void 0)
], AssociationAnnouncementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', announcementUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(association_announcement_dto_1.CreateAssociationAnnouncementDto) },
                {
                    type: 'object',
                    required: ['image'],
                    properties: {
                        image: {
                            type: 'string',
                            format: 'binary',
                            description: 'Flyer JPEG, PNG o WebP de máximo 2 MB.',
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: association_announcement_dto_1.AssociationAnnouncementResponseDto }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, Object, association_announcement_dto_1.CreateAssociationAnnouncementDto, Object]),
    __metadata("design:returntype", void 0)
], AssociationAnnouncementsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':announcementId'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', announcementUploadOptions)),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(association_announcement_dto_1.UpdateAssociationAnnouncementDto) },
                {
                    type: 'object',
                    properties: {
                        image: { type: 'string', format: 'binary' },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOkResponse)({ type: association_announcement_dto_1.AssociationAnnouncementResponseDto }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('announcementId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object, association_announcement_dto_1.UpdateAssociationAnnouncementDto, Object]),
    __metadata("design:returntype", void 0)
], AssociationAnnouncementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':announcementId'),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, swagger_1.ApiOkResponse)({ type: association_announcement_dto_1.AssociationAnnouncementResponseDto }),
    __param(0, (0, common_1.Param)('associationId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Param)('announcementId', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, BigInt, Object]),
    __metadata("design:returntype", void 0)
], AssociationAnnouncementsController.prototype, "remove", null);
exports.AssociationAnnouncementsController = AssociationAnnouncementsController = __decorate([
    (0, swagger_1.ApiTags)('Association announcements'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiExtraModels)(association_announcement_dto_1.CreateAssociationAnnouncementDto, association_announcement_dto_1.UpdateAssociationAnnouncementDto),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('associations/:associationId/announcements'),
    __metadata("design:paramtypes", [association_announcements_service_1.AssociationAnnouncementsService])
], AssociationAnnouncementsController);
//# sourceMappingURL=association-announcements.controller.js.map