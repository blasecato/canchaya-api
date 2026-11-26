import { type CompetitionConfig, type CompetitionPlan, type CompetitionStage, type ExtraQualifierMode, type Score } from './competition.engine';
export declare const ORGANIZATION_MODES: readonly ["planned", "on_the_fly"];
export type OrganizationMode = (typeof ORGANIZATION_MODES)[number];
export declare const STAGE_SEEDINGS: readonly ["snake", "random"];
export type StageSeeding = (typeof STAGE_SEEDINGS)[number];
export declare const KNOCKOUT_PAIRINGS: readonly ["seeded", "parallel", "random"];
export type KnockoutPairing = (typeof KNOCKOUT_PAIRINGS)[number];
export interface PointsStageBlueprint {
    kind: 'points';
    label?: string;
    groups: number;
    legs: 1 | 2 | 3;
    seeding?: StageSeeding;
    qualifiersPerGroup?: number | null;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
}
export interface KnockoutStageBlueprint {
    kind: 'knockout';
    label?: string;
    thirdPlaceMatch?: boolean;
    pairing?: KnockoutPairing;
    singleRound?: boolean;
    luckyLosers?: number;
    stopAtTeams?: number;
}
export type StageBlueprint = PointsStageBlueprint | KnockoutStageBlueprint;
export interface StageEstimate {
    index: number;
    label: string;
    kind: 'points' | 'knockout';
    incomingTeams: number;
    outgoingTeams: number;
    groupSizes: number[];
    matches: number;
    isOpenEnded: boolean;
}
export interface PipelineEstimate {
    totalMatches: number;
    minimumMatches: number;
    groupSizes: number[];
    qualified: number;
    byes: number;
    stages: StageEstimate[];
}
export interface AdvanceResolutionOptions {
    finishTournament?: boolean;
    qualifiersPerGroup?: number;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
    nextStage?: StageBlueprint;
}
export declare function defaultStageLabel(blueprint: StageBlueprint, index: number, total: number): string;
export declare function describeBlueprints(blueprints: StageBlueprint[], mode?: OrganizationMode): string;
export declare function configToBlueprints(config: CompetitionConfig): StageBlueprint[];
export declare function splitGroupsSnake(ids: string[], count: number): {
    name: string;
    teams: string[];
}[];
export declare function groupSizesForCount(count: number, groups: number): number[];
export declare function validateStageBlueprint(blueprint: StageBlueprint, incoming: number, hasNext: boolean, stageNumber: number, mode: OrganizationMode): {
    outgoing: number;
    matches: number;
    groupSizes: number[];
    minMatches: number;
};
export declare function validatePipeline(blueprints: StageBlueprint[], teamCount: number, mode?: OrganizationMode): PipelineEstimate;
export declare function buildStageFromBlueprint(blueprint: StageBlueprint, ids: string[], stageId: number, blueprintIndex: number, seed: string, totalBlueprints: number): CompetitionStage;
export declare function resolvePipelineStage(plan: CompetitionPlan, scores: Score[], options?: AdvanceResolutionOptions): {
    next: CompetitionStage | null;
    champion: string | null;
    updatedBlueprints: StageBlueprint[];
};
