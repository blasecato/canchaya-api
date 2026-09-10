import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';
import { PlayerMatchStatsService } from './player-match-stats.service';
export declare class PlayerMatchStatsController {
    private readonly playerMatchStatsService;
    constructor(playerMatchStatsService: PlayerMatchStatsService);
    create(request: AuthenticatedRequest, createPlayerMatchStatDto: CreatePlayerMatchStatDto): Promise<{
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
    findAll(request: AuthenticatedRequest): Promise<{
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
    findOne(id: bigint, request: AuthenticatedRequest): Promise<{
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
    update(id: bigint, request: AuthenticatedRequest, updatePlayerMatchStatDto: UpdatePlayerMatchStatDto): Promise<{
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
    remove(id: bigint, request: AuthenticatedRequest): Promise<{
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
