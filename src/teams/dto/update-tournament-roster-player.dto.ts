import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const emptyToNull = (value: unknown): unknown => {
  if (value === '' || value === null) return null;
  return value;
};

export class UpdateTournamentRosterPlayerDto {
  @ApiPropertyOptional({
    example: 10,
    minimum: 0,
    maximum: 999,
    nullable: true,
  })
  @Transform(({ value }: TransformFnParams): unknown => {
    const normalized = emptyToNull(value as unknown);
    return normalized === null || normalized === undefined
      ? normalized
      : Number(normalized);
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  jerseyNumber?: number | null;

  @ApiPropertyOptional({ example: 'Delantero', nullable: true })
  @Transform(({ value }: TransformFnParams): unknown => {
    if (value === null || value === undefined) return value;
    if (typeof value !== 'string') return value;
    return value.trim() || null;
  })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  position?: string | null;
}
