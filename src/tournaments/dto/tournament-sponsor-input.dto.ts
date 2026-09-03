import { BadRequestException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  plainToInstance,
  Transform,
  Type,
  type TransformFnParams,
} from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
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
  ValidateNested,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export const SPONSOR_CONTRIBUTION_TYPES = [
  'money',
  'products',
  'services',
  'mixed',
] as const;

export const TOURNAMENT_SPONSOR_STATUSES = [
  'active',
  'inactive',
  'completed',
  'cancelled',
] as const;

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const nullableString = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') return value;
  const normalized = value.trim();
  return normalized === '' ? null : normalized;
};

const nullableNumber = ({ value }: TransformFnParams): unknown => {
  if (value === '' || value === null || value === undefined) return null;
  return typeof value === 'string' ? Number(value) : value;
};

export class TournamentSponsorInputDto {
  @ApiPropertyOptional({ example: '3', type: String })
  @Transform(trim)
  @IsOptional()
  @IsBigIntString()
  sponsorId?: string;

  @ApiProperty({ example: 'Deportes Andinos', maxLength: 160 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @ApiPropertyOptional({ example: '900123456-7', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(80)
  taxId?: string | null;

  @ApiPropertyOptional({ example: 'Laura Gómez', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  contactName?: string | null;

  @ApiPropertyOptional({ example: 'contacto@patrocinador.co', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string | null;

  @ApiPropertyOptional({ example: '+57 300 123 4567', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;

  @ApiPropertyOptional({ example: 'https://patrocinador.co', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @MaxLength(2048)
  websiteUrl?: string | null;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/logo.png',
    nullable: true,
  })
  @Transform(nullableString)
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @MaxLength(2048)
  logoUrl?: string | null;

  @ApiPropertyOptional({
    description:
      'Índice del archivo en sponsorLogos cuando el sponsor viene anidado en un formulario de torneo.',
    minimum: 0,
  })
  @Transform(nullableNumber)
  @IsOptional()
  @IsInt()
  @Min(0)
  logoFileIndex?: number;

  @ApiPropertyOptional({ example: 'Oro', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(80)
  sponsorshipLevel?: string | null;

  @ApiPropertyOptional({ enum: SPONSOR_CONTRIBUTION_TYPES, default: 'money' })
  @Transform(trim)
  @IsOptional()
  @IsIn(SPONSOR_CONTRIBUTION_TYPES)
  contributionType?: (typeof SPONSOR_CONTRIBUTION_TYPES)[number];

  @ApiPropertyOptional({ example: 2000000, nullable: true, minimum: 0 })
  @Transform(nullableNumber)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  contributionAmount?: number | null;

  @ApiPropertyOptional({ example: 'COP', default: 'COP' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @Length(3, 3)
  contributionCurrencyCode?: string;

  @ApiPropertyOptional({ nullable: true, maxLength: 2000 })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  contributionDescription?: string | null;

  @ApiPropertyOptional({ example: '2026-08-01', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  agreementStartDate?: string | null;

  @ApiPropertyOptional({ example: '2026-12-01', nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  agreementEndDate?: string | null;

  @ApiPropertyOptional({ enum: TOURNAMENT_SPONSOR_STATUSES, default: 'active' })
  @Transform(trim)
  @IsOptional()
  @IsIn(TOURNAMENT_SPONSOR_STATUSES)
  status?: (typeof TOURNAMENT_SPONSOR_STATUSES)[number];
}

function parseSponsors({ value }: TransformFnParams): unknown {
  if (typeof value !== 'string') return value;

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? plainToInstance(TournamentSponsorInputDto, parsed)
      : parsed;
  } catch {
    throw new BadRequestException(
      'La colección de patrocinadores no tiene un formato JSON válido.',
    );
  }
}

export class TournamentSponsorsInputDto {
  @ApiPropertyOptional({ type: TournamentSponsorInputDto, isArray: true })
  @Transform(parseSponsors)
  @Type(() => TournamentSponsorInputDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  sponsors?: TournamentSponsorInputDto[];
}
