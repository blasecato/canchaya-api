export declare class FairPlayPlayerDto {
    playerId: string;
    playerName: string;
    yellowCards: number;
    redCards: number;
}
export declare class FairPlayTeamDto {
    position: number;
    teamId: string;
    teamName: string;
    photoUrl: string | null;
    matchesPlayed: number;
    yellowCards: number;
    redCards: number;
    totalCards: number;
    fairPlayPoints: number;
    pointsPerMatch: number;
    disciplinaryCards: number;
    players: FairPlayPlayerDto[];
}
export declare class FairPlayResponseDto {
    tournamentId: string;
    yellowCardPoints: number;
    redCardPoints: number;
    totalYellowCards: number;
    totalRedCards: number;
    teams: FairPlayTeamDto[];
}
