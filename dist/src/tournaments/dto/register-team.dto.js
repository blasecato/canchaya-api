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
exports.TeamRegistrationResponseDto = exports.CaptainTeamOptionResponseDto = exports.RegisterTeamDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterTeamDto {
    teamId;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String, pattern: "^\\d+$" } };
    }
}
exports.RegisterTeamDto = RegisterTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'El identificador del equipo no es válido.' }),
    __metadata("design:type", String)
], RegisterTeamDto.prototype, "teamId", void 0);
class CaptainTeamOptionResponseDto {
    id;
    name;
    photoUrl;
    memberCount;
    registrationStatus;
    eligible;
    eligibilityMessage;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, photoUrl: { required: true, type: () => String, nullable: true }, memberCount: { required: true, type: () => Number }, registrationStatus: { required: true, type: () => String, nullable: true }, eligible: { required: true, type: () => Boolean }, eligibilityMessage: { required: true, type: () => String, nullable: true } };
    }
}
exports.CaptainTeamOptionResponseDto = CaptainTeamOptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    __metadata("design:type", String)
], CaptainTeamOptionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ladrillera Fútbol Club' }),
    __metadata("design:type", String)
], CaptainTeamOptionResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/teams/team.jpg', nullable: true }),
    __metadata("design:type", Object)
], CaptainTeamOptionResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, minimum: 0 }),
    __metadata("design:type", Number)
], CaptainTeamOptionResponseDto.prototype, "memberCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Object)
], CaptainTeamOptionResponseDto.prototype, "registrationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CaptainTeamOptionResponseDto.prototype, "eligible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Object)
], CaptainTeamOptionResponseDto.prototype, "eligibilityMessage", void 0);
class TeamRegistrationResponseDto {
    tournamentId;
    teamId;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { tournamentId: { required: true, type: () => String }, teamId: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
exports.TeamRegistrationResponseDto = TeamRegistrationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10', type: String }),
    __metadata("design:type", String)
], TeamRegistrationResponseDto.prototype, "tournamentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40', type: String }),
    __metadata("design:type", String)
], TeamRegistrationResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pending' }),
    __metadata("design:type", String)
], TeamRegistrationResponseDto.prototype, "status", void 0);
//# sourceMappingURL=register-team.dto.js.map