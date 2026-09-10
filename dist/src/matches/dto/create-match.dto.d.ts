export declare class CreateMatchDto {
    tournamentId: string;
    homeTeamId: string;
    awayTeamId: string;
    matchDate?: string | null;
    venue?: string | null;
    stage: string;
    roundNumber?: number | null;
    homeScore?: number | null;
    awayScore?: number | null;
    status?: string;
    durationMinutes?: number;
    notes?: string | null;
}
