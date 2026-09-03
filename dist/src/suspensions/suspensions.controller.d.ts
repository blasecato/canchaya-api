import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';
import { SuspensionsService } from './suspensions.service';
export declare class SuspensionsController {
    private readonly suspensionsService;
    constructor(suspensionsService: SuspensionsService);
    create(createSuspensionDto: CreateSuspensionDto): import("../../generated/prisma/models").Prisma__suspensionsClient<{
        id: bigint;
        created_at: Date;
        status: string;
        reason: string | null;
        disciplinary_action_id: bigint;
        created_by: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        status: string;
        reason: string | null;
        disciplinary_action_id: bigint;
        created_by: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        reason: string | null;
        disciplinary_action_id: bigint;
        created_by: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
    }>;
    update(id: bigint, updateSuspensionDto: UpdateSuspensionDto): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        reason: string | null;
        disciplinary_action_id: bigint;
        created_by: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        reason: string | null;
        disciplinary_action_id: bigint;
        created_by: bigint;
        matches_count: number | null;
        start_date: Date | null;
        end_date: Date | null;
    }>;
}
