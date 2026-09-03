import { type TournamentPhase } from './create-tournament.dto';
export declare class ListTournamentsQueryDto {
    associationId?: string;
    managedOnly?: boolean;
    tournamentTypeId?: string;
    dateFrom?: string;
    dateTo?: string;
    phase?: TournamentPhase;
    page: number;
    pageSize: number;
}
