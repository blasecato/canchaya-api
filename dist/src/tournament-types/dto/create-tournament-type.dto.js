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
exports.CreateTournamentTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trim = ({ value }) => typeof value === 'string' ? value.trim() : value;
const nullableString = ({ value }) => {
    if (typeof value !== 'string')
        return value;
    const normalized = value.trim();
    return normalized === '' ? null : normalized;
};
class CreateTournamentTypeDto {
    name;
    description;
    minPlayersPerTeam;
    maxPlayersPerTeam;
    instructions;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 120 }, description: { required: false, type: () => String, nullable: true, maxLength: 1000 }, minPlayersPerTeam: { required: true, type: () => Number, minimum: 1, maximum: 100 }, maxPlayersPerTeam: { required: true, type: () => Number, minimum: 1, maximum: 100 }, instructions: { required: false, type: () => String, nullable: true, maxLength: 10000 } };
    }
}
exports.CreateTournamentTypeDto = CreateTournamentTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Eliminación directa' }),
    (0, class_transformer_1.Transform)(trim),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateTournamentTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", Object)
], CreateTournamentTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, minimum: 1, maximum: 100 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTournamentTypeDto.prototype, "minPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14, minimum: 1, maximum: 100 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTournamentTypeDto.prototype, "maxPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, maxLength: 10000 }),
    (0, class_transformer_1.Transform)(nullableString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10000),
    __metadata("design:type", Object)
], CreateTournamentTypeDto.prototype, "instructions", void 0);
//# sourceMappingURL=create-tournament-type.dto.js.map