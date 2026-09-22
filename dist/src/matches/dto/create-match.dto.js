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
exports.CreateMatchDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateMatchDto {
    tournamentId;
    homeTeamId;
    awayTeamId;
    matchDate;
    venue;
    stage;
    roundNumber;
    homePenalties;
    awayPenalties;
    homeScore;
    awayScore;
    status;
    durationMinutes;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, homeTeamId: { required: true, type: () => String }, awayTeamId: { required: true, type: () => String }, matchDate: { required: false, type: () => String, nullable: true }, venue: { required: false, type: () => String, nullable: true }, stage: { required: true, type: () => String }, roundNumber: { required: false, type: () => Number, nullable: true, minimum: 1, maximum: 2147483647 }, homePenalties: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 1000 }, awayPenalties: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 1000 }, homeScore: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 2147483647 }, awayScore: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 2147483647 }, status: { required: false, type: () => String, enum: ['scheduled', 'in_progress', 'played', 'postponed', 'cancelled'] }, durationMinutes: { required: false, type: () => Number, minimum: 15, maximum: 1440 }, notes: { required: false, type: () => String, nullable: true } };
    }
}
exports.CreateMatchDto = CreateMatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "homeTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "awayTeamId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-09-10T20:00:00.000Z',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "matchDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Estadio Municipal', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'group_stage' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "stage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 1, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "roundNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "homePenalties", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "awayPenalties", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, minimum: 0, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "homeScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 0, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "awayScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'scheduled',
        enum: ['scheduled', 'in_progress', 'played', 'postponed', 'cancelled'],
        default: 'scheduled',
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['scheduled', 'in_progress', 'played', 'postponed', 'cancelled']),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120, minimum: 15, maximum: 1440 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(15),
    (0, class_validator_1.Max)(1440),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Partido de apertura.', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateMatchDto.prototype, "notes", void 0);
//# sourceMappingURL=create-match.dto.js.map