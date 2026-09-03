export declare class CreatePlayerMatchStatDto {
    matchId: string;
    tournamentId: string;
    teamId: string;
    playerId: string;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    minutesPlayed?: number;
}
