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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicAssociationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const associations_service_1 = require("./associations.service");
const public_association_response_dto_1 = require("./dto/public-association-response.dto");
let PublicAssociationsController = class PublicAssociationsController {
    associationsService;
    constructor(associationsService) {
        this.associationsService = associationsService;
    }
    findAll() {
        return this.associationsService.findPublicDirectory();
    }
};
exports.PublicAssociationsController = PublicAssociationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar las organizaciones activas para la página pública',
        description: 'Solo expone nombre, ciudad, logo y administrador responsable; nunca datos de contacto.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: public_association_response_dto_1.PublicAssociationResponseDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicAssociationsController.prototype, "findAll", null);
exports.PublicAssociationsController = PublicAssociationsController = __decorate([
    (0, swagger_1.ApiTags)('Public associations'),
    (0, common_1.Controller)('public/associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], PublicAssociationsController);
//# sourceMappingURL=public-associations.controller.js.map