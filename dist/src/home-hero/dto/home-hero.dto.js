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
exports.HomeHeroSlideResponseDto = exports.UpdateHomeHeroSlideDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
class UpdateHomeHeroSlideDto {
    eyebrow;
    title;
    accentTitle;
    description;
    ctaLabel;
    ctaTo;
    thumbnailTitle;
    static _OPENAPI_METADATA_FACTORY() {
        return { eyebrow: { required: false, type: () => String, maxLength: 90 }, title: { required: false, type: () => String, maxLength: 120 }, accentTitle: { required: false, type: () => String, maxLength: 120 }, description: { required: false, type: () => String, maxLength: 320 }, ctaLabel: { required: false, type: () => String, maxLength: 40 }, ctaTo: { required: false, type: () => String, maxLength: 120, pattern: "^\\/[\\w\\-/]*$" }, thumbnailTitle: { required: false, type: () => String, maxLength: 60 } };
    }
}
exports.UpdateHomeHeroSlideDto = UpdateHomeHeroSlideDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '⚽ La casa del fútbol y más' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(90),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "eyebrow", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Copa' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pitalito' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "accentTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Reúne a tu equipo y compite.' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(320),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ver torneos' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "ctaLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '/tournaments' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    (0, class_validator_1.Matches)(/^\/[\w\-/]*$/, {
        message: 'El enlace debe ser una ruta interna que empiece con "/".',
    }),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "ctaTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Copa Pitalito' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], UpdateHomeHeroSlideDto.prototype, "thumbnailTitle", void 0);
class HomeHeroSlideResponseDto {
    slug;
    position;
    eyebrow;
    title;
    accentTitle;
    description;
    ctaLabel;
    ctaTo;
    thumbnailTitle;
    imageUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { slug: { required: true, type: () => String }, position: { required: true, type: () => Number }, eyebrow: { required: true, type: () => String }, title: { required: true, type: () => String }, accentTitle: { required: true, type: () => String }, description: { required: true, type: () => String }, ctaLabel: { required: true, type: () => String }, ctaTo: { required: true, type: () => String }, thumbnailTitle: { required: true, type: () => String }, imageUrl: { required: true, type: () => String, nullable: true } };
    }
}
exports.HomeHeroSlideResponseDto = HomeHeroSlideResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'copa-pitalito' }),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], HomeHeroSlideResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "eyebrow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "accentTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "ctaLabel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/tournaments' }),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "ctaTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HomeHeroSlideResponseDto.prototype, "thumbnailTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Nula cuando el slide conserva la imagen incluida en la app.',
    }),
    __metadata("design:type", Object)
], HomeHeroSlideResponseDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=home-hero.dto.js.map