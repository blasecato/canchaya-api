"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeGalleryModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const uploads_module_1 = require("../uploads/uploads.module");
const home_gallery_controller_1 = require("./home-gallery.controller");
const home_gallery_service_1 = require("./home-gallery.service");
let HomeGalleryModule = class HomeGalleryModule {
};
exports.HomeGalleryModule = HomeGalleryModule;
exports.HomeGalleryModule = HomeGalleryModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, uploads_module_1.UploadsModule],
        controllers: [home_gallery_controller_1.HomeGalleryController],
        providers: [home_gallery_service_1.HomeGalleryService],
    })
], HomeGalleryModule);
//# sourceMappingURL=home-gallery.module.js.map