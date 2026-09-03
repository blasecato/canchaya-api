export declare const ASSOCIATION_TOURNAMENT_SCOPES: readonly ["available", "management"];
export type AssociationTournamentScope = (typeof ASSOCIATION_TOURNAMENT_SCOPES)[number];
export declare class ListAssociationTournamentsQueryDto {
    scope?: AssociationTournamentScope;
}
