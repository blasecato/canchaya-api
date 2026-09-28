import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import type { HomeHeroSlideResponseDto } from './dto/home-hero.dto';
import type { UpdateHomeHeroSlideDto } from './dto/home-hero.dto';
export declare class HomeHeroService {
    private readonly prisma;
    private readonly imageStorage;
    constructor(prisma: PrismaService, imageStorage: ImageStorageService);
    findAll(): Promise<HomeHeroSlideResponseDto[]>;
    update(slug: string, dto: UpdateHomeHeroSlideDto, userId: bigint, image?: UploadedImageFile): Promise<HomeHeroSlideResponseDto[]>;
    private toResponse;
}
