export declare const FORMATIONS_BY_PLAYERS: Readonly<Record<number, readonly string[]>>;
export declare function parsePlayersOnPitch(modality: string | null | undefined): number;
export declare function getFormationsForModality(playersOnPitch: number): readonly string[];
export declare function buildSlotKeysForFormation(formation: string): string[];
export declare function extractFirstName(fullName: string): string;
export declare function assignFallbackJerseyNumber(seedKey: string, usedNumbers: Set<number>): number;
