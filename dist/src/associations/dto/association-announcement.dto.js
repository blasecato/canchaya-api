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
exports.PublicAssociationAnnouncementResponseDto = exports.AssociationAnnouncementResponseDto = exports.ASSOCIATION_ANNOUNCEMENT_VISIBILITIES = exports.ListAssociationAnnouncementsQueryDto = exports.ASSOCIATION_ANNOUNCEMENT_SCOPES = exports.UpdateAssociationAnnouncementDto = exports.CreateAssociationAnnouncementDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ANNOUNCEMENT_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
function trimString({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function trimToNull(params) {
    const value = trimString(params);
    return value === '' ? null : value;
}
function toOptionalNumber(params) {
    const value = trimToNull(params);
    if (value === null || value === undefined)
        return null;
    if (typeof value === 'number')
        return value;
    if (typeof value !== 'string')
        return value;
    const parsed = Number(value.replace(/[\s.]/g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : value;
}
const MAX_ANNOUNCEMENT_AMOUNT = 999999999999;
class CreateAssociationAnnouncementDto {
    title;
    description;
    startsOn;
    endsOn;
    contactPhone;
    address;
    registrationFee;
    registrationStartsOn;
    tournamentStartsOn;
    firstPlacePrize;
    secondPlacePrize;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String, nullable: true, maxLength: 160 }, description: { required: false, type: () => String, nullable: true, maxLength: 1200 }, startsOn: { required: true, type: () => String }, endsOn: { required: true, type: () => String }, contactPhone: { required: false, type: () => String, nullable: true, maxLength: 30, pattern: "^[0-9+()\\s-]{7,30}$" }, address: { required: false, type: () => String, nullable: true, maxLength: 180 }, registrationFee: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: MAX_ANNOUNCEMENT_AMOUNT }, registrationStartsOn: { required: false, type: () => String, nullable: true }, tournamentStartsOn: { required: false, type: () => String, nullable: true }, firstPlacePrize: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: MAX_ANNOUNCEMENT_AMOUNT }, secondPlacePrize: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: MAX_ANNOUNCEMENT_AMOUNT } };
    }
}
exports.CreateAssociationAnnouncementDto = CreateAssociationAnnouncementDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'Muy pronto: Copa Regional 2027',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'Prepárate para una nueva temporada. Próximamente más información.',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1200),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-10-01', format: 'date' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(ANNOUNCEMENT_DATE_PATTERN, {
        message: 'La fecha inicial debe tener formato AAAA-MM-DD.',
    }),
    __metadata("design:type", String)
], CreateAssociationAnnouncementDto.prototype, "startsOn", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-10-31', format: 'date' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(ANNOUNCEMENT_DATE_PATTERN, {
        message: 'La fecha final debe tener formato AAAA-MM-DD.',
    }),
    __metadata("design:type", String)
], CreateAssociationAnnouncementDto.prototype, "endsOn", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '+57 320 000 0000', nullable: true }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/^[0-9+()\s-]{7,30}$/, {
        message: 'El número de contacto no es válido.',
    }),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Cra 5 #12-34, Neiva', nullable: true }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(180),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "address", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 150000, nullable: true }),
    (0, class_transformer_1.Transform)(toOptionalNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(MAX_ANNOUNCEMENT_AMOUNT),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '2026-10-05',
        format: 'date',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(ANNOUNCEMENT_DATE_PATTERN, {
        message: 'La fecha de inicio de inscripciones debe tener formato AAAA-MM-DD.',
    }),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "registrationStartsOn", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '2026-11-01',
        format: 'date',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(trimToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(ANNOUNCEMENT_DATE_PATTERN, {
        message: 'La fecha de inicio del torneo debe tener formato AAAA-MM-DD.',
    }),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "tournamentStartsOn", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 2000000, nullable: true }),
    (0, class_transformer_1.Transform)(toOptionalNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(MAX_ANNOUNCEMENT_AMOUNT),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "firstPlacePrize", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 1000000, nullable: true }),
    (0, class_transformer_1.Transform)(toOptionalNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(MAX_ANNOUNCEMENT_AMOUNT),
    __metadata("design:type", Object)
], CreateAssociationAnnouncementDto.prototype, "secondPlacePrize", void 0);
class UpdateAssociationAnnouncementDto extends (0, swagger_1.PartialType)(CreateAssociationAnnouncementDto, { skipNullProperties: false }) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAssociationAnnouncementDto = UpdateAssociationAnnouncementDto;
exports.ASSOCIATION_ANNOUNCEMENT_SCOPES = [
    'visible',
    'management',
];
class ListAssociationAnnouncementsQueryDto {
    scope;
    static _OPENAPI_METADATA_FACTORY() {
        return { scope: { required: false, enum: ["management", "visible"], enum: exports.ASSOCIATION_ANNOUNCEMENT_SCOPES } };
    }
}
exports.ListAssociationAnnouncementsQueryDto = ListAssociationAnnouncementsQueryDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        enum: exports.ASSOCIATION_ANNOUNCEMENT_SCOPES,
        default: 'visible',
    }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.ASSOCIATION_ANNOUNCEMENT_SCOPES),
    __metadata("design:type", String)
], ListAssociationAnnouncementsQueryDto.prototype, "scope", void 0);
exports.ASSOCIATION_ANNOUNCEMENT_VISIBILITIES = [
    'scheduled',
    'visible',
    'expired',
];
class AssociationAnnouncementResponseDto {
    id;
    associationId;
    title;
    description;
    imageUrl;
    startsOn;
    endsOn;
    contactPhone;
    address;
    registrationFee;
    registrationStartsOn;
    tournamentStartsOn;
    firstPlacePrize;
    secondPlacePrize;
    visibility;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, associationId: { required: true, type: () => String }, title: { required: true, type: () => String, nullable: true }, description: { required: true, type: () => String, nullable: true }, imageUrl: { required: true, type: () => String }, startsOn: { required: true, type: () => String }, endsOn: { required: true, type: () => String }, contactPhone: { required: true, type: () => String, nullable: true }, address: { required: true, type: () => String, nullable: true }, registrationFee: { required: true, type: () => Number, nullable: true }, registrationStartsOn: { required: true, type: () => String, nullable: true }, tournamentStartsOn: { required: true, type: () => String, nullable: true }, firstPlacePrize: { required: true, type: () => Number, nullable: true }, secondPlacePrize: { required: true, type: () => Number, nullable: true }, visibility: { required: true, enum: ["scheduled", "visible", "expired"] }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
}
exports.AssociationAnnouncementResponseDto = AssociationAnnouncementResponseDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: '18', type: String }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "associationId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'Muy pronto: Copa Regional 2027',
        nullable: true,
    }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'https://cdn.example.com/flyer.jpg' }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-10-01', format: 'date' }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "startsOn", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-10-31', format: 'date' }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "endsOn", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 150000, nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-10-05', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "registrationStartsOn", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-11-01', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "tournamentStartsOn", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 2000000, nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "firstPlacePrize", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 1000000, nullable: true }),
    __metadata("design:type", Object)
], AssociationAnnouncementResponseDto.prototype, "secondPlacePrize", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ enum: exports.ASSOCIATION_ANNOUNCEMENT_VISIBILITIES }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-09-24T15:00:00.000Z' }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: '2026-09-24T15:00:00.000Z' }),
    __metadata("design:type", String)
], AssociationAnnouncementResponseDto.prototype, "updatedAt", void 0);
class PublicAssociationAnnouncementResponseDto extends AssociationAnnouncementResponseDto {
    associationName;
    associationCity;
    associationLogoUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { associationName: { required: true, type: () => String }, associationCity: { required: true, type: () => String }, associationLogoUrl: { required: true, type: () => String, nullable: true } };
    }
}
exports.PublicAssociationAnnouncementResponseDto = PublicAssociationAnnouncementResponseDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Organización Deportiva Pitalito' }),
    __metadata("design:type", String)
], PublicAssociationAnnouncementResponseDto.prototype, "associationName", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Pitalito' }),
    __metadata("design:type", String)
], PublicAssociationAnnouncementResponseDto.prototype, "associationCity", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'https://cdn.example.com/organization-logo.png',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PublicAssociationAnnouncementResponseDto.prototype, "associationLogoUrl", void 0);
//# sourceMappingURL=association-announcement.dto.js.map