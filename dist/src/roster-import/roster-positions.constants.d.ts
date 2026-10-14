export declare const ROSTER_POSITIONS: readonly ["Arquero", "Defensa", "Lateral", "Mediocampista", "Extremo", "Delantero"];
export type RosterPosition = (typeof ROSTER_POSITIONS)[number];
export declare const resolveRosterPosition: (value: string | null | undefined) => RosterPosition | null;
export declare const ROSTER_POSITIONS_LABEL: string;
