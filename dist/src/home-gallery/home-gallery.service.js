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
exports.HomeGalleryService = void 0;
const common_1 = require("@nestjs/common");
const local_image_storage_service_1 = require("../uploads/local-image-storage.service");
const DEFAULT_GALLERY_ITEMS = [
    {
        slot: 1,
        label: 'Partido nocturno de fútbol',
        imageUrl: '/images/cancha1.png',
    },
    {
        slot: 2,
        label: 'Equipo antes del partido',
        imageUrl: '/images/cancha2.png',
    },
    {
        slot: 3,
        label: 'Jugadores en competencia',
        imageUrl: '/images/cancha3.png',
    },
    {
        slot: 4,
        label: 'Celebración de equipo',
        imageUrl: '/images/cancha4.png',
    },
    {
        slot: 5,
        label: 'Premiación del torneo',
        imageUrl: '/images/cancha5.png',
    },
];
let HomeGalleryService = class HomeGalleryService {
    localStorage;
    constructor(localStorage) {
        this.localStorage = localStorage;
    }
    async findAll() {
        return Promise.all(DEFAULT_GALLERY_ITEMS.map(async (item) => ({
            ...item,
            imageUrl: (await this.localStorage.findHomeGalleryImage(item.slot)) ??
                item.imageUrl,
        })));
    }
    async replace(uploads) {
        uploads.forEach(({ file, slot }) => this.localStorage.validateHomeGalleryImage(file, slot));
        await Promise.all(uploads.map(({ file, slot }) => this.localStorage.replaceHomeGalleryImage(slot, file)));
        return this.findAll();
    }
};
exports.HomeGalleryService = HomeGalleryService;
exports.HomeGalleryService = HomeGalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [local_image_storage_service_1.LocalImageStorageService])
], HomeGalleryService);
//# sourceMappingURL=home-gallery.service.js.map