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
exports.AssociationTournamentResponseDto = exports.TournamentSponsorResponseDto = exports.AssociationTournamentTypeResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const tournament_category_constants_1 = require("../../tournaments/tournament-category.constants");
class AssociationTournamentTypeResponseDto {
    id;
    name;
    description;
    minPlayersPerTeam;
    maxPlayersPerTeam;
    instructions;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, minPlayersPerTeam: { required: true, type: () => Number }, maxPlayersPerTeam: { required: true, type: () => Number }, instructions: { required: true, type: () => String, nullable: true } };
    }
}
exports.AssociationTournamentTypeResponseDto = AssociationTournamentTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], AssociationTournamentTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Eliminación directa' }),
    __metadata("design:type", String)
], AssociationTournamentTypeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Los equipos compiten en llaves de eliminación directa.',
        nullable: true,
    }),
    __metadata("design:type", Object)
], AssociationTournamentTypeResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, minimum: 1 }),
    __metadata("design:type", Number)
], AssociationTournamentTypeResponseDto.prototype, "minPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14, minimum: 1 }),
    __metadata("design:type", Number)
], AssociationTournamentTypeResponseDto.prototype, "maxPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cada llave se juega a partido único.',
        nullable: true,
    }),
    __metadata("design:type", Object)
], AssociationTournamentTypeResponseDto.prototype, "instructions", void 0);
class TournamentSponsorResponseDto {
    sponsorId;
    name;
    taxId;
    contactName;
    email;
    phone;
    websiteUrl;
    logoUrl;
    sponsorshipLevel;
    contributionType;
    contributionAmount;
    contributionCurrencyCode;
    contributionDescription;
    agreementStartDate;
    agreementEndDate;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { sponsorId: { required: true, type: () => String }, name: { required: true, type: () => String }, taxId: { required: true, type: () => String, nullable: true }, contactName: { required: true, type: () => String, nullable: true }, email: { required: true, type: () => String, nullable: true }, phone: { required: true, type: () => String, nullable: true }, websiteUrl: { required: true, type: () => String, nullable: true }, logoUrl: { required: true, type: () => String, nullable: true }, sponsorshipLevel: { required: true, type: () => String, nullable: true }, contributionType: { required: true, enum: ["mixed", "money", "products", "services"] }, contributionAmount: { required: true, type: () => String, nullable: true }, contributionCurrencyCode: { required: true, type: () => String }, contributionDescription: { required: true, type: () => String, nullable: true }, agreementStartDate: { required: true, type: () => String, nullable: true }, agreementEndDate: { required: true, type: () => String, nullable: true }, status: { required: true, enum: ["active", "inactive", "completed", "cancelled"] } };
    }
}
exports.TournamentSponsorResponseDto = TournamentSponsorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3', type: String }),
    __metadata("design:type", String)
], TournamentSponsorResponseDto.prototype, "sponsorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deportes Andinos' }),
    __metadata("design:type", String)
], TournamentSponsorResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '900123456-7', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laura Gómez', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contacto@patrocinador.co', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+57 300 123 4567', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://patrocinador.co', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "websiteUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.example.com/logo.png', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Oro', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "sponsorshipLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['money', 'products', 'services', 'mixed'] }),
    __metadata("design:type", String)
], TournamentSponsorResponseDto.prototype, "contributionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000000.00', nullable: true, type: String }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "contributionAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP' }),
    __metadata("design:type", String)
], TournamentSponsorResponseDto.prototype, "contributionCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "contributionDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-01', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "agreementStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-01', nullable: true }),
    __metadata("design:type", Object)
], TournamentSponsorResponseDto.prototype, "agreementEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'inactive', 'completed', 'cancelled'] }),
    __metadata("design:type", String)
], TournamentSponsorResponseDto.prototype, "status", void 0);
class AssociationTournamentResponseDto {
    id;
    associationId;
    name;
    description;
    tournamentType;
    sportType;
    modality;
    categoryName;
    categoryMinAge;
    categoryMaxAge;
    categoryGender;
    startDate;
    endDate;
    registrationStartDate;
    registrationEndDate;
    registrationFee;
    currencyCode;
    grandPrize;
    secondPrize;
    thirdPrize;
    maxTeams;
    minPlayersPerTeam;
    maxPlayersPerTeam;
    registeredTeamCount;
    locationName;
    locationAddress;
    rulesUrl;
    rulesContent;
    photoUrl;
    sponsors;
    phase;
    status;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, associationId: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, tournamentType: { required: true, type: () => require("./association-tournament-response.dto").AssociationTournamentTypeResponseDto }, sportType: { required: true, type: () => String }, modality: { required: true, type: () => String }, categoryName: { required: true, type: () => String }, categoryMinAge: { required: true, type: () => Number, nullable: true }, categoryMaxAge: { required: true, type: () => Number, nullable: true }, categoryGender: { required: true, enum: ["male", "female", "open", "mixed"] }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String, nullable: true }, registrationStartDate: { required: true, type: () => String, nullable: true }, registrationEndDate: { required: true, type: () => String, nullable: true }, registrationFee: { required: true, type: () => String }, currencyCode: { required: true, type: () => String }, grandPrize: { required: true, type: () => String }, secondPrize: { required: true, type: () => String }, thirdPrize: { required: true, type: () => String }, maxTeams: { required: true, type: () => Number }, minPlayersPerTeam: { required: true, type: () => Number }, maxPlayersPerTeam: { required: true, type: () => Number }, registeredTeamCount: { required: true, type: () => Number }, locationName: { required: true, type: () => String, nullable: true }, locationAddress: { required: true, type: () => String, nullable: true }, rulesUrl: { required: true, type: () => String, nullable: true }, rulesContent: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, sponsors: { required: true, type: () => [require("./association-tournament-response.dto").TournamentSponsorResponseDto] }, phase: { required: true, enum: ["cancelled", "draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived"] }, status: { required: true, enum: ["active", "inactive"] }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } };
    }
}
exports.AssociationTournamentResponseDto = AssociationTournamentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "associationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copa CanchaYa 2026' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Torneo regional de fútbol.', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AssociationTournamentTypeResponseDto }),
    __metadata("design:type", AssociationTournamentTypeResponseDto)
], AssociationTournamentResponseDto.prototype, "tournamentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'football' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "sportType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11v11' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sub-15' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "categoryMinAge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "categoryMaxAge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: tournament_category_constants_1.TOURNAMENT_CATEGORY_GENDERS, example: 'male' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "categoryGender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-01', format: 'date' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-01', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-01', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "registrationStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-25', format: 'date', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "registrationEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '150000.00', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "registrationFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COP', minLength: 3, maxLength: 3 }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "currencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000000.00', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "grandPrize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2500000.00', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "secondPrize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1000000.00', type: String }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "thirdPrize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16, minimum: 2 }),
    __metadata("design:type", Number)
], AssociationTournamentResponseDto.prototype, "maxTeams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, minimum: 1 }),
    __metadata("design:type", Number)
], AssociationTournamentResponseDto.prototype, "minPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, minimum: 1 }),
    __metadata("design:type", Number)
], AssociationTournamentResponseDto.prototype, "maxPlayersPerTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8, minimum: 0 }),
    __metadata("design:type", Number)
], AssociationTournamentResponseDto.prototype, "registeredTeamCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Estadio Municipal', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Carrera 5 # 10-20', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "locationAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/rules.pdf', nullable: true }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "rulesUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
        nullable: true,
        description: 'Reglamento enriquecido sanitizado en formato HTML.',
    }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "rulesContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/tournament.png',
        nullable: true,
    }),
    __metadata("design:type", Object)
], AssociationTournamentResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentSponsorResponseDto, isArray: true }),
    __metadata("design:type", Array)
], AssociationTournamentResponseDto.prototype, "sponsors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'draft',
            'registration',
            'validation',
            'scheduled',
            'in_progress',
            'finished',
            'archived',
            'cancelled',
        ],
        example: 'registration',
    }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "phase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'inactive'], example: 'active' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' }),
    __metadata("design:type", String)
], AssociationTournamentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=association-tournament-response.dto.js.map