import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
export declare class FinesService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    create(requestingUserId: bigint, dto: CreateFineDto): Promise<{
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
    findAll(requestingUserId: bigint): Promise<{
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
    findOne(id: bigint, requestingUserId: bigint): Promise<{
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
    update(id: bigint, requestingUserId: bigint, dto: UpdateFineDto): Promise<{
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
    remove(id: bigint, requestingUserId: bigint): Promise<{
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
    private findExisting;
    private findDisciplinaryAction;
    private buildVisibleWhere;
    private assertCanViewFine;
    private assertPaymentData;
    private assertApprovedAction;
}
