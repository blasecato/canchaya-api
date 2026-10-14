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
exports.AddTeamsResultDto = exports.RejectedTeamDto = exports.AddedTeamDto = exports.AddTeamsToTournamentDto = exports.MAX_TEAMS_PER_BATCH = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
exports.MAX_TEAMS_PER_BATCH = 50;
class AddTeamsToTournamentDto {
    teamIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamIds: { required: true, type: () => [String], minItems: 1 } };
    }
}
exports.AddTeamsToTournamentDto = AddTeamsToTournamentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true, example: ['3', '7'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(exports.MAX_TEAMS_PER_BATCH, {
        message: `Puedes agregar máximo ${exports.MAX_TEAMS_PER_BATCH} equipos a la vez.`,
    }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AddTeamsToTournamentDto.prototype, "teamIds", void 0);
class AddedTeamDto {
    teamId;
    teamName;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String } };
    }
}
exports.AddedTeamDto = AddedTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3' }),
    __metadata("design:type", String)
], AddedTeamDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Galácticos FC' }),
    __metadata("design:type", String)
], AddedTeamDto.prototype, "teamName", void 0);
class RejectedTeamDto {
    teamId;
    teamName;
    reason;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, reason: { required: true, type: () => String } };
    }
}
exports.RejectedTeamDto = RejectedTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    __metadata("design:type", String)
], RejectedTeamDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Vereda FC' }),
    __metadata("design:type", String)
], RejectedTeamDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dos jugadores superan la edad máxima de la categoría.',
    }),
    __metadata("design:type", String)
], RejectedTeamDto.prototype, "reason", void 0);
class AddTeamsResultDto {
    added;
    rejected;
    availableSlots;
    static _OPENAPI_METADATA_FACTORY() {
        return { added: { required: true, type: () => [require("./add-teams.dto").AddedTeamDto] }, rejected: { required: true, type: () => [require("./add-teams.dto").RejectedTeamDto] }, availableSlots: { required: true, type: () => Number } };
    }
}
exports.AddTeamsResultDto = AddTeamsResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: AddedTeamDto, isArray: true }),
    __metadata("design:type", Array)
], AddTeamsResultDto.prototype, "added", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RejectedTeamDto, isArray: true }),
    __metadata("design:type", Array)
], AddTeamsResultDto.prototype, "rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Cupos libres después de agregar.' }),
    __metadata("design:type", Number)
], AddTeamsResultDto.prototype, "availableSlots", void 0);
//# sourceMappingURL=add-teams.dto.js.map