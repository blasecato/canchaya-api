export declare class TeamCarnetTournamentResponseDto {
    id: string;
    name: string;
    startDate: string;
    endDate: string | null;
}
export declare class TeamCarnetPlayerResponseDto {
    id: string;
    fullName: string;
    idNumber: string;
    documentType: string;
    birthDate: string;
    phone: string | null;
    email: string;
    photoUrl: string | null;
    jerseyNumber: number | null;
    position: string | null;
}
export declare class TeamCarnetsResponseDto {
    teamId: string;
    teamName: string;
    sportType: string;
    modality: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    photoUrl: string | null;
    tournaments: TeamCarnetTournamentResponseDto[];
    players: TeamCarnetPlayerResponseDto[];
}
