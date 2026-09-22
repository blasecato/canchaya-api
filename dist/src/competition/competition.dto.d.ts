import { type Format } from './competition.engine';
export declare class CompetitionConfigDto {
    format: Format;
    legs: number;
    groups: number;
    qualifiers: number;
    finalLegs: number;
}
export declare class CompetitionScheduleDto {
    startAt?: string;
    durationMinutes: number;
    breakMinutes: number;
    matchesPerDay: number;
    daysBetweenMatchDays: number;
    venue?: string;
}
export declare class PreviewCompetitionDto {
    config: CompetitionConfigDto;
    schedule: CompetitionScheduleDto;
    seed: string;
    teamIds: string[];
    changeReason?: string;
}
export declare class AdvanceCompetitionDto {
    expectedStage: number;
    schedule: CompetitionScheduleDto;
}
