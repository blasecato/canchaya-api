import { AssociationTournamentResponseDto } from '../../associations/dto/association-tournament-response.dto';
export declare class TournamentCatalogAssociationDto {
    id: string;
    name: string;
}
export declare class TournamentCatalogItemResponseDto extends AssociationTournamentResponseDto {
    association: TournamentCatalogAssociationDto;
    canManage: boolean;
}
export declare class TournamentScorerResponseDto {
    id: string;
    name: string;
    team: string;
    goals: number;
}
export declare class TournamentStandingResponseDto {
    teamId: string;
    teamName: string;
    primaryColor: string | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}
export declare class TournamentDetailResponseDto extends TournamentCatalogItemResponseDto {
    scorers: TournamentScorerResponseDto[];
    standings: TournamentStandingResponseDto[];
    matchesPlayed: number;
    totalGoals: number;
}
export declare class TournamentRulesResponseDto {
    id: string;
    rulesContent: string | null;
}
export declare class TournamentCatalogPageResponseDto {
    items: TournamentCatalogItemResponseDto[];
    page: number;
    pageSize: number;
    total: number;
    hasNextPage: boolean;
}
export declare class TournamentCatalogFilterOptionDto {
    id: string;
    name: string;
}
export declare class TournamentCatalogFiltersResponseDto {
    associations: TournamentCatalogFilterOptionDto[];
    tournamentTypes: TournamentCatalogFilterOptionDto[];
    categories: string[];
    categoryGenders: string[];
}
