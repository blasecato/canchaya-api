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
exports.PublicAssociationResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class PublicAssociationResponseDto {
    id;
    name;
    city;
    logoUrl;
    ownerName;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, city: { required: true, type: () => String, nullable: true }, logoUrl: { required: true, type: () => String, nullable: true }, ownerName: { required: true, type: () => String } };
    }
}
exports.PublicAssociationResponseDto = PublicAssociationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", String)
], PublicAssociationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liga Deportiva Laboyana' }),
    __metadata("design:type", String)
], PublicAssociationResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pitalito', nullable: true, type: String }),
    __metadata("design:type", Object)
], PublicAssociationResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], PublicAssociationResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Laura Martínez',
        description: 'Administrador responsable.',
    }),
    __metadata("design:type", String)
], PublicAssociationResponseDto.prototype, "ownerName", void 0);
//# sourceMappingURL=public-association-response.dto.js.map