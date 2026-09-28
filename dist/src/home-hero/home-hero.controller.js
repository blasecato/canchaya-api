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
exports.HomeHeroController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const uploads_constants_1 = require("../uploads/uploads.constants");
const home_hero_dto_1 = require("./dto/home-hero.dto");
const home_hero_service_1 = require("./home-hero.service");
const slideUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('El slider solamente admite imágenes JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let HomeHeroController = class HomeHeroController {
    homeHeroService;
    constructor(homeHeroService) {
        this.homeHeroService = homeHeroService;
    }
    findAll() {
        return this.homeHeroService.findAll();
    }
    update(slug, request, dto, image) {
        return this.homeHeroService.update(slug, dto, request.auth.userId, image);
    }
};
exports.HomeHeroController = HomeHeroController;
__decorate([
    (0, common_1.Get)('public/home/hero-slides'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar los slides del carrusel de inicio' }),
    (0, swagger_1.ApiOkResponse)({ type: home_hero_dto_1.HomeHeroSlideResponseDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeHeroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('home/hero-slides/:slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', slideUploadOptions)),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: '#/components/schemas/UpdateHomeHeroSlideDto' },
                {
                    type: 'object',
                    properties: {
                        image: { type: 'string', format: 'binary' },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Editar un slide del carrusel de inicio' }),
    (0, swagger_1.ApiOkResponse)({ type: home_hero_dto_1.HomeHeroSlideResponseDto, isArray: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'El slide indicado no existe.' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, home_hero_dto_1.UpdateHomeHeroSlideDto, Object]),
    __metadata("design:returntype", Promise)
], HomeHeroController.prototype, "update", null);
exports.HomeHeroController = HomeHeroController = __decorate([
    (0, swagger_1.ApiTags)('Home hero'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [home_hero_service_1.HomeHeroService])
], HomeHeroController);
//# sourceMappingURL=home-hero.controller.js.map