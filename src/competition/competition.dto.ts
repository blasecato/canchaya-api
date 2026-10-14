import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsDefined,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  EXTRA_QUALIFIER_MODES,
  FORMATS,
  type ExtraQualifierMode,
  type Format,
} from './competition.engine';
import { IsBigIntString } from '../common/decorators/is-big-int-string.decorator';

export class CompetitionConfigDto {
  @IsIn(FORMATS) format!: Format;
  @IsIn([1, 2, 3]) legs!: number;
  @IsInt() @Min(1) @Max(10000) groups!: number;
  @IsInt() @Min(1) @Max(10000) qualifiers!: number;
  @IsIn([1, 2]) finalLegs!: number;
  /** Clasificados por mejor ubicación además de los puestos fijos. */
  @IsOptional() @IsInt() @Min(0) @Max(32) extraQualifiers?: number;
  @IsOptional() @IsIn(EXTRA_QUALIFIER_MODES)
  extraQualifierMode?: ExtraQualifierMode;
}
export class CompetitionScheduleDto {
  @IsOptional() @IsDateString() startAt?: string;
  @IsInt() @Min(15) @Max(240) durationMinutes!: number;
  @IsInt() @Min(0) @Max(240) breakMinutes!: number;
  @IsInt() @Min(1) @Max(16) matchesPerDay!: number;
  @IsInt() @Min(1) @Max(30) daysBetweenMatchDays!: number;
  @IsOptional() @IsString() @MaxLength(200) venue?: string;
}
export const REORGANIZE_MODES = ['reset', 'keep_results'] as const;
export type ReorganizeMode = (typeof REORGANIZE_MODES)[number];

export class ReorganizeOptionsDto {
  /**
   * `reset` descarta el calendario anterior; `keep_results` conserva los
   * resultados de los partidos ya jugados que se repitan en el sorteo nuevo.
   */
  @IsIn(REORGANIZE_MODES) mode!: ReorganizeMode;
}

export class PreviewCompetitionDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionConfigDto)
  config!: CompetitionConfigDto;

  /** Presente solo cuando se rehace la organización de un torneo ya sorteado. */
  @IsOptional()
  @ValidateNested()
  @Type(() => ReorganizeOptionsDto)
  reorganize?: ReorganizeOptionsDto;
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionScheduleDto)
  schedule!: CompetitionScheduleDto;
  @IsUUID() seed!: string;
  @IsArray()
  @ArrayMaxSize(10001)
  @ArrayUnique()
  @IsBigIntString({ each: true })
  teamIds!: string[];
  @IsOptional() @IsString() @MaxLength(1000) changeReason?: string;
}
export class AdvanceCompetitionDto {
  @IsInt() @Min(1) expectedStage!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionScheduleDto)
  schedule!: CompetitionScheduleDto;
}
