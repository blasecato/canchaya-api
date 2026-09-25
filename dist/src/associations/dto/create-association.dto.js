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
exports.CreateAssociationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
function trimString({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function trimToNull(params) {
    const value = trimString(params);
    return value === '' ? null : value;
}
class CreateAssociationDto {
    name;
    description;
    city;
    address;
    taxId;
    email;
    phone;
    ownerUserId;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 150 }, description: { required: true, type: () => String, maxLength: 2000 }, city: { required: true, type: () => String, maxLength: 120 }, address: { required: true, type: () => String, maxLength: 250 }, taxId: { required: false, type: () => String, nullable: true, maxLength: 50 }, email: { required: false, type: () => String, nullable: true, maxLength: 254, format: "email" }, phone: { required: true, type: () => String, maxLength: 30 }, ownerUserId: { required: true, type: () => String }, status: { required: true, enum: ["active", "inactive"], enum: ['active', 'inactive'] } };
    }
}
exports.CreateAssociationDto = CreateAssociationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liga Distrital de Fútbol' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Organización deportiva regional.' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bogotá' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calle 10 # 20-30' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '900123456-7', nullable: true }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateAssociationDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'contacto@liga.example',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", Object)
], CreateAssociationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+576011234567' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'ID del usuario propietario de la asociación.',
        type: String,
    }),
    (0, class_transformer_1.Transform)(trimString),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "ownerUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'inactive'], example: 'active' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsIn)(['active', 'inactive']),
    __metadata("design:type", String)
], CreateAssociationDto.prototype, "status", void 0);
//# sourceMappingURL=create-association.dto.js.map