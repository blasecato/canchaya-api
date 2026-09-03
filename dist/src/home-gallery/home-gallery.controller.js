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
exports.HomeGalleryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const uploads_constants_1 = require("../uploads/uploads.constants");
const home_gallery_service_1 = require("./home-gallery.service");
const galleryFieldNames = [
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
];
const galleryUploadOptions = {
    limits: {
        files: 5,
        fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES,
        fields: 0,
        parts: 5,
    },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('La galería solamente admite imágenes JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let HomeGalleryController = class HomeGalleryController {
    homeGalleryService;
    constructor(homeGalleryService) {
        this.homeGalleryService = homeGalleryService;
    }
    findAll() {
        return this.homeGalleryService.findAll();
    }
    replace(files) {
        const galleryFiles = files ?? {};
        const uploads = galleryFieldNames.flatMap((fieldName, index) => {
            const file = galleryFiles[fieldName]?.[0];
            return file ? [{ slot: index + 1, file }] : [];
        });
        if (uploads.length === 0) {
            throw new common_1.BadRequestException('Selecciona al menos una imagen para actualizar la galería.');
        }
        return this.homeGalleryService.replace(uploads);
    }
};
exports.HomeGalleryController = HomeGalleryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar las cinco imágenes de la galería' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Galería pública de cinco posiciones.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeGalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(galleryFieldNames.map((name) => ({ name, maxCount: 1 })), galleryUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: Object.fromEntries(galleryFieldNames.map((name) => [
                name,
                { type: 'string', format: 'binary' },
            ])),
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Reemplazar cualquier subconjunto de la galería',
        description: 'Solo SUPER_ADMIN. Las posiciones omitidas permanecen sin cambios y nunca se eliminan slots.',
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomeGalleryController.prototype, "replace", null);
exports.HomeGalleryController = HomeGalleryController = __decorate([
    (0, swagger_1.ApiTags)('Home gallery'),
    (0, common_1.Controller)('home-gallery'),
    __metadata("design:paramtypes", [home_gallery_service_1.HomeGalleryService])
], HomeGalleryController);
//# sourceMappingURL=home-gallery.controller.js.map