export declare class ListPlayersQueryDto {
    search?: string;
    status?: 'active' | 'blocked';
    teamId?: string;
    tournamentId?: string;
    managedTournamentsOnly?: boolean;
    page: number;
    pageSize: number;
}
