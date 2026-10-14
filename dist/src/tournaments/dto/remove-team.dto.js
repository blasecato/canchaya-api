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
exports.RemoveTeamFromTournamentResultDto = exports.RemoveTeamFromTournamentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RemoveTeamFromTournamentDto {
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { reason: { required: false, type: () => String, maxLength: 500 } };
    }
}
exports.RemoveTeamFromTournamentDto = RemoveTeamFromTournamentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Se inscribió por error en esta categoría.',
        description: 'Motivo que se le informa al capitán del equipo.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], RemoveTeamFromTournamentDto.prototype, "reason", void 0);
class RemoveTeamFromTournamentResultDto {
    teamId;
    teamName;
    removedMatches;
    removedPlayers;
    availableSlots;
    freedDrawSlot;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, removedMatches: { required: true, type: () => Number }, removedPlayers: { required: true, type: () => Number }, availableSlots: { required: true, type: () => Number }, freedDrawSlot: { required: true, type: () => Boolean } };
    }
}
exports.RemoveTeamFromTournamentResultDto = RemoveTeamFromTournamentResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    __metadata("design:type", String)
], RemoveTeamFromTournamentResultDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Pitalito' }),
    __metadata("design:type", String)
], RemoveTeamFromTournamentResultDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Partidos programados que se eliminaron.' }),
    __metadata("design:type", Number)
], RemoveTeamFromTournamentResultDto.prototype, "removedMatches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Jugadores que salieron de la plantilla.' }),
    __metadata("design:type", Number)
], RemoveTeamFromTournamentResultDto.prototype, "removedPlayers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Cupos libres después de sacarlo.' }),
    __metadata("design:type", Number)
], RemoveTeamFromTournamentResultDto.prototype, "availableSlots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Si el equipo ocupaba un lugar del sorteo, quedó libre.',
    }),
    __metadata("design:type", Boolean)
], RemoveTeamFromTournamentResultDto.prototype, "freedDrawSlot", void 0);
//# sourceMappingURL=remove-team.dto.js.map