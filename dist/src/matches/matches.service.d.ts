import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
export declare class MatchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMatchDto: CreateMatchDto): import("../../generated/prisma/models").Prisma__matchesClient<{
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        tournament_id: bigint;
        notes: string | null;
        home_team_id: bigint;
        away_team_id: bigint;
        match_date: Date | null;
        venue: string | null;
        stage: string;
        round_number: number | null;
        home_score: number | null;
        away_score: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        tournament_id: bigint;
        notes: string | null;
        home_team_id: bigint;
        away_team_id: bigint;
        match_date: Date | null;
        venue: string | null;
        stage: string;
        round_number: number | null;
        home_score: number | null;
        away_score: number | null;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        tournament_id: bigint;
        notes: string | null;
        home_team_id: bigint;
        away_team_id: bigint;
        match_date: Date | null;
        venue: string | null;
        stage: string;
        round_number: number | null;
        home_score: number | null;
        away_score: number | null;
    }>;
    update(id: bigint, updateMatchDto: UpdateMatchDto): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        tournament_id: bigint;
        notes: string | null;
        home_team_id: bigint;
        away_team_id: bigint;
        match_date: Date | null;
        venue: string | null;
        stage: string;
        round_number: number | null;
        home_score: number | null;
        away_score: number | null;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        tournament_id: bigint;
        notes: string | null;
        home_team_id: bigint;
        away_team_id: bigint;
        match_date: Date | null;
        venue: string | null;
        stage: string;
        round_number: number | null;
        home_score: number | null;
        away_score: number | null;
    }>;
}
