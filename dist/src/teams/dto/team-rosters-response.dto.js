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
exports.TeamRostersResponseDto = exports.TeamTournamentRosterResponseDto = exports.TeamRosterPlayerResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class TeamRosterPlayerResponseDto {
    id;
    fullName;
    photoUrl;
    jerseyNumber;
    position;
    isCaptain;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, photoUrl: { required: true, type: () => String, nullable: true }, jerseyNumber: { required: true, type: () => Number, nullable: true }, position: { required: true, type: () => String, nullable: true }, isCaptain: { required: true, type: () => Boolean } };
    }
}
exports.TeamRosterPlayerResponseDto = TeamRosterPlayerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12', type: String }),
    __metadata("design:type", String)
], TeamRosterPlayerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alejandro Acevedo' }),
    __metadata("design:type", String)
], TeamRosterPlayerResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/users/player.webp', nullable: true }),
    __metadata("design:type", Object)
], TeamRosterPlayerResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Object)
], TeamRosterPlayerResponseDto.prototype, "jerseyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delantero', nullable: true }),
    __metadata("design:type", Object)
], TeamRosterPlayerResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TeamRosterPlayerResponseDto.prototype, "isCaptain", void 0);
class TeamTournamentRosterResponseDto {
    tournamentId;
    tournamentName;
    phase;
    minPlayers;
    maxPlayers;
    canEdit;
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, tournamentName: { required: true, type: () => String }, phase: { required: true, type: () => String }, minPlayers: { required: true, type: () => Number }, maxPlayers: { required: true, type: () => Number }, canEdit: { required: true, type: () => Boolean }, players: { required: true, type: () => [require("./team-rosters-response.dto").TeamRosterPlayerResponseDto] } };
    }
}
exports.TeamTournamentRosterResponseDto = TeamTournamentRosterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], TeamTournamentRosterResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa Regional' }),
    __metadata("design:type", String)
], TeamTournamentRosterResponseDto.prototype, "tournamentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'in_progress' }),
    __metadata("design:type", String)
], TeamTournamentRosterResponseDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], TeamTournamentRosterResponseDto.prototype, "minPlayers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], TeamTournamentRosterResponseDto.prototype, "maxPlayers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TeamTournamentRosterResponseDto.prototype, "canEdit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TeamRosterPlayerResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TeamTournamentRosterResponseDto.prototype, "players", void 0);
class TeamRostersResponseDto {
    teamId;
    canManageMembers;
    tournaments;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, canManageMembers: { required: true, type: () => Boolean }, tournaments: { required: true, type: () => [require("./team-rosters-response.dto").TeamTournamentRosterResponseDto] } };
    }
}
exports.TeamRostersResponseDto = TeamRostersResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    __metadata("design:type", String)
], TeamRostersResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TeamRostersResponseDto.prototype, "canManageMembers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TeamTournamentRosterResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TeamRostersResponseDto.prototype, "tournaments", void 0);
//# sourceMappingURL=team-rosters-response.dto.js.map