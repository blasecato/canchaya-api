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
exports.AssociationResponseDto = exports.AssociationOwnerResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class AssociationOwnerResponseDto {
    id;
    fullName;
    email;
    phone;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String, nullable: true } };
    }
}
exports.AssociationOwnerResponseDto = AssociationOwnerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', type: String }),
    __metadata("design:type", String)
], AssociationOwnerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laura Martínez' }),
    __metadata("design:type", String)
], AssociationOwnerResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'laura@example.com', format: 'email' }),
    __metadata("design:type", String)
], AssociationOwnerResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+573001234567', nullable: true }),
    __metadata("design:type", Object)
], AssociationOwnerResponseDto.prototype, "phone", void 0);
class AssociationResponseDto {
    id;
    name;
    description;
    city;
    address;
    taxId;
    email;
    phone;
    logoUrl;
    coverUrl;
    status;
    owner;
    tournamentCount;
    teamCount;
    administratorCount;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, city: { required: true, type: () => String }, address: { required: true, type: () => String, nullable: true }, taxId: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String, nullable: true }, phone: { required: true, type: () => String, nullable: true }, logoUrl: { required: true, type: () => String, nullable: true }, coverUrl: { required: true, type: () => String }, status: { required: true, enum: ["active", "inactive"] }, owner: { required: true, type: () => require("./association-response.dto").AssociationOwnerResponseDto }, tournamentCount: { required: true, type: () => Number }, teamCount: { required: true, type: () => Number }, administratorCount: { required: true, type: () => Number }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
}
exports.AssociationResponseDto = AssociationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liga Distrital de Fútbol' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Asociación deportiva distrital.', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bogotá' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calle 10 # 20-30', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '900123456-7', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contacto@liga.example', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+576011234567', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', nullable: true }),
    __metadata("design:type", Object)
], AssociationResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/cover.png' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "coverUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'inactive'], example: 'active' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AssociationOwnerResponseDto }),
    __metadata("design:type", AssociationOwnerResponseDto)
], AssociationResponseDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, minimum: 0 }),
    __metadata("design:type", Number)
], AssociationResponseDto.prototype, "tournamentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, minimum: 0 }),
    __metadata("design:type", Number)
], AssociationResponseDto.prototype, "teamCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, minimum: 1 }),
    __metadata("design:type", Number)
], AssociationResponseDto.prototype, "administratorCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], AssociationResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=association-response.dto.js.map