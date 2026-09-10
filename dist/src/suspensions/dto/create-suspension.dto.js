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
exports.CreateSuspensionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateSuspensionDto {
    disciplinaryActionId;
    matchesCount;
    startDate;
    endDate;
    reason;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { disciplinaryActionId: { required: true, type: () => String }, matchesCount: { required: false, type: () => Number, nullable: true, minimum: 1, maximum: 2147483647 }, startDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, endDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, reason: { required: false, type: () => String, nullable: true }, status: { required: false, type: () => String, enum: ['active', 'served', 'revoked'] } };
    }
}
exports.CreateSuspensionDto = CreateSuspensionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateSuspensionDto.prototype, "disciplinaryActionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2,
        minimum: 1,
        nullable: true,
        description: 'Debe enviarse este campo o startDate.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2_147_483_647),
    __metadata("design:type", Object)
], CreateSuspensionDto.prototype, "matchesCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-09-15',
        nullable: true,
        description: 'Debe enviarse este campo o matchesCount.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateSuspensionDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-30', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateSuspensionDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sanción por tarjeta roja.', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSuspensionDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'active',
        enum: ['active', 'served', 'revoked'],
        default: 'active',
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['active', 'served', 'revoked']),
    __metadata("design:type", String)
], CreateSuspensionDto.prototype, "status", void 0);
//# sourceMappingURL=create-suspension.dto.js.map