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
exports.CreatePlayerMatchStatDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreatePlayerMatchStatDto {
    matchId;
    tournamentId;
    teamId;
    playerId;
    goals;
    assists;
    yellowCards;
    redCards;
    minutesPlayed;
    static _OPENAPI_METADATA_FACTORY() {
        return { matchId: { required: true, type: () => String }, tournamentId: { required: true, type: () => String }, teamId: { required: true, type: () => String }, playerId: { required: true, type: () => String }, goals: { required: false, type: () => Number, minimum: 0, maximum: 2147483647 }, assists: { required: false, type: () => Number, minimum: 0, maximum: 2147483647 }, yellowCards: { required: false, type: () => Number, minimum: 0, maximum: 2147483647 }, redCards: { required: false, type: () => Number, minimum: 0, maximum: 2147483647 }, minutesPlayed: { required: false, type: () => Number, minimum: 0, maximum: 2147483647 } };
    }
}
exports.CreatePlayerMatchStatDto = CreatePlayerMatchStatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreatePlayerMatchStatDto.prototype, "matchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreatePlayerMatchStatDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreatePlayerMatchStatDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '42' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreatePlayerMatchStatDto.prototype, "playerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, minimum: 0, default: 0 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreatePlayerMatchStatDto.prototype, "goals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 0, default: 0 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreatePlayerMatchStatDto.prototype, "assists", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 0, default: 0 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreatePlayerMatchStatDto.prototype, "yellowCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, minimum: 0, default: 0 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreatePlayerMatchStatDto.prototype, "redCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 90, minimum: 0, default: 0 }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Number)
], CreatePlayerMatchStatDto.prototype, "minutesPlayed", void 0);
//# sourceMappingURL=create-player-match-stat.dto.js.map