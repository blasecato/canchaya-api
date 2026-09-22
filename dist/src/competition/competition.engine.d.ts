export declare const FORMATS: readonly ["league", "league_knockout", "knockout", "groups_knockout", "league_final", "groups_final"];
export type Format = (typeof FORMATS)[number];
export declare const FORMAT_LABELS: Record<Format, string>;
export interface CompetitionConfig {
    format: Format;
    legs: number;
    groups: number;
    qualifiers: number;
    finalLegs: number;
}
export interface Fixture {
    key: string;
    home: string;
    away: string;
    round: number;
    group: string;
    matchDate?: string | null;
    venue?: string | null;
    durationMinutes?: number;
}
export interface CompetitionStage {
    id: number;
    label: string;
    kind: 'points' | 'knockout';
    groups: {
        name: string;
        teams: string[];
    }[];
    fixtures: Fixture[];
    byes: string[];
    resolved: boolean;
}
export interface CompetitionPlan {
    version: 1 | 2;
    config: CompetitionConfig;
    seed: string;
    teamIds: string[];
    slots?: CompetitionSlot[];
    stages: CompetitionStage[];
    champion: string | null;
    createdBy: string;
    createdAt: string;
    originalType: string;
    changeReason: string | null;
}
export interface CompetitionSlot {
    id: string;
    label: string;
    teamId: string | null;
}
export interface Score {
    key: string;
    status: string;
    homeScore: number | null;
    awayScore: number | null;
    homePenalties: number | null;
    awayPenalties: number | null;
}
export interface Standing {
    teamId: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
    drawOrder: number;
}
export declare const hasGroups: (format: Format) => boolean;
export declare const hasFinalLeague: (format: Format) => boolean;
export declare const DIRECT_KNOCKOUT_SIZES: readonly [8, 16, 32];
export declare const isPowerOfTwo: (count: number) => boolean;
export declare function validateConfig(config: CompetitionConfig, count: number): void;
export declare function shuffled(ids: string[], seed: string): string[];
export declare function splitGroups(ids: string[], count: number): {
    name: string;
    teams: string[];
}[];
export declare function roundRobin(ids: string[], legs: number, stageId: number, group: string): Fixture[];
export declare function pointsStage(ids: string[], groups: number, legs: number, id: number, label: string): CompetitionStage;
export declare function knockoutStage(ids: string[], id: number, previousSides?: {
    name: string;
    teams: string[];
}[]): CompetitionStage;
export declare function firstStage(config: CompetitionConfig, ids: string[]): CompetitionStage;
export declare function estimate(config: CompetitionConfig, count: number): {
    totalMatches: number;
    minimumMatches: number;
    groupSizes: number[];
    qualified: number;
    byes: number;
};
export declare function standings(stage: CompetitionStage, group: string, scores: Score[], drawOrder: string[]): Standing[];
export declare function resolveStage(plan: CompetitionPlan, scores: Score[]): {
    next: CompetitionStage | null;
    champion: string | null;
};
export declare function suggestions(count: number): {
    totalMatches: number;
    minimumMatches: number;
    groupSizes: number[];
    qualified: number;
    byes: number;
    config: CompetitionConfig;
    label: string;
}[];
export declare function readPlan(value: unknown): CompetitionPlan | null;
export declare function competitorTeamId(plan: CompetitionPlan, competitorId: string): string | null;
export declare function assignedTeamIds(plan: CompetitionPlan): string[];
export declare function hasUnfilledSlots(plan: CompetitionPlan): boolean;
