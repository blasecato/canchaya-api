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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicTournamentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const list_tournaments_query_dto_1 = require("./dto/list-tournaments-query.dto");
const tournament_catalog_response_dto_1 = require("./dto/tournament-catalog-response.dto");
const tournaments_service_1 = require("./tournaments.service");
let PublicTournamentsController = class PublicTournamentsController {
    tournamentsService;
    constructor(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    findActive() {
        return this.tournamentsService.findFeaturedActive();
    }
    findStats() {
        return this.tournamentsService.findPublicStats();
    }
    findCatalogFilters() {
        return this.tournamentsService.findCatalogFilterOptions();
    }
    findCatalog(query) {
        return this.tournamentsService.findCatalog(query);
    }
};
exports.PublicTournamentsController = PublicTournamentsController;
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar los seis torneos activos más recientes para el inicio',
    }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogItemResponseDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicTournamentsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar estadísticas públicas del inicio' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicTournamentsController.prototype, "findStats", null);
__decorate([
    (0, common_1.Get)('catalog/filters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Consultar filtros públicos del catálogo de torneos',
    }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogFiltersResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicTournamentsController.prototype, "findCatalogFilters", null);
__decorate([
    (0, common_1.Get)('catalog'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar torneos públicos activos con filtros y paginación',
    }),
    (0, swagger_1.ApiOkResponse)({ type: tournament_catalog_response_dto_1.TournamentCatalogPageResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_tournaments_query_dto_1.ListTournamentsQueryDto]),
    __metadata("design:returntype", Promise)
], PublicTournamentsController.prototype, "findCatalog", null);
exports.PublicTournamentsController = PublicTournamentsController = __decorate([
    (0, swagger_1.ApiTags)('Public tournaments'),
    (0, common_1.Controller)('public/tournaments'),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], PublicTournamentsController);
//# sourceMappingURL=public-tournaments.controller.js.map