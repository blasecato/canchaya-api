import { type ExtraQualifierMode, type Format } from './competition.engine';
export declare class CompetitionConfigDto {
    format: Format;
    legs: number;
    groups: number;
    qualifiers: number;
    finalLegs: number;
    extraQualifiers?: number;
    extraQualifierMode?: ExtraQualifierMode;
}
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
    config: CompetitionConfigDto;
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
}
