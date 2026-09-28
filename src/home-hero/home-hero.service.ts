import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import type { HomeHeroSlideResponseDto } from './dto/home-hero.dto';
import type { UpdateHomeHeroSlideDto } from './dto/home-hero.dto';
import { DEFAULT_HOME_HERO_SLIDES } from './home-hero.defaults';

type StoredSlide = {
  slug: string;
  position: number;
  eyebrow: string;
  title: string;
  accent_title: string;
  description: string;
  cta_label: string;
  cta_to: string;
  thumbnail_title: string;
  image_url: string | null;
  image_public_id: string | null;
};

@Injectable()
export class HomeHeroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async findAll(): Promise<HomeHeroSlideResponseDto[]> {
    const stored = await this.prisma.home_hero_slides.findMany({
      orderBy: { position: 'asc' },
    });
    const storedBySlug = new Map(stored.map((slide) => [slide.slug, slide]));

    return DEFAULT_HOME_HERO_SLIDES.map((fallback) => {
      const slide = storedBySlug.get(fallback.slug);
      return slide ? this.toResponse(slide) : { ...fallback };
    });
  }

  async update(
    slug: string,
    dto: UpdateHomeHeroSlideDto,
    userId: bigint,
    image?: UploadedImageFile,
  ): Promise<HomeHeroSlideResponseDto[]> {
    const fallback = DEFAULT_HOME_HERO_SLIDES.find(
      (slide) => slide.slug === slug,
    );
    if (!fallback) {
      throw new NotFoundException('El slide indicado no existe.');
    }

    const current = await this.prisma.home_hero_slides.findUnique({
      where: { slug },
    });
    const uploaded = image
      ? await this.imageStorage.saveHomeHeroSlide(image)
      : undefined;

    // Lo que el administrador no envía conserva su valor: primero lo guardado,
    // y si nunca se editó, el contenido que trae la aplicación.
    const merged = {
      position: fallback.position,
      eyebrow: dto.eyebrow ?? current?.eyebrow ?? fallback.eyebrow,
      title: dto.title ?? current?.title ?? fallback.title,
      accent_title:
        dto.accentTitle ?? current?.accent_title ?? fallback.accentTitle,
      description: dto.description ?? current?.description ?? fallback.description,
      cta_label: dto.ctaLabel ?? current?.cta_label ?? fallback.ctaLabel,
      cta_to: dto.ctaTo ?? current?.cta_to ?? fallback.ctaTo,
      thumbnail_title:
        dto.thumbnailTitle ??
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
    } catch (error: unknown) {
      if (uploaded) await this.imageStorage.deleteSafely(uploaded);
      throw error;
    }

    // La imagen anterior solo se borra cuando la nueva quedó guardada.
    if (uploaded && current?.image_public_id) {
      await this.imageStorage.deleteSafely({
        url: current.image_url,
        publicId: current.image_public_id,
      });
    }

    return this.findAll();
  }

  private toResponse(slide: StoredSlide): HomeHeroSlideResponseDto {
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
}
