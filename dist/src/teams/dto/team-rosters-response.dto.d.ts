export declare class TeamRosterPlayerResponseDto {
    id: string;
    fullName: string;
    photoUrl: string | null;
    jerseyNumber: number | null;
    position: string | null;
    isCaptain: boolean;
}
export declare class TeamTournamentRosterResponseDto {
    tournamentId: string;
    tournamentName: string;
    phase: string;
    minPlayers: number;
    maxPlayers: number;
    canEdit: boolean;
    players: TeamRosterPlayerResponseDto[];
}
export declare class TeamRostersResponseDto {
    teamId: string;
    canManageMembers: boolean;
    tournaments: TeamTournamentRosterResponseDto[];
}
