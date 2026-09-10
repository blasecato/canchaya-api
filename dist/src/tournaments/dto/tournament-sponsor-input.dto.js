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
exports.TournamentSponsorsInputDto = exports.TournamentSponsorInputDto = exports.TOURNAMENT_SPONSOR_STATUSES = exports.SPONSOR_CONTRIBUTION_TYPES = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
exports.SPONSOR_CONTRIBUTION_TYPES = [
    'money',
    'products',
    'services',
    'mixed',
];
exports.TOURNAMENT_SPONSOR_STATUSES = [
    'active',
    'inactive',
    'completed',
    'cancelled',
];
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
const nullableString = ({ value }) => {
    if (typeof value !== 'string')
        return value;
    const normalized = value.trim();
    return normalized === '' ? null : normalized;
};
const nullableNumber = ({ value }) => {
    if (value === '' || value === null || value === undefined)
        return null;
    return typeof value === 'string' ? Number(value) : value;
};
class TournamentSponsorInputDto {
    sponsorId;
    name;
    taxId;
    contactName;
    email;
    phone;
    websiteUrl;
    logoUrl;
    logoFileIndex;
    sponsorshipLevel;
    contributionType;
    contributionAmount;
    contributionCurrencyCode;
    contributionDescription;
    agreementStartDate;
    agreementEndDate;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { sponsorId: { required: false, type: () => String }, name: { required: true, type: () => String, maxLength: 160 }, taxId: { required: false, type: () => String, nullable: true, maxLength: 80 }, contactName: { required: false, type: () => String, nullable: true, maxLength: 160 }, email: { required: false, type: () => String, nullable: true, maxLength: 254, format: "email" }, phone: { required: false, type: () => String, nullable: true, maxLength: 40 }, websiteUrl: { required: false, type: () => String, nullable: true, maxLength: 2048, format: "uri" }, logoUrl: { required: false, type: () => String, nullable: true, maxLength: 2048, format: "uri" }, logoFileIndex: { required: false, type: () => Number, minimum: 0 }, sponsorshipLevel: { required: false, type: () => String, nullable: true, maxLength: 80 }, contributionType: { required: false, enum: ["mixed", "money", "products", "services"], enum: exports.SPONSOR_CONTRIBUTION_TYPES }, contributionAmount: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 999999999999.99 }, contributionCurrencyCode: { required: false, type: () => String, minLength: 3, maxLength: 3 }, contributionDescription: { required: false, type: () => String, nullable: true, maxLength: 2000 }, agreementStartDate: { required: false, type: () => String, nullable: true }, agreementEndDate: { required: false, type: () => String, nullable: true }, status: { required: false, enum: ["active", "inactive", "completed", "cancelled"], enum: exports.TOURNAMENT_SPONSOR_STATUSES } };
    }
}
exports.TournamentSponsorInputDto = TournamentSponsorInputDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3', type: String }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], TournamentSponsorInputDto.prototype, "sponsorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportes Andinos', maxLength: 160 }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], TournamentSponsorInputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '900123456-7', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Laura Gómez', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'contacto@patrocinador.co', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+57 300 123 4567', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://patrocinador.co', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.example.com/logo.png',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Índice del archivo en sponsorLogos cuando el sponsor viene anidado en un formulario de torneo.',
        minimum: 0,
    }),
    (0, class_transformer_1.Transform)(nullableNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TournamentSponsorInputDto.prototype, "logoFileIndex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Oro', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "sponsorshipLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.SPONSOR_CONTRIBUTION_TYPES, default: 'money' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.SPONSOR_CONTRIBUTION_TYPES),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "contributionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000000, nullable: true, minimum: 0 }),
    (0, class_transformer_1.Transform)(nullableNumber),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "contributionAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'COP', default: 'COP' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 3),
    __metadata("design:type", String)
], TournamentSponsorInputDto.prototype, "contributionCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, maxLength: 2000 }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "contributionDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-08-01', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "agreementStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-01', nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "agreementEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.TOURNAMENT_SPONSOR_STATUSES, default: 'active' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(exports.TOURNAMENT_SPONSOR_STATUSES),
    __metadata("design:type", Object)
], TournamentSponsorInputDto.prototype, "status", void 0);
function parseSponsors({ value }) {
    if (typeof value !== 'string')
        return value;
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed)
            ? (0, class_transformer_1.plainToInstance)(TournamentSponsorInputDto, parsed)
            : parsed;
    }
    catch {
        throw new common_1.BadRequestException('La colección de patrocinadores no tiene un formato JSON válido.');
    }
}
class TournamentSponsorsInputDto {
    sponsors;
    static _OPENAPI_METADATA_FACTORY() {
        return { sponsors: { required: false, type: () => [require("./tournament-sponsor-input.dto").TournamentSponsorInputDto] } };
    }
}
exports.TournamentSponsorsInputDto = TournamentSponsorsInputDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: TournamentSponsorInputDto, isArray: true }),
    (0, class_transformer_1.Transform)(parseSponsors),
    (0, class_transformer_1.Type)(() => TournamentSponsorInputDto),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], TournamentSponsorsInputDto.prototype, "sponsors", void 0);
//# sourceMappingURL=tournament-sponsor-input.dto.js.map