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
exports.RosterImportResultDto = exports.RosterImportTeamResultDto = exports.RosterImportPlayerResultDto = exports.ROSTER_TEAM_OUTCOMES = exports.ROSTER_PLAYER_OUTCOMES = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
exports.ROSTER_PLAYER_OUTCOMES = [
    'created',
    'linked',
    'already_in_team',
    'rejected',
];
exports.ROSTER_TEAM_OUTCOMES = [
    'team_created',
    'team_registered',
    'roster_updated',
    'rejected',
];
class RosterImportPlayerResultDto {
    row;
    fullName;
    documentType;
    idNumber;
    email;
    position;
    jerseyNumber;
    isCaptain;
    outcome;
    detail;
    static _OPENAPI_METADATA_FACTORY() {
        return { row: { required: true, type: () => Number }, fullName: { required: true, type: () => String }, documentType: { required: true, type: () => String }, idNumber: { required: true, type: () => String }, email: { required: true, type: () => String }, position: { required: true, type: () => String, nullable: true }, jerseyNumber: { required: true, type: () => Number, nullable: true }, isCaptain: { required: true, type: () => Boolean }, outcome: { required: true, enum: ["created", "linked", "already_in_team", "rejected"] }, detail: { required: true, type: () => String } };
    }
}
exports.RosterImportPlayerResultDto = RosterImportPlayerResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4 }),
    __metadata("design:type", Number)
], RosterImportPlayerResultDto.prototype, "row", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María Pérez' }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CC' }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1020304050' }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria.perez@correo.com' }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delantero', nullable: true }),
    __metadata("design:type", Object)
], RosterImportPlayerResultDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Object)
], RosterImportPlayerResultDto.prototype, "jerseyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], RosterImportPlayerResultDto.prototype, "isCaptain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.ROSTER_PLAYER_OUTCOMES }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "outcome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ya tenía cuenta en la plataforma; quedó en el equipo y en el torneo.',
    }),
    __metadata("design:type", String)
], RosterImportPlayerResultDto.prototype, "detail", void 0);
class RosterImportTeamResultDto {
    sheetName;
    teamName;
    teamId;
    outcome;
    detail;
    playersCreated;
    playersLinked;
    playersRejected;
    rosterSize;
    players;
    static _OPENAPI_METADATA_FACTORY() {
        return { sheetName: { required: true, type: () => String }, teamName: { required: true, type: () => String }, teamId: { required: false, type: () => String, nullable: true }, outcome: { required: true, enum: ["rejected", "team_created", "team_registered", "roster_updated"] }, detail: { required: true, type: () => String }, playersCreated: { required: true, type: () => Number }, playersLinked: { required: true, type: () => Number }, playersRejected: { required: true, type: () => Number }, rosterSize: { required: true, type: () => Number }, players: { required: true, type: () => [require("./roster-import-result.dto").RosterImportPlayerResultDto] } };
    }
}
exports.RosterImportTeamResultDto = RosterImportTeamResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Pitalito' }),
    __metadata("design:type", String)
], RosterImportTeamResultDto.prototype, "sheetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportivo Pitalito' }),
    __metadata("design:type", String)
], RosterImportTeamResultDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12' }),
    __metadata("design:type", Object)
], RosterImportTeamResultDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.ROSTER_TEAM_OUTCOMES }),
    __metadata("design:type", String)
], RosterImportTeamResultDto.prototype, "outcome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Equipo creado e inscrito con 12 jugadores.',
        description: 'Resumen en lenguaje claro de lo que pasó con la hoja.',
    }),
    __metadata("design:type", String)
], RosterImportTeamResultDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9 }),
    __metadata("design:type", Number)
], RosterImportTeamResultDto.prototype, "playersCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], RosterImportTeamResultDto.prototype, "playersLinked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], RosterImportTeamResultDto.prototype, "playersRejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Jugadores del equipo en el torneo.' }),
    __metadata("design:type", Number)
], RosterImportTeamResultDto.prototype, "rosterSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RosterImportPlayerResultDto, isArray: true }),
    __metadata("design:type", Array)
], RosterImportTeamResultDto.prototype, "players", void 0);
class RosterImportResultDto {
    tournamentId;
    sheetsReceived;
    teamsImported;
    teamsRejected;
    playersCreated;
    playersLinked;
    playersRejected;
    availableSlots;
    temporaryPassword;
    teams;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, sheetsReceived: { required: true, type: () => Number }, teamsImported: { required: true, type: () => Number }, teamsRejected: { required: true, type: () => Number }, playersCreated: { required: true, type: () => Number }, playersLinked: { required: true, type: () => Number }, playersRejected: { required: true, type: () => Number }, availableSlots: { required: true, type: () => Number }, temporaryPassword: { required: true, type: () => String, nullable: true }, teams: { required: true, type: () => [require("./roster-import-result.dto").RosterImportTeamResultDto] } };
    }
}
exports.RosterImportResultDto = RosterImportResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    __metadata("design:type", String)
], RosterImportResultDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "sheetsReceived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "teamsImported", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "teamsRejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 96 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "playersCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "playersLinked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "playersRejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Cupos de equipos que quedan libres.' }),
    __metadata("design:type", Number)
], RosterImportResultDto.prototype, "availableSlots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        example: 'Asprofutpi2026*',
        description: 'Clave temporal de las cuentas nuevas. Llega vacía si no se creó ninguna.',
    }),
    __metadata("design:type", Object)
], RosterImportResultDto.prototype, "temporaryPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RosterImportTeamResultDto, isArray: true }),
    __metadata("design:type", Array)
], RosterImportResultDto.prototype, "teams", void 0);
//# sourceMappingURL=roster-import-result.dto.js.map