import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
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
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  EXTRA_QUALIFIER_MODES,
  FORMATS,
  type ExtraQualifierMode,
  type Format,
} from './competition.engine';
import {
  KNOCKOUT_PAIRINGS,
  ORGANIZATION_MODES,
  STAGE_SEEDINGS,
  type KnockoutPairing,
  type OrganizationMode,
  type StageBlueprint,
  type StageSeeding,
} from './competition.pipeline';
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

export class StageBlueprintDto {
  @IsIn(['points', 'knockout']) kind!: 'points' | 'knockout';
  @IsOptional() @IsString() @MaxLength(80) label?: string;
  @IsOptional() @IsInt() @Min(1) @Max(100) groups?: number;
  @IsOptional() @IsIn([1, 2, 3]) legs?: 1 | 2 | 3;
  @IsOptional() @IsIn(STAGE_SEEDINGS) seeding?: StageSeeding;
  @IsOptional() @IsInt() @Min(1) @Max(10000) qualifiersPerGroup?: number | null;
  @IsOptional() @IsInt() @Min(0) @Max(32) extraQualifiers?: number;
  @IsOptional() @IsIn(EXTRA_QUALIFIER_MODES)
  extraQualifierMode?: ExtraQualifierMode;
  @IsOptional() @IsBoolean() thirdPlaceMatch?: boolean;
  @IsOptional() @IsIn(KNOCKOUT_PAIRINGS) pairing?: KnockoutPairing;
  @IsOptional() @IsBoolean() singleRound?: boolean;
  @IsOptional() @IsInt() @Min(0) @Max(64) luckyLosers?: number;
  @IsOptional() @IsInt() @Min(1) @Max(1024) stopAtTeams?: number;
}

export function toStageBlueprint(dto: StageBlueprintDto): StageBlueprint {
  if (dto.kind === 'knockout') {
    return {
      kind: 'knockout',
      ...(dto.label?.trim() ? { label: dto.label.trim() } : {}),
      thirdPlaceMatch: dto.thirdPlaceMatch ?? true,
      pairing: dto.pairing ?? 'seeded',
      ...(dto.singleRound ? { singleRound: true } : {}),
      ...(dto.singleRound && dto.luckyLosers
        ? { luckyLosers: dto.luckyLosers }
        : {}),
      stopAtTeams: dto.stopAtTeams ?? 1,
    };
  }
  return {
    kind: 'points',
    ...(dto.label?.trim() ? { label: dto.label.trim() } : {}),
    groups: dto.groups ?? 1,
    legs: dto.legs ?? 1,
    seeding: dto.seeding ?? 'snake',
    ...(dto.qualifiersPerGroup !== undefined
      ? { qualifiersPerGroup: dto.qualifiersPerGroup }
      : {}),
    ...(dto.extraQualifiers ? { extraQualifiers: dto.extraQualifiers } : {}),
    ...(dto.extraQualifierMode
      ? { extraQualifierMode: dto.extraQualifierMode }
      : {}),
  };
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
  @ValidateIf((dto: PreviewCompetitionDto) => !dto.blueprints?.length)
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionConfigDto)
  config?: CompetitionConfigDto;

  @IsOptional()
  @IsIn(ORGANIZATION_MODES)
  organizationMode?: OrganizationMode;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ValidateNested({ each: true })
  @Type(() => StageBlueprintDto)
  blueprints?: StageBlueprintDto[];

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
/** Un lugar del sorteo y el equipo que lo ocupa; `null` lo deja libre. */
export class CompetitionSlotAssignmentDto {
  @IsString() @MaxLength(40) slotId!: string;

  @IsOptional() @IsBigIntString() teamId?: string | null;
}

export class UpdateCompetitionLineupDto {
  @IsArray()
  @ArrayMaxSize(10001)
  @ValidateNested({ each: true })
  @Type(() => CompetitionSlotAssignmentDto)
  slots!: CompetitionSlotAssignmentDto[];

  /**
   * Confirma que se aceptan los avisos sobre partidos ya jugados. Sin esto, un
   * cambio que afecte resultados se rechaza explicando qué pasaría.
   */
  @IsOptional() @IsIn([true]) confirmPlayedMatches?: boolean;

  @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class AdvanceCompetitionDto {
  @IsInt() @Min(1) expectedStage!: number;
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionScheduleDto)
  schedule!: CompetitionScheduleDto;

  /** Permite finalizar un torneo en modo «sobre la marcha» o editar la siguiente etapa. */
  @IsOptional() @IsBoolean() finishTournament?: boolean;
  @IsOptional() @IsInt() @Min(1) @Max(10000) qualifiersPerGroup?: number;
  @IsOptional() @IsInt() @Min(0) @Max(32) extraQualifiers?: number;
  @IsOptional() @IsIn(EXTRA_QUALIFIER_MODES)
  extraQualifierMode?: ExtraQualifierMode;
  @IsOptional()
  @ValidateNested()
  @Type(() => StageBlueprintDto)
  nextStage?: StageBlueprintDto;
}

export class CreateCompetitionTemplateDto {
  @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsIn(ORGANIZATION_MODES) mode?: OrganizationMode;
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ValidateNested({ each: true })
  @Type(() => StageBlueprintDto)
  blueprints?: StageBlueprintDto[];
}
