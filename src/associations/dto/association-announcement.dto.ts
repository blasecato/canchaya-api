import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const ANNOUNCEMENT_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function trimString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

function trimToNull(params: TransformFnParams): unknown {
  const value = trimString(params);
  return value === '' ? null : value;
}

/** Los campos llegan como multipart: convierte el texto numérico a número. */
function toOptionalNumber(params: TransformFnParams): unknown {
  const value = trimToNull(params);
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return value;
  const parsed = Number(value.replace(/[\s.]/g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : value;
}

const MAX_ANNOUNCEMENT_AMOUNT = 999999999999;

export class CreateAssociationAnnouncementDto {
  @ApiPropertyOptional({
    example: 'Muy pronto: Copa Regional 2027',
    nullable: true,
  })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  title?: string | null;

  @ApiPropertyOptional({
    example:
      'Prepárate para una nueva temporada. Próximamente más información.',
    nullable: true,
  })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1200)
  description?: string | null;

  @ApiProperty({ example: '2026-10-01', format: 'date' })
  @Transform(trimString)
  @IsString()
  @Matches(ANNOUNCEMENT_DATE_PATTERN, {
    message: 'La fecha inicial debe tener formato AAAA-MM-DD.',
  })
  startsOn!: string;

  @ApiProperty({ example: '2026-10-31', format: 'date' })
  @Transform(trimString)
  @IsString()
  @Matches(ANNOUNCEMENT_DATE_PATTERN, {
    message: 'La fecha final debe tener formato AAAA-MM-DD.',
  })
  endsOn!: string;

  @ApiPropertyOptional({ example: '+57 320 000 0000', nullable: true })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Matches(/^[0-9+()\s-]{7,30}$/, {
    message: 'El número de contacto no es válido.',
  })
  contactPhone?: string | null;

  @ApiPropertyOptional({ example: 'Cra 5 #12-34, Neiva', nullable: true })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @MaxLength(180)
  address?: string | null;

  @ApiPropertyOptional({ example: 150000, nullable: true })
  @Transform(toOptionalNumber)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(MAX_ANNOUNCEMENT_AMOUNT)
  registrationFee?: number | null;

  @ApiPropertyOptional({ example: '2026-10-05', format: 'date', nullable: true })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @Matches(ANNOUNCEMENT_DATE_PATTERN, {
    message: 'La fecha de inicio de inscripciones debe tener formato AAAA-MM-DD.',
  })
  registrationStartsOn?: string | null;

  @ApiPropertyOptional({ example: '2026-11-01', format: 'date', nullable: true })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @Matches(ANNOUNCEMENT_DATE_PATTERN, {
    message: 'La fecha de inicio del torneo debe tener formato AAAA-MM-DD.',
  })
  tournamentStartsOn?: string | null;

  @ApiPropertyOptional({ example: 2000000, nullable: true })
  @Transform(toOptionalNumber)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(MAX_ANNOUNCEMENT_AMOUNT)
  firstPlacePrize?: number | null;

  @ApiPropertyOptional({ example: 1000000, nullable: true })
  @Transform(toOptionalNumber)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(MAX_ANNOUNCEMENT_AMOUNT)
  secondPlacePrize?: number | null;
}

export class UpdateAssociationAnnouncementDto extends PartialType(
  CreateAssociationAnnouncementDto,
  { skipNullProperties: false },
) {}

export const ASSOCIATION_ANNOUNCEMENT_SCOPES = [
  'visible',
  'management',
] as const;
export type AssociationAnnouncementScope =
  (typeof ASSOCIATION_ANNOUNCEMENT_SCOPES)[number];

export class ListAssociationAnnouncementsQueryDto {
  @ApiPropertyOptional({
    enum: ASSOCIATION_ANNOUNCEMENT_SCOPES,
    default: 'visible',
  })
  @Transform(trimString)
  @IsOptional()
  @IsIn(ASSOCIATION_ANNOUNCEMENT_SCOPES)
  scope?: AssociationAnnouncementScope;
}

export const ASSOCIATION_ANNOUNCEMENT_VISIBILITIES = [
  'scheduled',
  'visible',
  'expired',
] as const;
export type AssociationAnnouncementVisibility =
  (typeof ASSOCIATION_ANNOUNCEMENT_VISIBILITIES)[number];

export class AssociationAnnouncementResponseDto {
  @ApiProperty({ example: '18', type: String })
  id!: string;

  @ApiProperty({ example: '7', type: String })
  associationId!: string;

  @ApiPropertyOptional({
    example: 'Muy pronto: Copa Regional 2027',
    nullable: true,
  })
  title!: string | null;

  @ApiProperty({ nullable: true })
  description!: string | null;

  @ApiProperty({ example: 'https://cdn.example.com/flyer.jpg' })
  imageUrl!: string;

  @ApiProperty({ example: '2026-10-01', format: 'date' })
  startsOn!: string;

  @ApiProperty({ example: '2026-10-31', format: 'date' })
  endsOn!: string;

  @ApiProperty({ nullable: true })
  contactPhone!: string | null;

  @ApiProperty({ nullable: true })
  address!: string | null;

  @ApiProperty({ example: 150000, nullable: true })
  registrationFee!: number | null;

  @ApiProperty({ example: '2026-10-05', format: 'date', nullable: true })
  registrationStartsOn!: string | null;

  @ApiProperty({ example: '2026-11-01', format: 'date', nullable: true })
  tournamentStartsOn!: string | null;

  @ApiProperty({ example: 2000000, nullable: true })
  firstPlacePrize!: number | null;

  @ApiProperty({ example: 1000000, nullable: true })
  secondPlacePrize!: number | null;

  @ApiProperty({ enum: ASSOCIATION_ANNOUNCEMENT_VISIBILITIES })
  visibility!: AssociationAnnouncementVisibility;

  @ApiProperty({ example: '2026-09-24T15:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-09-24T15:00:00.000Z' })
  updatedAt!: string;
}
