export declare const MAX_TEAMS_PER_BATCH = 50;
export declare class AddTeamsToTournamentDto {
    teamIds: string[];
}
export declare class AddedTeamDto {
    teamId: string;
    teamName: string;
}
export declare class RejectedTeamDto {
    teamId: string;
    teamName: string;
    reason: string;
}
export declare class AddTeamsResultDto {
    added: AddedTeamDto[];
    rejected: RejectedTeamDto[];
    availableSlots: number;
}
