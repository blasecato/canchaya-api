"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FairPlayModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const competition_access_module_1 = require("../authorization/competition-access.module");
const fair_play_controller_1 = require("./fair-play.controller");
const fair_play_service_1 = require("./fair-play.service");
let FairPlayModule = class FairPlayModule {
};
exports.FairPlayModule = FairPlayModule;
exports.FairPlayModule = FairPlayModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, competition_access_module_1.CompetitionAccessModule],
        controllers: [fair_play_controller_1.FairPlayController],
        providers: [fair_play_service_1.FairPlayService],
        exports: [fair_play_service_1.FairPlayService],
    })
], FairPlayModule);
//# sourceMappingURL=fair-play.module.js.map