import { type ExtraQualifierMode, type Format } from './competition.engine';
import { type KnockoutPairing, type OrganizationMode, type StageBlueprint, type StageSeeding } from './competition.pipeline';
export declare class CompetitionConfigDto {
    format: Format;
    legs: number;
    groups: number;
    qualifiers: number;
    finalLegs: number;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
}
export declare class StageBlueprintDto {
    kind: 'points' | 'knockout';
    label?: string;
    groups?: number;
    legs?: 1 | 2 | 3;
    seeding?: StageSeeding;
    qualifiersPerGroup?: number | null;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
    thirdPlaceMatch?: boolean;
    pairing?: KnockoutPairing;
    singleRound?: boolean;
    luckyLosers?: number;
    stopAtTeams?: number;
}
export declare function toStageBlueprint(dto: StageBlueprintDto): StageBlueprint;
export declare class CompetitionScheduleDto {
    startAt?: string;
    durationMinutes: number;
    breakMinutes: number;
    matchesPerDay: number;
    daysBetweenMatchDays: number;
    venue?: string;
}
export declare const REORGANIZE_MODES: readonly ["reset", "keep_results"];
export type ReorganizeMode = (typeof REORGANIZE_MODES)[number];
export declare class ReorganizeOptionsDto {
    mode: ReorganizeMode;
}
export declare class PreviewCompetitionDto {
    config?: CompetitionConfigDto;
    organizationMode?: OrganizationMode;
    blueprints?: StageBlueprintDto[];
    reorganize?: ReorganizeOptionsDto;
    schedule: CompetitionScheduleDto;
    seed: string;
    teamIds: string[];
    changeReason?: string;
}
export declare class CompetitionSlotAssignmentDto {
    slotId: string;
    teamId?: string | null;
}
export declare class UpdateCompetitionLineupDto {
    slots: CompetitionSlotAssignmentDto[];
    confirmPlayedMatches?: boolean;
    reason?: string;
}
export declare class AdvanceCompetitionDto {
    expectedStage: number;
    schedule: CompetitionScheduleDto;
    finishTournament?: boolean;
    qualifiersPerGroup?: number;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
    nextStage?: StageBlueprintDto;
}
export declare class CreateCompetitionTemplateDto {
    name: string;
    description?: string;
    mode?: OrganizationMode;
    blueprints?: StageBlueprintDto[];
}
