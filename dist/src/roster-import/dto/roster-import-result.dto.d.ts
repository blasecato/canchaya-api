export declare const ROSTER_PLAYER_OUTCOMES: readonly ["created", "linked", "already_in_team", "rejected"];
export type RosterPlayerOutcome = (typeof ROSTER_PLAYER_OUTCOMES)[number];
export declare const ROSTER_TEAM_OUTCOMES: readonly ["team_created", "team_registered", "roster_updated", "rejected"];
export type RosterTeamOutcome = (typeof ROSTER_TEAM_OUTCOMES)[number];
export declare class RosterImportPlayerResultDto {
    row: number;
    fullName: string;
    documentType: string;
    idNumber: string;
    email: string;
    position: string | null;
    jerseyNumber: number | null;
    isCaptain: boolean;
    outcome: RosterPlayerOutcome;
    detail: string;
}
export declare class RosterImportTeamResultDto {
    sheetName: string;
    teamName: string;
    teamId?: string | null;
    outcome: RosterTeamOutcome;
    detail: string;
    playersCreated: number;
    playersLinked: number;
    playersRejected: number;
    rosterSize: number;
    players: RosterImportPlayerResultDto[];
}
export declare class RosterImportResultDto {
    tournamentId: string;
    sheetsReceived: number;
    teamsImported: number;
    teamsRejected: number;
    playersCreated: number;
    playersLinked: number;
    playersRejected: number;
    availableSlots: number;
    temporaryPassword: string | null;
    teams: RosterImportTeamResultDto[];
}
