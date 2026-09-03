"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const associations_module_1 = require("./associations/associations.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const disciplinary_actions_module_1 = require("./disciplinary-actions/disciplinary-actions.module");
const fines_module_1 = require("./fines/fines.module");
const home_gallery_module_1 = require("./home-gallery/home-gallery.module");
const matches_module_1 = require("./matches/matches.module");
const notifications_module_1 = require("./notifications/notifications.module");
const player_match_stats_module_1 = require("./player-match-stats/player-match-stats.module");
const players_module_1 = require("./players/players.module");
const prisma_module_1 = require("./prisma/prisma.module");
const referees_module_1 = require("./referees/referees.module");
const roles_module_1 = require("./roles/roles.module");
const sponsors_module_1 = require("./sponsors/sponsors.module");
const suspensions_module_1 = require("./suspensions/suspensions.module");
const teams_module_1 = require("./teams/teams.module");
const tournament_types_module_1 = require("./tournament-types/tournament-types.module");
const tournaments_module_1 = require("./tournaments/tournaments.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ cache: true, isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
            associations_module_1.AssociationsModule,
            tournament_types_module_1.TournamentTypesModule,
            tournaments_module_1.TournamentsModule,
            teams_module_1.TeamsModule,
            matches_module_1.MatchesModule,
            notifications_module_1.NotificationsModule,
            player_match_stats_module_1.PlayerMatchStatsModule,
            players_module_1.PlayersModule,
            referees_module_1.RefereesModule,
            disciplinary_actions_module_1.DisciplinaryActionsModule,
            fines_module_1.FinesModule,
            home_gallery_module_1.HomeGalleryModule,
            suspensions_module_1.SuspensionsModule,
            sponsors_module_1.SponsorsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map