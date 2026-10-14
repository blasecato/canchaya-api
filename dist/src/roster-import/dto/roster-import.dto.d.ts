export declare const MAX_SHEETS_PER_IMPORT = 40;
export declare const MAX_PLAYERS_PER_SHEET = 60;
export declare const DOCUMENT_TYPES: readonly ["CC", "TI", "CE", "PA"];
export declare class RosterImportPlayerDto {
    row: number;
    fullName: string;
    email: string;
    phone?: string;
    documentType: string;
    idNumber: string;
    birthDate: string;
    gender: string;
    position: string;
    jerseyNumber?: number;
    isCaptain?: boolean;
}
export declare class RosterImportTeamDto {
    sheetName: string;
    teamName: string;
    players: RosterImportPlayerDto[];
}
export declare class RosterImportDto {
    teams: RosterImportTeamDto[];
}
