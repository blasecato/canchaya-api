import { type TournamentPhase } from '../tournament-lifecycle.constants';
export declare class TransitionTournamentDto {
    phase: TournamentPhase;
    reason?: string;
}
