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
exports.CreateSponsorDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateSponsorDto {
    name;
    taxId;
    contactName;
    email;
    phone;
    websiteUrl;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, taxId: { required: false, type: () => String, nullable: true }, contactName: { required: false, type: () => String, nullable: true }, email: { required: false, type: () => String, nullable: true, format: "email" }, phone: { required: false, type: () => String, nullable: true }, websiteUrl: { required: false, type: () => String, nullable: true, format: "uri" }, status: { required: false, type: () => String, enum: ['active', 'inactive'] } };
    }
}
exports.CreateSponsorDto = CreateSponsorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportes Colombia' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSponsorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '900123456-7', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSponsorDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Laura Gómez', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSponsorDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'contacto@deportes.co', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreateSponsorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+57 300 123 4567', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSponsorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://deportes.co', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_protocol: true }),
    __metadata("design:type", Object)
], CreateSponsorDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'active',
        enum: ['active', 'inactive'],
        default: 'active',
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['active', 'inactive']),
    __metadata("design:type", String)
], CreateSponsorDto.prototype, "status", void 0);
//# sourceMappingURL=create-sponsor.dto.js.map