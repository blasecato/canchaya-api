import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';
import { SuspensionsService } from './suspensions.service';
export declare class SuspensionsController {
    private readonly suspensionsService;
    constructor(suspensionsService: SuspensionsService);
    create(request: AuthenticatedRequest, createSuspensionDto: CreateSuspensionDto): Promise<{
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
    findAll(request: AuthenticatedRequest): Promise<{
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
    findOne(id: bigint, request: AuthenticatedRequest): Promise<{
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
    update(id: bigint, request: AuthenticatedRequest, updateSuspensionDto: UpdateSuspensionDto): Promise<{
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
    remove(id: bigint, request: AuthenticatedRequest): Promise<{
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
}
