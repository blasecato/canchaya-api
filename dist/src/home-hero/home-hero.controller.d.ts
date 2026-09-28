import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { HomeHeroSlideResponseDto, UpdateHomeHeroSlideDto } from './dto/home-hero.dto';
import { HomeHeroService } from './home-hero.service';
export declare class HomeHeroController {
    private readonly homeHeroService;
    constructor(homeHeroService: HomeHeroService);
    findAll(): Promise<HomeHeroSlideResponseDto[]>;
    update(slug: string, request: AuthenticatedRequest, dto: UpdateHomeHeroSlideDto, image?: UploadedImageFile): Promise<HomeHeroSlideResponseDto[]>;
}
