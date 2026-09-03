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
exports.SponsorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
let SponsorsService = class SponsorsService {
    prisma;
    imageStorage;
    constructor(prisma, imageStorage) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
    }
    async create(createSponsorDto, logo) {
        const uploadedLogo = logo
            ? await this.imageStorage.saveSponsorLogo(logo)
            : undefined;
        try {
            return await this.prisma.sponsors.create({
                data: {
                    name: createSponsorDto.name,
                    tax_id: createSponsorDto.taxId,
                    contact_name: createSponsorDto.contactName,
                    email: createSponsorDto.email,
                    phone: createSponsorDto.phone,
                    website_url: createSponsorDto.websiteUrl,
                    logo_url: uploadedLogo?.url,
                    logo_public_id: uploadedLogo?.publicId,
                    status: createSponsorDto.status,
                },
            });
        }
        catch (error) {
            if (uploadedLogo)
                await this.imageStorage.deleteSafely(uploadedLogo);
            throw error;
        }
    }
    findAll() {
        return this.prisma.sponsors.findMany({ orderBy: { id: 'asc' } });
    }
    async findOne(id) {
        const sponsor = await this.prisma.sponsors.findUnique({ where: { id } });
        if (!sponsor) {
            throw new common_1.NotFoundException(`No se encontró el patrocinador con ID ${id}.`);
        }
        return sponsor;
    }
    async update(id, updateSponsorDto, logo) {
        const current = await this.findOne(id);
        const uploadedLogo = logo
            ? await this.imageStorage.saveSponsorLogo(logo)
            : undefined;
        try {
            const updated = await this.prisma.sponsors.update({
                where: { id },
                data: {
                    name: updateSponsorDto.name,
                    tax_id: updateSponsorDto.taxId,
                    contact_name: updateSponsorDto.contactName,
                    email: updateSponsorDto.email,
                    phone: updateSponsorDto.phone,
                    website_url: updateSponsorDto.websiteUrl,
                    logo_url: uploadedLogo?.url,
                    logo_public_id: uploadedLogo?.publicId,
                    status: updateSponsorDto.status,
                },
            });
            if (uploadedLogo && current.logo_url) {
                await this.imageStorage.deleteSafely({
                    url: current.logo_url,
                    publicId: current.logo_public_id,
                });
            }
            return updated;
        }
        catch (error) {
            if (uploadedLogo)
                await this.imageStorage.deleteSafely(uploadedLogo);
            throw error;
        }
    }
    async remove(id) {
        const current = await this.findOne(id);
        const removed = await this.prisma.sponsors.delete({ where: { id } });
        if (current.logo_url) {
            await this.imageStorage.deleteSafely({
                url: current.logo_url,
                publicId: current.logo_public_id,
            });
        }
        return removed;
    }
};
exports.SponsorsService = SponsorsService;
exports.SponsorsService = SponsorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService])
], SponsorsService);
//# sourceMappingURL=sponsors.service.js.map