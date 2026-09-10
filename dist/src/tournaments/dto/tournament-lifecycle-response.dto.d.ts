import type { TournamentPhase } from '../tournament-lifecycle.constants';
import { TournamentPaymentSummaryResponseDto } from './registration-payment.dto';
export declare class TournamentTransitionOptionResponseDto {
    phase: TournamentPhase;
    label: string;
    allowed: boolean;
    blockers: string[];
    warnings: string[];
    requiresReason: boolean;
}
export declare class TournamentLifecycleEventResponseDto {
    id: string;
    fromPhase: TournamentPhase | null;
    toPhase: TournamentPhase;
    reason: string | null;
    createdAt: string;
    actorUserId: string;
    actorName: string;
}
export declare class TournamentLifecycleResponseDto {
    tournamentId: string;
    currentPhase: TournamentPhase;
    currentPhaseLabel: string;
    transitions: TournamentTransitionOptionResponseDto[];
    paymentSummary: TournamentPaymentSummaryResponseDto;
    history: TournamentLifecycleEventResponseDto[];
}
