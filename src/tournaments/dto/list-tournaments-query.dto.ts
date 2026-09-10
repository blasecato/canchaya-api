import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Max,
  Min,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import {
  TOURNAMENT_PHASES,
  type TournamentPhase,
} from '../tournament-lifecycle.constants';
import {
  TOURNAMENT_CATEGORY_GENDERS,
  type TournamentCategoryGender,
} from '../tournament-category.constants';

const trimString = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class ListTournamentsQueryDto {
  @ApiPropertyOptional({ example: '1', type: String })
  @Transform(trimString)
  @IsOptional()
  @IsBigIntString()
  associationId?: string;

  @ApiPropertyOptional({ default: false })
  @Transform(
    ({ value }: TransformFnParams) => value === true || value === 'true',
  )
  @IsOptional()
  @IsBoolean()
  managedOnly?: boolean;

  @ApiPropertyOptional({ example: '1', type: String })
  @Transform(trimString)
  @IsOptional()
  @IsBigIntString()
  tournamentTypeId?: string;

  @ApiPropertyOptional({ example: 'Sub-15', maxLength: 120 })
  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @ApiPropertyOptional({ enum: TOURNAMENT_CATEGORY_GENDERS })
  @Transform(trimString)
  @IsOptional()
  @IsIn(TOURNAMENT_CATEGORY_GENDERS)
  categoryGender?: TournamentCategoryGender;

  @ApiPropertyOptional({ example: '2026-08-01', format: 'date' })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2026-12-31', format: 'date' })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  dateTo?: string;

  @ApiPropertyOptional({ enum: TOURNAMENT_PHASES })
  @Transform(trimString)
  @IsOptional()
  @IsIn(TOURNAMENT_PHASES)
  phase?: TournamentPhase;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  pageSize = 10;
}
