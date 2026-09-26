import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';
export declare class SuspensionsService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    create(requestingUserId: bigint, dto: CreateSuspensionDto): Promise<{
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        start_date: Date | null;
        end_date: Date | null;
        created_by: bigint;
        reason: string | null;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        served_matches: number;
        completed_at: Date | null;
    }>;
    findAll(requestingUserId: bigint): Promise<{
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        start_date: Date | null;
        end_date: Date | null;
        created_by: bigint;
        reason: string | null;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        served_matches: number;
        completed_at: Date | null;
    }[]>;
    findOne(id: bigint, requestingUserId: bigint): Promise<{
        disciplinary_actions: {
            id: bigint;
            tournament_id: bigint;
            player_id: bigint;
            decision_status: string;
        };
    } & {
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        start_date: Date | null;
        end_date: Date | null;
        created_by: bigint;
        reason: string | null;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        served_matches: number;
        completed_at: Date | null;
    }>;
    update(id: bigint, requestingUserId: bigint, dto: UpdateSuspensionDto): Promise<{
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        start_date: Date | null;
        end_date: Date | null;
        created_by: bigint;
        reason: string | null;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        served_matches: number;
        completed_at: Date | null;
    }>;
    remove(id: bigint, requestingUserId: bigint): Promise<{
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        start_date: Date | null;
        end_date: Date | null;
        created_by: bigint;
        reason: string | null;
        disciplinary_action_id: bigint;
        matches_count: number | null;
        served_matches: number;
        completed_at: Date | null;
    }>;
    private findExisting;
    private findDisciplinaryAction;
    private buildVisibleWhere;
    private assertCanViewSuspension;
    private assertValidPeriod;
    private assertApprovedAction;
}
