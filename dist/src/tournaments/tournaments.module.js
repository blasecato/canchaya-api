"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsModule = void 0;
const common_1 = require("@nestjs/common");
const associations_module_1 = require("../associations/associations.module");
const auth_module_1 = require("../auth/auth.module");
const uploads_module_1 = require("../uploads/uploads.module");
const tournament_catalog_controller_1 = require("./tournament-catalog.controller");
const public_tournaments_controller_1 = require("./public-tournaments.controller");
const tournaments_controller_1 = require("./tournaments.controller");
const tournaments_service_1 = require("./tournaments.service");
let TournamentsModule = class TournamentsModule {
};
exports.TournamentsModule = TournamentsModule;
exports.TournamentsModule = TournamentsModule = __decorate([
    (0, common_1.Module)({
        imports: [associations_module_1.AssociationsModule, auth_module_1.AuthModule, uploads_module_1.UploadsModule],
        controllers: [
            public_tournaments_controller_1.PublicTournamentsController,
            tournament_catalog_controller_1.TournamentCatalogController,
            tournaments_controller_1.TournamentsController,
        ],
        providers: [tournaments_service_1.TournamentsService],
        exports: [tournaments_service_1.TournamentsService],
    })
], TournamentsModule);
//# sourceMappingURL=tournaments.module.js.map