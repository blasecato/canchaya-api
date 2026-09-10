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
exports.CreateRefereeAvailabilityDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRefereeAvailabilityDto {
    startsAt;
    endsAt;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { startsAt: { required: true, type: () => String }, endsAt: { required: true, type: () => String }, notes: { required: false, type: () => String, maxLength: 500 } };
    }
}
exports.CreateRefereeAvailabilityDto = CreateRefereeAvailabilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-10T18:00:00.000Z' }),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreateRefereeAvailabilityDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-10T23:00:00.000Z' }),
    (0, class_validator_1.IsDateString)({ strict: true, strictSeparator: true }),
    __metadata("design:type", String)
], CreateRefereeAvailabilityDto.prototype, "endsAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Disponible en Pitalito y alrededores.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateRefereeAvailabilityDto.prototype, "notes", void 0);
//# sourceMappingURL=create-referee-availability.dto.js.map