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
exports.SponsorsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const require_roles_decorator_1 = require("../auth/decorators/require-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const parse_big_int_pipe_1 = require("../common/pipes/parse-big-int.pipe");
const uploads_constants_1 = require("../uploads/uploads.constants");
const create_sponsor_dto_1 = require("./dto/create-sponsor.dto");
const update_sponsor_dto_1 = require("./dto/update-sponsor.dto");
const sponsors_service_1 = require("./sponsors.service");
const sponsorLogoUploadOptions = {
    limits: { files: 1, fileSize: uploads_constants_1.MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
    fileFilter: (_request, file, callback) => {
        if (!uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('El logo debe ser una imagen JPEG, PNG o WebP.'), false);
            return;
        }
        callback(null, true);
    },
};
let SponsorsController = class SponsorsController {
    sponsorsService;
    constructor(sponsorsService) {
        this.sponsorsService = sponsorsService;
    }
    create(createSponsorDto, logo) {
        return this.sponsorsService.create(createSponsorDto, logo);
    }
    findAll() {
        return this.sponsorsService.findAll();
    }
    findOne(id) {
        return this.sponsorsService.findOne(id);
    }
    update(id, updateSponsorDto, logo) {
        return this.sponsorsService.update(id, updateSponsorDto, logo);
    }
    remove(id) {
        return this.sponsorsService.remove(id);
    }
};
exports.SponsorsController = SponsorsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', sponsorLogoUploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(create_sponsor_dto_1.CreateSponsorDto) },
                {
                    type: 'object',
                    properties: { logo: { type: 'string', format: 'binary' } },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un patrocinador' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Patrocinador registrado correctamente.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sponsor_dto_1.CreateSponsorDto, Object]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los patrocinadores' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de patrocinadores.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un patrocinador por ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Patrocinador encontrado.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Patrocinador no encontrado.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', sponsorLogoUploadOptions)),
    (0, swagger_1.ApiConsumes)('application/json', 'multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un patrocinador' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Patrocinador actualizado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Patrocinador no encontrado.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, update_sponsor_dto_1.UpdateSponsorDto, Object]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '1', type: String }),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un patrocinador' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Patrocinador eliminado correctamente.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Patrocinador no encontrado.' }),
    __param(0, (0, common_1.Param)('id', parse_big_int_pipe_1.ParseBigIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], SponsorsController.prototype, "remove", null);
exports.SponsorsController = SponsorsController = __decorate([
    (0, swagger_1.ApiTags)('Sponsors'),
    (0, swagger_1.ApiExtraModels)(create_sponsor_dto_1.CreateSponsorDto, update_sponsor_dto_1.UpdateSponsorDto),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)('SUPER_ADMIN', 'ASSOCIATION_ADMIN'),
    (0, common_1.Controller)('sponsors'),
    __metadata("design:paramtypes", [sponsors_service_1.SponsorsService])
], SponsorsController);
//# sourceMappingURL=sponsors.controller.js.map