import { TournamentSponsorsInputDto } from './tournament-sponsor-input.dto';
export declare const TOURNAMENT_PHASES: readonly ["draft", "registration", "in_progress", "finished", "cancelled"];
export declare const TOURNAMENT_STATUSES: readonly ["active", "inactive"];
export type TournamentPhase = (typeof TOURNAMENT_PHASES)[number];
export type TournamentStatus = (typeof TOURNAMENT_STATUSES)[number];
export declare class CreateTournamentDto extends TournamentSponsorsInputDto {
    name: string;
    description?: string | null;
    tournamentTypeId: string;
    sportType: string;
    modality: string;
    startDate: string;
    endDate?: string | null;
    registrationStartDate?: string | null;
    registrationEndDate?: string | null;
    registrationFee?: number;
    currencyCode?: string;
    grandPrize?: number;
    secondPrize?: number;
    thirdPrize?: number;
    maxTeams: number;
    minPlayersPerTeam: number;
    maxPlayersPerTeam: number;
    locationName?: string | null;
    locationAddress?: string | null;
    rulesUrl?: string | null;
    phase?: TournamentPhase;
    status?: TournamentStatus;
}
