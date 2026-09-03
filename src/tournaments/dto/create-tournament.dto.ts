import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
  Matches,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';
import { TournamentSponsorsInputDto } from './tournament-sponsor-input.dto';

export const TOURNAMENT_PHASES = [
  'draft',
  'registration',
  'in_progress',
  'finished',
  'cancelled',
] as const;

export const TOURNAMENT_STATUSES = ['active', 'inactive'] as const;

export type TournamentPhase = (typeof TOURNAMENT_PHASES)[number];
export type TournamentStatus = (typeof TOURNAMENT_STATUSES)[number];

function trimString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

function trimNullableString({ value }: TransformFnParams): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const normalizedValue = value.trim();

  return normalizedValue === '' ? null : normalizedValue;
}

function emptyStringToNull({ value }: TransformFnParams): unknown {
  return typeof value === 'string' && value.trim() === '' ? null : value;
}

function toNumber({ value }: TransformFnParams): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const normalizedValue = value.trim();

  return normalizedValue === '' ? value : Number(normalizedValue);
}

export class CreateTournamentDto extends TournamentSponsorsInputDto {
  @ApiProperty({ example: 'Copa CanchaYa 2026', maxLength: 150 })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({ nullable: true, maxLength: 2000 })
  @Transform(trimNullableString)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string | null;

  @ApiProperty({ example: '1', type: String })
  @Transform(trimString)
  @IsBigIntString()
  tournamentTypeId!: string;

  @ApiProperty({ example: 'Fútbol', maxLength: 100 })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  sportType!: string;

  @ApiProperty({ example: 'Fútbol 11', maxLength: 100 })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  modality!: string;

  @ApiProperty({ example: '2026-09-01', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  startDate!: string;

  @ApiPropertyOptional({
    example: '2026-12-01',
    format: 'date',
    nullable: true,
  })
  @Transform(emptyStringToNull)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  endDate?: string | null;

  @ApiPropertyOptional({
    example: '2026-08-01',
    format: 'date',
    nullable: true,
  })
  @Transform(emptyStringToNull)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  registrationStartDate?: string | null;

  @ApiPropertyOptional({
    example: '2026-08-25',
    format: 'date',
    nullable: true,
  })
  @Transform(emptyStringToNull)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  registrationEndDate?: string | null;

  @ApiPropertyOptional({ example: 150000, minimum: 0, default: 0 })
  @Transform(toNumber)
  @IsOptionalNonNullable()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  registrationFee?: number;

  @ApiPropertyOptional({
    example: 'COP',
    minLength: 3,
    maxLength: 3,
    default: 'COP',
  })
  @Transform(trimString)
  @IsOptionalNonNullable()
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currencyCode?: string;

  @ApiPropertyOptional({ example: 5000000, minimum: 0, default: 0 })
  @Transform(toNumber)
  @IsOptionalNonNullable()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  grandPrize?: number;

  @ApiPropertyOptional({ example: 2500000, minimum: 0, default: 0 })
  @Transform(toNumber)
  @IsOptionalNonNullable()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  secondPrize?: number;

  @ApiPropertyOptional({ example: 1000000, minimum: 0, default: 0 })
  @Transform(toNumber)
  @IsOptionalNonNullable()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  thirdPrize?: number;

  @ApiProperty({ example: 16, minimum: 2 })
  @Transform(toNumber)
  @IsInt()
  @Min(2)
  @Max(2_147_483_647)
  maxTeams!: number;

  @ApiProperty({ example: 7, minimum: 1 })
  @Transform(toNumber)
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  minPlayersPerTeam!: number;

  @ApiProperty({ example: 25, minimum: 1 })
  @Transform(toNumber)
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  maxPlayersPerTeam!: number;

  @ApiPropertyOptional({
    example: 'Estadio Municipal',
    nullable: true,
    maxLength: 200,
  })
  @Transform(trimNullableString)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  locationName?: string | null;

  @ApiPropertyOptional({
    example: 'Carrera 5 # 10-20',
    nullable: true,
    maxLength: 300,
  })
  @Transform(trimNullableString)
  @IsOptional()
  @IsString()
  @MaxLength(300)
  locationAddress?: string | null;

  @ApiPropertyOptional({
    example: 'https://example.com/rules.pdf',
    nullable: true,
    maxLength: 2048,
  })
  @Transform(trimNullableString)
  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  })
  @MaxLength(2048)
  rulesUrl?: string | null;

  @ApiPropertyOptional({ enum: TOURNAMENT_PHASES, default: 'draft' })
  @Transform(trimString)
  @IsOptionalNonNullable()
  @IsIn(TOURNAMENT_PHASES)
  phase?: TournamentPhase;

  @ApiPropertyOptional({ enum: TOURNAMENT_STATUSES, default: 'active' })
  @Transform(trimString)
  @IsOptionalNonNullable()
  @IsIn(TOURNAMENT_STATUSES)
  status?: TournamentStatus;
}
