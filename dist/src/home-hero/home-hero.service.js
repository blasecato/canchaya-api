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
exports.HomeHeroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const image_storage_service_1 = require("../uploads/image-storage.service");
const home_hero_defaults_1 = require("./home-hero.defaults");
let HomeHeroService = class HomeHeroService {
    prisma;
    imageStorage;
    constructor(prisma, imageStorage) {
        this.prisma = prisma;
        this.imageStorage = imageStorage;
    }
    async findAll() {
        const stored = await this.prisma.home_hero_slides.findMany({
            orderBy: { position: 'asc' },
        });
        const storedBySlug = new Map(stored.map((slide) => [slide.slug, slide]));
        return home_hero_defaults_1.DEFAULT_HOME_HERO_SLIDES.map((fallback) => {
            const slide = storedBySlug.get(fallback.slug);
            return slide ? this.toResponse(slide) : { ...fallback };
        });
    }
    async update(slug, dto, userId, image) {
        const fallback = home_hero_defaults_1.DEFAULT_HOME_HERO_SLIDES.find((slide) => slide.slug === slug);
        if (!fallback) {
            throw new common_1.NotFoundException('El slide indicado no existe.');
        }
        const current = await this.prisma.home_hero_slides.findUnique({
            where: { slug },
        });
        const uploaded = image
            ? await this.imageStorage.saveHomeHeroSlide(image)
            : undefined;
        const merged = {
            position: fallback.position,
            eyebrow: dto.eyebrow ?? current?.eyebrow ?? fallback.eyebrow,
            title: dto.title ?? current?.title ?? fallback.title,
            accent_title: dto.accentTitle ?? current?.accent_title ?? fallback.accentTitle,
            description: dto.description ?? current?.description ?? fallback.description,
            cta_label: dto.ctaLabel ?? current?.cta_label ?? fallback.ctaLabel,
            cta_to: dto.ctaTo ?? current?.cta_to ?? fallback.ctaTo,
            thumbnail_title: dto.thumbnailTitle ??
                current?.thumbnail_title ??
                fallback.thumbnailTitle,
            image_url: uploaded?.url ?? current?.image_url ?? fallback.imageUrl,
            image_public_id: uploaded?.publicId ?? current?.image_public_id ?? null,
            updated_by: userId,
            updated_at: new Date(),
        };
        try {
            await this.prisma.home_hero_slides.upsert({
                where: { slug },
                create: { slug, ...merged },
                update: merged,
            });
        }
        catch (error) {
            if (uploaded)
                await this.imageStorage.deleteSafely(uploaded);
            throw error;
        }
        if (uploaded && current?.image_public_id) {
            await this.imageStorage.deleteSafely({
                url: current.image_url,
                publicId: current.image_public_id,
            });
        }
        return this.findAll();
    }
    toResponse(slide) {
        return {
            slug: slide.slug,
            position: slide.position,
            eyebrow: slide.eyebrow,
            title: slide.title,
            accentTitle: slide.accent_title,
            description: slide.description,
            ctaLabel: slide.cta_label,
            ctaTo: slide.cta_to,
            thumbnailTitle: slide.thumbnail_title,
            imageUrl: slide.image_url,
        };
    }
};
exports.HomeHeroService = HomeHeroService;
exports.HomeHeroService = HomeHeroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        image_storage_service_1.ImageStorageService])
], HomeHeroService);
//# sourceMappingURL=home-hero.service.js.map