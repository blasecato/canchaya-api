export const TOURNAMENT_PHASES = [
  'draft',
  'registration',
  'validation',
  'scheduled',
  'in_progress',
  'finished',
  'archived',
  'cancelled',
] as const;

export type TournamentPhase = (typeof TOURNAMENT_PHASES)[number];

/**
 * Fases que forman parte del catálogo visible para jugadores, árbitros e
 * invitados. Los demás estados pertenecen exclusivamente al flujo de gestión.
 */
export const PUBLIC_TOURNAMENT_PHASES = [
  'registration',
  'validation',
  'scheduled',
  'in_progress',
  'finished',
] as const satisfies readonly TournamentPhase[];

export const ACTIVE_TOURNAMENT_PHASES = [
  'registration',
  'in_progress',
] as const satisfies readonly TournamentPhase[];

export const TOURNAMENT_PHASE_LABELS: Record<TournamentPhase, string> = {
  draft: 'Borrador',
  registration: 'Inscripciones',
  validation: 'Validación',
  scheduled: 'Programado',
  in_progress: 'En curso',
  finished: 'Finalizado',
  archived: 'Archivado',
  cancelled: 'Cancelado',
};

export const TOURNAMENT_FORWARD_TRANSITIONS: Readonly<
  Partial<Record<TournamentPhase, TournamentPhase>>
> = {
  draft: 'registration',
  registration: 'validation',
  validation: 'scheduled',
  scheduled: 'in_progress',
  in_progress: 'finished',
  finished: 'archived',
};

export const TOURNAMENT_CANCELLABLE_PHASES: readonly TournamentPhase[] = [
  'draft',
  'registration',
  'validation',
  'scheduled',
  'in_progress',
];

export const TOURNAMENT_TERMINAL_PHASES: readonly TournamentPhase[] = [
  'finished',
  'archived',
  'cancelled',
];

export function isTournamentPhase(value: string): value is TournamentPhase {
  return (TOURNAMENT_PHASES as readonly string[]).includes(value);
}
