import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { SponsorsService } from './sponsors.service';
export declare class SponsorsController {
    private readonly sponsorsService;
    constructor(sponsorsService: SponsorsService);
    create(createSponsorDto: CreateSponsorDto, logo?: UploadedImageFile): Promise<{
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        id: bigint;
        email: string | null;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        website_url: string | null;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        id: bigint;
        email: string | null;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        website_url: string | null;
    }[]>;
    findOne(id: bigint): Promise<{
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        id: bigint;
        email: string | null;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        website_url: string | null;
    }>;
    update(id: bigint, updateSponsorDto: UpdateSponsorDto, logo?: UploadedImageFile): Promise<{
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        id: bigint;
        email: string | null;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        website_url: string | null;
    }>;
    remove(id: bigint): Promise<{
        logo_url: string | null;
        logo_public_id: string | null;
        status: string;
        id: bigint;
        email: string | null;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
        name: string;
        tax_id: string | null;
        contact_name: string | null;
        website_url: string | null;
    }>;
}
