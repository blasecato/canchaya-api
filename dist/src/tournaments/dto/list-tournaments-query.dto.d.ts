import { type TournamentPhase } from '../tournament-lifecycle.constants';
import { type TournamentCategoryGender } from '../tournament-category.constants';
export declare class ListTournamentsQueryDto {
    associationId?: string;
    managedOnly?: boolean;
    tournamentTypeId?: string;
    category?: string;
    categoryGender?: TournamentCategoryGender;
    dateFrom?: string;
    dateTo?: string;
    phase?: TournamentPhase;
    page: number;
    pageSize: number;
}
