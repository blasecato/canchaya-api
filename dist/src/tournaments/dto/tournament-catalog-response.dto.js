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
exports.TournamentCatalogFiltersResponseDto = exports.TournamentCatalogFilterOptionDto = exports.TournamentCatalogPageResponseDto = exports.TournamentRulesResponseDto = exports.TournamentDetailResponseDto = exports.TournamentStandingResponseDto = exports.TournamentScorerResponseDto = exports.TournamentCatalogItemResponseDto = exports.TournamentCatalogAssociationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const association_tournament_response_dto_1 = require("../../associations/dto/association-tournament-response.dto");
class TournamentCatalogAssociationDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.TournamentCatalogAssociationDto = TournamentCatalogAssociationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], TournamentCatalogAssociationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liga Deportiva Laboyana' }),
    __metadata("design:type", String)
], TournamentCatalogAssociationDto.prototype, "name", void 0);
class TournamentCatalogItemResponseDto extends association_tournament_response_dto_1.AssociationTournamentResponseDto {
    association;
    canManage;
    static _OPENAPI_METADATA_FACTORY() {
        return { association: { required: true, type: () => require("./tournament-catalog-response.dto").TournamentCatalogAssociationDto }, canManage: { required: true, type: () => Boolean } };
    }
}
exports.TournamentCatalogItemResponseDto = TournamentCatalogItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentCatalogAssociationDto }),
    __metadata("design:type", TournamentCatalogAssociationDto)
], TournamentCatalogItemResponseDto.prototype, "association", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si el usuario autenticado puede administrar este torneo.',
    }),
    __metadata("design:type", Boolean)
], TournamentCatalogItemResponseDto.prototype, "canManage", void 0);
class TournamentScorerResponseDto {
    id;
    name;
    team;
    goals;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, team: { required: true, type: () => String }, goals: { required: true, type: () => Number } };
    }
}
exports.TournamentScorerResponseDto = TournamentScorerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '21', type: String }),
    __metadata("design:type", String)
], TournamentScorerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Julián Ramírez' }),
    __metadata("design:type", String)
], TournamentScorerResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Galácticos FC' }),
    __metadata("design:type", String)
], TournamentScorerResponseDto.prototype, "team", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentScorerResponseDto.prototype, "goals", void 0);
class TournamentStandingResponseDto {
    teamId;
    teamName;
    primaryColor;
    played;
    wins;
    draws;
    losses;
    goalsFor;
    goalsAgainst;
    points;
    static _OPENAPI_METADATA_FACTORY() {
        return { teamId: { required: true, type: () => String }, teamName: { required: true, type: () => String }, primaryColor: { required: true, type: () => String, nullable: true }, played: { required: true, type: () => Number }, wins: { required: true, type: () => Number }, draws: { required: true, type: () => Number }, losses: { required: true, type: () => Number }, goalsFor: { required: true, type: () => Number }, goalsAgainst: { required: true, type: () => Number }, points: { required: true, type: () => Number } };
    }
}
exports.TournamentStandingResponseDto = TournamentStandingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', type: String }),
    __metadata("design:type", String)
], TournamentStandingResponseDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Galácticos FC' }),
    __metadata("design:type", String)
], TournamentStandingResponseDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FFC400', nullable: true }),
    __metadata("design:type", Object)
], TournamentStandingResponseDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "played", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "wins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "draws", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "losses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "goalsFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "goalsAgainst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 13, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentStandingResponseDto.prototype, "points", void 0);
class TournamentDetailResponseDto extends TournamentCatalogItemResponseDto {
    scorers;
    standings;
    matchesPlayed;
    totalGoals;
    static _OPENAPI_METADATA_FACTORY() {
        return { scorers: { required: true, type: () => [require("./tournament-catalog-response.dto").TournamentScorerResponseDto] }, standings: { required: true, type: () => [require("./tournament-catalog-response.dto").TournamentStandingResponseDto] }, matchesPlayed: { required: true, type: () => Number }, totalGoals: { required: true, type: () => Number } };
    }
}
exports.TournamentDetailResponseDto = TournamentDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentScorerResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentDetailResponseDto.prototype, "scorers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentStandingResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentDetailResponseDto.prototype, "standings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentDetailResponseDto.prototype, "matchesPlayed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 68, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentDetailResponseDto.prototype, "totalGoals", void 0);
class TournamentRulesResponseDto {
    id;
    rulesContent;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, rulesContent: { required: true, type: () => String, nullable: true } };
    }
}
exports.TournamentRulesResponseDto = TournamentRulesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12', type: String }),
    __metadata("design:type", String)
], TournamentRulesResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TournamentRulesResponseDto.prototype, "rulesContent", void 0);
class TournamentCatalogPageResponseDto {
    items;
    page;
    pageSize;
    total;
    hasNextPage;
    static _OPENAPI_METADATA_FACTORY() {
        return { items: { required: true, type: () => [require("./tournament-catalog-response.dto").TournamentCatalogItemResponseDto] }, page: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, total: { required: true, type: () => Number }, hasNextPage: { required: true, type: () => Boolean } };
    }
}
exports.TournamentCatalogPageResponseDto = TournamentCatalogPageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentCatalogItemResponseDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentCatalogPageResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, minimum: 1 }),
    __metadata("design:type", Number)
], TournamentCatalogPageResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, minimum: 1, maximum: 10 }),
    __metadata("design:type", Number)
], TournamentCatalogPageResponseDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, minimum: 0 }),
    __metadata("design:type", Number)
], TournamentCatalogPageResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TournamentCatalogPageResponseDto.prototype, "hasNextPage", void 0);
class TournamentCatalogFilterOptionDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.TournamentCatalogFilterOptionDto = TournamentCatalogFilterOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', type: String }),
    __metadata("design:type", String)
], TournamentCatalogFilterOptionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liga Deportiva Laboyana' }),
    __metadata("design:type", String)
], TournamentCatalogFilterOptionDto.prototype, "name", void 0);
class TournamentCatalogFiltersResponseDto {
    associations;
    categories;
    static _OPENAPI_METADATA_FACTORY() {
        return { associations: { required: true, type: () => [require("./tournament-catalog-response.dto").TournamentCatalogFilterOptionDto] }, categories: { required: true, type: () => [require("./tournament-catalog-response.dto").TournamentCatalogFilterOptionDto] } };
    }
}
exports.TournamentCatalogFiltersResponseDto = TournamentCatalogFiltersResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentCatalogFilterOptionDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentCatalogFiltersResponseDto.prototype, "associations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TournamentCatalogFilterOptionDto, isArray: true }),
    __metadata("design:type", Array)
], TournamentCatalogFiltersResponseDto.prototype, "categories", void 0);
//# sourceMappingURL=tournament-catalog-response.dto.js.map