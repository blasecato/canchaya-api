import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';
export declare class PlayerMatchStatsService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    create(requestingUserId: bigint, dto: CreatePlayerMatchStatDto): Promise<{
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
    findAll(requestingUserId: bigint): Promise<{
        playerName: string;
        teamName: string;
        id: bigint;
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
    findMatchDetail(matchId: bigint, requestingUserId: bigint): Promise<{
        matchId: string;
        teamId: string;
        teamName: string;
        playerId: string;
        playerName: string;
        jerseyNumber: number | null;
        goals: number;
        yellowCards: number;
        redCards: number;
    }[]>;
    findOne(id: bigint, requestingUserId: bigint): Promise<{
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
    update(id: bigint, requestingUserId: bigint, dto: UpdatePlayerMatchStatDto): Promise<{
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
    remove(id: bigint, requestingUserId: bigint): Promise<{
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
    private findExisting;
    private assertValidContext;
}
