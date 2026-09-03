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
exports.CreateFineDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_big_int_string_decorator_1 = require("../../common/decorators/is-big-int-string.decorator");
const is_optional_non_nullable_decorator_1 = require("../../common/decorators/is-optional-non-nullable.decorator");
class CreateFineDto {
    disciplinaryActionId;
    amount;
    currencyCode;
    dueDate;
    paymentStatus;
    paidAt;
    paymentReference;
    notes;
    createdBy;
    static _OPENAPI_METADATA_FACTORY() {
        return { disciplinaryActionId: { required: true, type: () => String }, amount: { required: true, type: () => Number, maximum: 999999999999.99, minimum: 1 }, currencyCode: { required: false, type: () => String, pattern: "^[A-Z]{3}$" }, dueDate: { required: false, type: () => String, nullable: true, pattern: "^\\d{4}-\\d{2}-\\d{2}$" }, paymentStatus: { required: false, type: () => String, enum: ['pending', 'paid', 'waived', 'cancelled'] }, paidAt: { required: false, type: () => String, nullable: true }, paymentReference: { required: false, type: () => String, nullable: true }, notes: { required: false, type: () => String, nullable: true }, createdBy: { required: true, type: () => String } };
    }
}
exports.CreateFineDto = CreateFineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateFineDto.prototype, "disciplinaryActionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000.0, minimum: 0, exclusiveMinimum: true }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], CreateFineDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'COP',
        default: 'COP',
        minLength: 3,
        maxLength: 3,
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.Matches)(/^[A-Z]{3}$/),
    __metadata("design:type", String)
], CreateFineDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-10-01', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateFineDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'pending',
        enum: ['pending', 'paid', 'waived', 'cancelled'],
        default: 'pending',
    }),
    (0, is_optional_non_nullable_decorator_1.IsOptionalNonNullable)(),
    (0, class_validator_1.IsIn)(['pending', 'paid', 'waived', 'cancelled']),
    __metadata("design:type", String)
], CreateFineDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-09-15T14:00:00.000Z',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", Object)
], CreateFineDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'PAY-2026-0001', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateFineDto.prototype, "paymentReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pago por transferencia.', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateFineDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    (0, is_big_int_string_decorator_1.IsBigIntString)(),
    __metadata("design:type", String)
], CreateFineDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-fine.dto.js.map