export declare const TOURNAMENT_PHASES: readonly ["draft", "registration", "validation", "scheduled", "in_progress", "finished", "archived", "cancelled"];
export type TournamentPhase = (typeof TOURNAMENT_PHASES)[number];
export declare const PUBLIC_TOURNAMENT_PHASES: readonly ["registration", "validation", "scheduled", "in_progress", "finished"];
export declare const ACTIVE_TOURNAMENT_PHASES: readonly ["registration", "in_progress"];
export declare const TOURNAMENT_PHASE_LABELS: Record<TournamentPhase, string>;
export declare const TOURNAMENT_FORWARD_TRANSITIONS: Readonly<Partial<Record<TournamentPhase, TournamentPhase>>>;
export declare const TOURNAMENT_CANCELLABLE_PHASES: readonly TournamentPhase[];
export declare const TOURNAMENT_TERMINAL_PHASES: readonly TournamentPhase[];
export declare function isTournamentPhase(value: string): value is TournamentPhase;
