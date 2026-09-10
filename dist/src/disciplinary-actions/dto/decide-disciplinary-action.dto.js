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
exports.DecideDisciplinaryActionDto = exports.DisciplinaryBlockDecisionDto = exports.DisciplinaryFineDecisionDto = exports.DisciplinarySuspensionDecisionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DisciplinarySuspensionDecisionDto {
    matchesCount;
    startDate;
    endDate;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { matchesCount: { required: false, type: () => Number, minimum: 1, maximum: 100 }, startDate: { required: false, type: () => String }, endDate: { required: false, type: () => String }, reason: { required: false, type: () => String, maxLength: 1000 } };
    }
}
exports.DisciplinarySuspensionDecisionDto = DisciplinarySuspensionDecisionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], DisciplinarySuspensionDecisionDto.prototype, "matchesCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-08' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], DisciplinarySuspensionDecisionDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], DisciplinarySuspensionDecisionDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Conducta antideportiva grave.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], DisciplinarySuspensionDecisionDto.prototype, "reason", void 0);
class DisciplinaryFineDecisionDto {
    amount;
    dueDate;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { amount: { required: true, type: () => Number, maximum: 999999999999.99, minimum: 1 }, dueDate: { required: false, type: () => String }, notes: { required: false, type: () => String, maxLength: 1000 } };
    }
}
exports.DisciplinaryFineDecisionDto = DisciplinaryFineDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(999_999_999_999.99),
    __metadata("design:type", Number)
], DisciplinaryFineDecisionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], DisciplinaryFineDecisionDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Multa reglamentaria.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], DisciplinaryFineDecisionDto.prototype, "notes", void 0);
class DisciplinaryBlockDecisionDto {
    duration;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { duration: { required: true, enum: ["one_week", "one_month", "three_months", "six_months", "nine_months", "one_year"], enum: [
                    'one_week',
                    'one_month',
                    'three_months',
                    'six_months',
                    'nine_months',
                    'one_year',
                ] }, reason: { required: true, type: () => String, maxLength: 1000 } };
    }
}
exports.DisciplinaryBlockDecisionDto = DisciplinaryBlockDecisionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'one_week',
            'one_month',
            'three_months',
            'six_months',
            'nine_months',
            'one_year',
        ],
    }),
    (0, class_validator_1.IsIn)([
        'one_week',
        'one_month',
        'three_months',
        'six_months',
        'nine_months',
        'one_year',
    ]),
    __metadata("design:type", String)
], DisciplinaryBlockDecisionDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bloqueo preventivo por conducta grave.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], DisciplinaryBlockDecisionDto.prototype, "reason", void 0);
class DecideDisciplinaryActionDto {
    decision;
    notes;
    suspension;
    fine;
    block;
    static _OPENAPI_METADATA_FACTORY() {
        return { decision: { required: true, enum: ["approved", "dismissed"], enum: ['approved', 'dismissed'] }, notes: { required: true, type: () => String, maxLength: 2000 }, suspension: { required: false, type: () => require("./decide-disciplinary-action.dto").DisciplinarySuspensionDecisionDto }, fine: { required: false, type: () => require("./decide-disciplinary-action.dto").DisciplinaryFineDecisionDto }, block: { required: false, type: () => require("./decide-disciplinary-action.dto").DisciplinaryBlockDecisionDto } };
    }
}
exports.DecideDisciplinaryActionDto = DecideDisciplinaryActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['approved', 'dismissed'] }),
    (0, class_validator_1.IsIn)(['approved', 'dismissed']),
    __metadata("design:type", String)
], DecideDisciplinaryActionDto.prototype, "decision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Decisión basada en el informe y los antecedentes.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], DecideDisciplinaryActionDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: DisciplinarySuspensionDecisionDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DisciplinarySuspensionDecisionDto),
    __metadata("design:type", DisciplinarySuspensionDecisionDto)
], DecideDisciplinaryActionDto.prototype, "suspension", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: DisciplinaryFineDecisionDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DisciplinaryFineDecisionDto),
    __metadata("design:type", DisciplinaryFineDecisionDto)
], DecideDisciplinaryActionDto.prototype, "fine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: DisciplinaryBlockDecisionDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DisciplinaryBlockDecisionDto),
    __metadata("design:type", DisciplinaryBlockDecisionDto)
], DecideDisciplinaryActionDto.prototype, "block", void 0);
//# sourceMappingURL=decide-disciplinary-action.dto.js.map