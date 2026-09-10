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
exports.UpdateDisciplinaryComplianceDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateDisciplinaryComplianceDto {
    suspensionStatus;
    fineStatus;
    paymentReference;
    notes;
    unblockAccount;
    static _OPENAPI_METADATA_FACTORY() {
        return { suspensionStatus: { required: false, enum: ["served", "revoked"], enum: ['served', 'revoked'] }, fineStatus: { required: false, enum: ["cancelled", "paid", "waived"], enum: ['paid', 'waived', 'cancelled'] }, paymentReference: { required: false, type: () => String, maxLength: 200 }, notes: { required: false, type: () => String, maxLength: 1000 }, unblockAccount: { required: false, type: () => Boolean } };
    }
}
exports.UpdateDisciplinaryComplianceDto = UpdateDisciplinaryComplianceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['served', 'revoked'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['served', 'revoked']),
    __metadata("design:type", String)
], UpdateDisciplinaryComplianceDto.prototype, "suspensionStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['paid', 'waived', 'cancelled'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['paid', 'waived', 'cancelled']),
    __metadata("design:type", String)
], UpdateDisciplinaryComplianceDto.prototype, "fineStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'TRX-2026-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateDisciplinaryComplianceDto.prototype, "paymentReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Medida cumplida y verificada.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateDisciplinaryComplianceDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDisciplinaryComplianceDto.prototype, "unblockAccount", void 0);
//# sourceMappingURL=update-disciplinary-compliance.dto.js.map