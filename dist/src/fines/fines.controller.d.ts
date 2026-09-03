import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FinesService } from './fines.service';
export declare class FinesController {
    private readonly finesService;
    constructor(finesService: FinesService);
    create(createFineDto: CreateFineDto): import("../../generated/prisma/models").Prisma__finesClient<{
        id: bigint;
        created_at: Date;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
    }>;
    update(id: bigint, updateFineDto: UpdateFineDto): Promise<{
        id: bigint;
        created_at: Date;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
        created_by: bigint;
    }>;
}
