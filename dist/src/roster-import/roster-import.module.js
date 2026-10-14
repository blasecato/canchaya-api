"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RosterImportModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const competition_access_module_1 = require("../authorization/competition-access.module");
const roster_import_controller_1 = require("./roster-import.controller");
const roster_import_service_1 = require("./roster-import.service");
let RosterImportModule = class RosterImportModule {
};
exports.RosterImportModule = RosterImportModule;
exports.RosterImportModule = RosterImportModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, competition_access_module_1.CompetitionAccessModule],
        controllers: [roster_import_controller_1.RosterImportController],
        providers: [roster_import_service_1.RosterImportService],
        exports: [roster_import_service_1.RosterImportService],
    })
], RosterImportModule);
//# sourceMappingURL=roster-import.module.js.map