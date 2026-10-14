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
exports.DeletePlayerResultDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class DeletePlayerResultDto {
    id;
    fullName;
    removedTeamMemberships;
    removedTournamentRosters;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, removedTeamMemberships: { required: true, type: () => Number }, removedTournamentRosters: { required: true, type: () => Number } };
    }
}
exports.DeletePlayerResultDto = DeletePlayerResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '42' }),
    __metadata("design:type", String)
], DeletePlayerResultDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    __metadata("design:type", String)
], DeletePlayerResultDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Equipos de los que salió.' }),
    __metadata("design:type", Number)
], DeletePlayerResultDto.prototype, "removedTeamMemberships", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Inscripciones a torneos borradas.' }),
    __metadata("design:type", Number)
], DeletePlayerResultDto.prototype, "removedTournamentRosters", void 0);
//# sourceMappingURL=delete-player-result.dto.js.map