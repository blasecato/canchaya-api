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
exports.CreateTournamentDto = exports.TOURNAMENT_STATUSES = exports.TOURNAMENT_PHASES = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
const tournament_sponsor_input_dto_1 = require("./tournament-sponsor-input.dto");
exports.TOURNAMENT_PHASES = [
    'draft',
    'registration',
    'in_progress',
    'finished',
    'cancelled',
];
exports.TOURNAMENT_STATUSES = ['active', 'inactive'];
function trimString({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function trimNullableString({ value }) {
    if (typeof value !== 'string') {
        return value;
    }
    const normalizedValue = value.trim();
    return normalizedValue === '' ? null : normalizedValue;
}
function emptyStringToNull({ value }) {
    return typeof value === 'string' && value.trim() === '' ? null : value;
}
function toNumber({ value }) {
    if (typeof value !== 'string') {
        return value;
    }
    const normalizedValue = value.trim();
    return normalizedValue === '' ? value : Number(normalizedValue);
}
class CreateTournamentDto extends tournament_sponsor_input_dto_1.TournamentSponsorsInputDto {
    name;
    description;
    tournamentTypeId;
    sportType;
    modality;
    startDate;
    endDate;
    registrationStartDate;
    registrationEndDate;
    registrationFee;
    currencyCode;
    grandPrize;
    secondPrize;
    thirdPrize;
    maxTeams;
    minPlayersPerTeam;
    maxPlayersPerTeam;
    locationName;
    locationAddress;
    rulesUrl;
    phase;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 150 }, description: { required: false, type: () => String, nullable: true, maxLength: 2000 }, tournamentTypeId: { required: true, type: () => String }, sportType: { required: true, type: () => String, maxLength: 100 }, modality: { required: true, type: () => String, maxLength: 100 }, startDate: { required: true, type: () => String, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, endDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, registrationStartDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, registrationEndDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, registrationFee: { required: false, type: () => Number, minimum: 0, maximum: 999999999999.99 }, currencyCode: { required: false, type: () => String, minLength: 3, maxLength: 3, pattern: "^[A-Z]{3}$" }, grandPrize: { required: false, type: () => Number, minimum: 0, maximum: 999999999999.99 }, secondPrize: { required: false, type: () => Number, minimum: 0, maximum: 999999999999.99 }, thirdPrize: { required: false, type: () => Number, minimum: 0, maximum: 999999999999.99 }, maxTeams: { required: true, type: () => Number, minimum: 2, maximum: 2147483647 }, minPlayersPerTeam: { required: true, type: () => Number, minimum: 1, maximum: 2147483647 }, maxPlayersPerTeam: { required: true, type: () => Number, minimum: 1, maximum: 2147483647 }, locationName: { required: false, type: () => String, nullable: true, maxLength: 200 }, locationAddress: { required: false, type: () => String, nullable: true, maxLength: 300 }, rulesUrl: { required: false, type: () => String, nullable: true, maxLength: 2048, format: "uri" }, phase: { required: false, enum: ["cancelled", "draft", "registration", "in_progress", "finished"], enum: exports.TOURNAMENT_PHASES }, status: { required: false, enum: ["active", "inactive"], enum: exports.TOURNAMENT_STATUSES } };
    }
}
exports.CreateTournamentDto = CreateTournamentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa CanchaYa 2026', maxLength: 150 }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, maxLength: 2000 }),
    (0, class_transformer_1.Transform)(trimNullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    (0, class_transformer_1.Transform)(trimString),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "tournamentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fútbol', maxLength: 100 }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "sportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fútbol 11', maxLength: 100 }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-01', format: 'date' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-12-01',
        format: 'date',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(emptyStringToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-08-01',
        format: 'date',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(emptyStringToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "registrationStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-08-25',
        format: 'date',
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(emptyStringToNull),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "registrationEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150000, minimum: 0, default: 0 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'COP',
        minLength: 3,
        maxLength: 3,
        default: 'COP',
    }),
    (0, class_transformer_1.Transform)(trimString),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 3),
    (0, class_validator_1.Matches)(/^[A-Z]{3}$/),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000, minimum: 0, default: 0 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "grandPrize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2500000, minimum: 0, default: 0 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "secondPrize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000, minimum: 0, default: 0 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "thirdPrize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16, minimum: 2 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "maxTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, minimum: 1 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "minPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, minimum: 1 }),
    (0, class_transformer_1.Transform)(toNumber),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreateTournamentDto.prototype, "maxPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Estadio Municipal',
        nullable: true,
        maxLength: 200,
    }),
    (0, class_transformer_1.Transform)(trimNullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Carrera 5 # 10-20',
        nullable: true,
        maxLength: 300,
    }),
    (0, class_transformer_1.Transform)(trimNullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "locationAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/rules.pdf',
        nullable: true,
        maxLength: 2048,
    }),
    (0, class_transformer_1.Transform)(trimNullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_valid_protocol: true,
    }),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], CreateTournamentDto.prototype, "rulesUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.TOURNAMENT_PHASES, default: 'draft' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(exports.TOURNAMENT_PHASES),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: exports.TOURNAMENT_STATUSES, default: 'active' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(exports.TOURNAMENT_STATUSES),
    __metadata("design:type", String)
], CreateTournamentDto.prototype, "status", void 0);
//# sourceMappingURL=create-tournament.dto.js.map