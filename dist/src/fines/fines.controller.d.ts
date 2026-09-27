import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FinesService } from './fines.service';
export declare class FinesController {
    private readonly finesService;
    constructor(finesService: FinesService);
    create(request: AuthenticatedRequest, createFineDto: CreateFineDto): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        created_by: bigint;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
    }>;
    findAll(request: AuthenticatedRequest): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        created_by: bigint;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
    }[]>;
    findOne(id: bigint, request: AuthenticatedRequest): Promise<{
        disciplinary_actions: {
            id: bigint;
            tournament_id: bigint;
            player_id: bigint;
            decision_status: string;
        };
    } & {
        id: bigint;
        created_at: Date;
        updated_at: Date;
        created_by: bigint;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
    }>;
    update(id: bigint, request: AuthenticatedRequest, updateFineDto: UpdateFineDto): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        created_by: bigint;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
    }>;
    remove(id: bigint, request: AuthenticatedRequest): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        created_by: bigint;
        disciplinary_action_id: bigint;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency_code: string;
        due_date: Date | null;
        payment_status: string;
        paid_at: Date | null;
        payment_reference: string | null;
        notes: string | null;
    }>;
}
