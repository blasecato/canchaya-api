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
exports.TransitionTournamentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const tournament_lifecycle_constants_1 = require("../tournament-lifecycle.constants");
const trimString = ({ value }) => typeof value === 'string' ? value.trim() : value;
class TransitionTournamentDto {
    phase;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { phase: { required: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"], enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES }, reason: { required: false, type: () => String, maxLength: 1000 } };
    }
}
exports.TransitionTournamentDto = TransitionTournamentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_lifecycle_constants_1.TOURNAMENT_PHASES, example: 'registration' }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsIn)(tournament_lifecycle_constants_1.TOURNAMENT_PHASES),
    __metadata("design:type", String)
], TransitionTournamentDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'El evento no continuará por falta de escenario.',
        maxLength: 1000,
    }),
    (0, class_transformer_1.Transform)(trimString),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], TransitionTournamentDto.prototype, "reason", void 0);
//# sourceMappingURL=transition-tournament.dto.js.map