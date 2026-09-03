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
exports.TournamentTypeResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class TournamentTypeResponseDto {
    id;
    name;
    description;
    minPlayersPerTeam;
    maxPlayersPerTeam;
    instructions;
    tournamentCount;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, minPlayersPerTeam: { required: true, type: () => Number }, maxPlayersPerTeam: { required: true, type: () => Number }, instructions: { required: true, type: () => String, nullable: true }, tournamentCount: { required: true, type: () => Number }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
}
exports.TournamentTypeResponseDto = TournamentTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], TournamentTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Eliminación directa' }),
    __metadata("design:type", String)
], TournamentTypeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], TournamentTypeResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], TournamentTypeResponseDto.prototype, "minPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], TournamentTypeResponseDto.prototype, "maxPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], TournamentTypeResponseDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], TournamentTypeResponseDto.prototype, "tournamentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], TournamentTypeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], TournamentTypeResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=tournament-type-response.dto.js.map