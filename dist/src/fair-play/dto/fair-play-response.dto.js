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
exports.FairPlayResponseDto = exports.FairPlayTeamDto = exports.FairPlayPlayerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class FairPlayPlayerDto {
    playerId;
    playerName;
    yellowCards;
    redCards;
    static _OPENAPI_METADATA_FACTORY() {
        return { playerId: { required: true, type: () => String }, playerName: { required: true, type: () => String }, yellowCards: { required: true, type: () => Number }, redCards: { required: true, type: () => Number } };
    }
}
exports.FairPlayPlayerDto = FairPlayPlayerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9' }),
    __metadata("design:type", String)
], FairPlayPlayerDto.prototype, "playerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    __metadata("design:type", String)
], FairPlayPlayerDto.prototype, "playerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], FairPlayPlayerDto.prototype, "yellowCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FairPlayPlayerDto.prototype, "redCards", void 0);
class FairPlayTeamDto {
    position;
    teamId;
    teamName;
    photoUrl;
    matchesPlayed;
    yellowCards;
    redCards;
    totalCards;
    fairPlayPoints;
    pointsPerMatch;
    disciplinaryCards;
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { position: { required: true, type: () => Number }, teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, photoUrl: { required: true, type: () => String, nullable: true }, matchesPlayed: { required: true, type: () => Number }, yellowCards: { required: true, type: () => Number }, redCards: { required: true, type: () => Number }, totalCards: { required: true, type: () => Number }, fairPlayPoints: { required: true, type: () => Number }, pointsPerMatch: { required: true, type: () => Number }, disciplinaryCards: { required: true, type: () => Number }, players: { required: true, type: () => [require("./fair-play-response.dto").FairPlayPlayerDto] } };
    }
}
exports.FairPlayTeamDto = FairPlayTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7' }),
    __metadata("design:type", String)
], FairPlayTeamDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Atlético Pitalito' }),
    __metadata("design:type", String)
], FairPlayTeamDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], FairPlayTeamDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8, description: 'Partidos jugados del calendario vigente.' }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "matchesPlayed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11 }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "yellowCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "redCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 13, description: 'Amonestaciones totales: amarillas + rojas.' }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "totalCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 17,
        description: 'Puntos de juego limpio: menos puntos es mejor.',
    }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "fairPlayPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.13, description: 'Puntos por partido jugado.' }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "pointsPerMatch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Tarjetas registradas en informes arbitrales. Se muestran aparte y no suman al puntaje.',
    }),
    __metadata("design:type", Number)
], FairPlayTeamDto.prototype, "disciplinaryCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FairPlayPlayerDto, isArray: true }),
    __metadata("design:type", Array)
], FairPlayTeamDto.prototype, "players", void 0);
class FairPlayResponseDto {
    tournamentId;
    yellowCardPoints;
    redCardPoints;
    totalYellowCards;
    totalRedCards;
    teams;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, yellowCardPoints: { required: true, type: () => Number }, redCardPoints: { required: true, type: () => Number }, totalYellowCards: { required: true, type: () => Number }, totalRedCards: { required: true, type: () => Number }, teams: { required: true, type: () => [require("./fair-play-response.dto").FairPlayTeamDto] } };
    }
}
exports.FairPlayResponseDto = FairPlayResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    __metadata("design:type", String)
], FairPlayResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Puntos que suma una tarjeta amarilla.' }),
    __metadata("design:type", Number)
], FairPlayResponseDto.prototype, "yellowCardPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Puntos que suma una tarjeta roja.' }),
    __metadata("design:type", Number)
], FairPlayResponseDto.prototype, "redCardPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 42 }),
    __metadata("design:type", Number)
], FairPlayResponseDto.prototype, "totalYellowCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], FairPlayResponseDto.prototype, "totalRedCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FairPlayTeamDto, isArray: true }),
    __metadata("design:type", Array)
], FairPlayResponseDto.prototype, "teams", void 0);
//# sourceMappingURL=fair-play-response.dto.js.map