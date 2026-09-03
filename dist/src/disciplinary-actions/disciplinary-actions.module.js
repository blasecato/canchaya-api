"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinaryActionsModule = void 0;
const common_1 = require("@nestjs/common");
const disciplinary_actions_controller_1 = require("./disciplinary-actions.controller");
const disciplinary_actions_service_1 = require("./disciplinary-actions.service");
let DisciplinaryActionsModule = class DisciplinaryActionsModule {
};
exports.DisciplinaryActionsModule = DisciplinaryActionsModule;
exports.DisciplinaryActionsModule = DisciplinaryActionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [disciplinary_actions_controller_1.DisciplinaryActionsController],
        providers: [disciplinary_actions_service_1.DisciplinaryActionsService],
        exports: [disciplinary_actions_service_1.DisciplinaryActionsService],
    })
], DisciplinaryActionsModule);
//# sourceMappingURL=disciplinary-actions.module.js.map