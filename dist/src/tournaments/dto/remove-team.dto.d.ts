export declare class RemoveTeamFromTournamentDto {
    reason?: string;
}
export declare class RemoveTeamFromTournamentResultDto {
    teamId: string;
    teamName: string;
    removedMatches: number;
    removedPlayers: number;
    availableSlots: number;
    freedDrawSlot: boolean;
}
