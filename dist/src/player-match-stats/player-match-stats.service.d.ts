import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';
export declare class PlayerMatchStatsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPlayerMatchStatDto: CreatePlayerMatchStatDto): import("../../generated/prisma/models").Prisma__player_match_statsClient<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
    }[]>;
    findOne(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
    }>;
    update(id: bigint, updatePlayerMatchStatDto: UpdatePlayerMatchStatDto): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        created_at: Date;
        tournament_id: bigint;
        match_id: bigint;
        team_id: bigint;
        player_id: bigint;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        minutes_played: number;
    }>;
}
