"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefereesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const referee_assignments_controller_1 = require("./referee-assignments.controller");
const referee_assignments_service_1 = require("./referee-assignments.service");
const referees_controller_1 = require("./referees.controller");
const referees_service_1 = require("./referees.service");
let RefereesModule = class RefereesModule {
};
exports.RefereesModule = RefereesModule;
exports.RefereesModule = RefereesModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [referees_controller_1.RefereesController, referee_assignments_controller_1.RefereeAssignmentsController],
        providers: [referees_service_1.RefereesService, referee_assignments_service_1.RefereeAssignmentsService],
        exports: [referees_service_1.RefereesService, referee_assignments_service_1.RefereeAssignmentsService],
    })
], RefereesModule);
//# sourceMappingURL=referees.module.js.map