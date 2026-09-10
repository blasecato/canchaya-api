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
exports.TeamCarnetsResponseDto = exports.TeamCarnetPlayerResponseDto = exports.TeamCarnetTournamentResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class TeamCarnetTournamentResponseDto {
    id;
    name;
    startDate;
    endDate;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String, nullable: true } };
    }
}
exports.TeamCarnetTournamentResponseDto = TeamCarnetTournamentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7', type: String }),
    __metadata("design:type", String)
], TeamCarnetTournamentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa Relámpago Fútbol 7' }),
    __metadata("design:type", String)
], TeamCarnetTournamentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-26', format: 'date' }),
    __metadata("design:type", String)
], TeamCarnetTournamentResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-10-16', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetTournamentResponseDto.prototype, "endDate", void 0);
class TeamCarnetPlayerResponseDto {
    id;
    fullName;
    idNumber;
    documentType;
    birthDate;
    phone;
    email;
    photoUrl;
    jerseyNumber;
    position;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, idNumber: { required: true, type: () => String }, documentType: { required: true, type: () => String }, birthDate: { required: true, type: () => String }, phone: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String }, photoUrl: { required: true, type: () => String, nullable: true }, jerseyNumber: { required: true, type: () => Number, nullable: true }, position: { required: true, type: () => String, nullable: true } };
    }
}
exports.TeamCarnetPlayerResponseDto = TeamCarnetPlayerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '21', type: String }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Julián Ramírez' }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1023456789' }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CC' }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1999-04-17', format: 'date' }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+57 300 123 4567', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetPlayerResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jugador@canchaya.test' }),
    __metadata("design:type", String)
], TeamCarnetPlayerResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/users/player.webp', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetPlayerResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetPlayerResponseDto.prototype, "jerseyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delantero', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetPlayerResponseDto.prototype, "position", void 0);
class TeamCarnetsResponseDto {
    teamId;
    teamName;
    sportType;
    modality;
    primaryColor;
    secondaryColor;
    photoUrl;
    tournaments;
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, sportType: { required: true, type: () => String }, modality: { required: true, type: () => String }, primaryColor: { required: true, type: () => String, nullable: true }, secondaryColor: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, tournaments: { required: true, type: () => [require("./team-carnets-response.dto").TeamCarnetTournamentResponseDto] }, players: { required: true, type: () => [require("./team-carnets-response.dto").TeamCarnetPlayerResponseDto] } };
    }
}
exports.TeamCarnetsResponseDto = TeamCarnetsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '26', type: String }),
    __metadata("design:type", String)
], TeamCarnetsResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amazonas FC' }),
    __metadata("design:type", String)
], TeamCarnetsResponseDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fútbol' }),
    __metadata("design:type", String)
], TeamCarnetsResponseDto.prototype, "sportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sala' }),
    __metadata("design:type", String)
], TeamCarnetsResponseDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#00994f', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetsResponseDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#f6dc00', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetsResponseDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/teams/team.webp', nullable: true }),
    __metadata("design:type", Object)
], TeamCarnetsResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TeamCarnetTournamentResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TeamCarnetsResponseDto.prototype, "tournaments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TeamCarnetPlayerResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TeamCarnetsResponseDto.prototype, "players", void 0);
//# sourceMappingURL=team-carnets-response.dto.js.map