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
import { FORMATS, type Format } from './competition.engine';
import { IsBigIntString } from '../common/decorators/is-big-int-string.decorator';

export class CompetitionConfigDto {
  @IsIn(FORMATS) format!: Format;
  @IsIn([1, 2]) legs!: number;
  @IsInt() @Min(1) @Max(10000) groups!: number;
  @IsInt() @Min(1) @Max(10000) qualifiers!: number;
  @IsIn([1, 2]) finalLegs!: number;
}
export class CompetitionScheduleDto {
  @IsOptional() @IsDateString() startAt?: string;
  @IsInt() @Min(15) @Max(240) durationMinutes!: number;
  @IsInt() @Min(0) @Max(240) breakMinutes!: number;
  @IsInt() @Min(1) @Max(16) matchesPerDay!: number;
  @IsInt() @Min(1) @Max(30) daysBetweenMatchDays!: number;
  @IsOptional() @IsString() @MaxLength(200) venue?: string;
}
export class PreviewCompetitionDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CompetitionConfigDto)
  config!: CompetitionConfigDto;
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
