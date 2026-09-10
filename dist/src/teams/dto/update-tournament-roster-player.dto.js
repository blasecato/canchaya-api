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
exports.UpdateTournamentRosterPlayerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const emptyToNull = (value) => {
    if (value === '' || value === null)
        return null;
    return value;
};
class UpdateTournamentRosterPlayerDto {
    jerseyNumber;
    position;
    static _OPENAPI_METADATA_FACTORY() {
        return { jerseyNumber: { required: false, type: () => Number, nullable: true, minimum: 0, maximum: 999 }, position: { required: false, type: () => String, nullable: true, maxLength: 80 } };
    }
}
exports.UpdateTournamentRosterPlayerDto = UpdateTournamentRosterPlayerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        minimum: 0,
        maximum: 999,
        nullable: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        const normalized = emptyToNull(value);
        return normalized === null || normalized === undefined
            ? normalized
            : Number(normalized);
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(999),
    __metadata("design:type", Object)
], UpdateTournamentRosterPlayerDto.prototype, "jerseyNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Delantero', nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value !== 'string')
            return value;
        return value.trim() || null;
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", Object)
], UpdateTournamentRosterPlayerDto.prototype, "position", void 0);
//# sourceMappingURL=update-tournament-roster-player.dto.js.map