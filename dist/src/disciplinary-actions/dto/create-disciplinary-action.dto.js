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
exports.CreateDisciplinaryActionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateDisciplinaryActionDto {
    tournamentId;
    matchId;
    teamId;
    playerId;
    cardType;
    reason;
    occurredAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, matchId: { required: false, type: () => String, nullable: true }, teamId: { required: true, type: () => String }, playerId: { required: true, type: () => String }, cardType: { required: false, type: () => String, enum: ['none', 'yellow', 'double_yellow', 'red'] }, reason: { required: true, type: () => String }, occurredAt: { required: false, type: () => String } };
    }
}
exports.CreateDisciplinaryActionDto = CreateDisciplinaryActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '25', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", Object)
], CreateDisciplinaryActionDto.prototype, "matchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '42' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "playerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'yellow',
        enum: ['none', 'yellow', 'double_yellow', 'red'],
        default: 'none',
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['none', 'yellow', 'double_yellow', 'red']),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Conducta antideportiva.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-10T21:35:00.000Z' }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreateDisciplinaryActionDto.prototype, "occurredAt", void 0);
//# sourceMappingURL=create-disciplinary-action.dto.js.map