import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';
import { DisciplinaryActionsService } from './disciplinary-actions.service';
export declare class DisciplinaryActionsController {
    private readonly disciplinaryActionsService;
    constructor(disciplinaryActionsService: DisciplinaryActionsService);
    create(createDisciplinaryActionDto: CreateDisciplinaryActionDto): import("../../generated/prisma/models").Prisma__disciplinary_actionsClient<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
    }>;
    update(id: bigint, updateDisciplinaryActionDto: UpdateDisciplinaryActionDto): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint | null;
        team_id: bigint;
        player_id: bigint;
        card_type: string;
        reason: string;
        occurred_at: Date;
        reported_by: bigint;
        decision_status: string;
        decided_by: bigint | null;
        decided_at: Date | null;
        decision_notes: string | null;
    }>;
}
