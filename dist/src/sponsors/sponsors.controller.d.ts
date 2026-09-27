import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { SponsorsService } from './sponsors.service';
export declare class SponsorsController {
    private readonly sponsorsService;
    constructor(sponsorsService: SponsorsService);
    create(createSponsorDto: CreateSponsorDto, logo?: UploadedImageFile): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        name: string;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        updated_at: Date;
        contact_name: string | null;
        website_url: string | null;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        status: string;
        name: string;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        updated_at: Date;
        contact_name: string | null;
        website_url: string | null;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        name: string;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        updated_at: Date;
        contact_name: string | null;
        website_url: string | null;
    }>;
    update(id: bigint, updateSponsorDto: UpdateSponsorDto, logo?: UploadedImageFile): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        name: string;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        updated_at: Date;
        contact_name: string | null;
        website_url: string | null;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        name: string;
        tax_id: string | null;
        email: string | null;
        phone: string | null;
        logo_url: string | null;
        logo_public_id: string | null;
        updated_at: Date;
        contact_name: string | null;
        website_url: string | null;
    }>;
}
