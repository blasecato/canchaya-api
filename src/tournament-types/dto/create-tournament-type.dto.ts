import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const nullableString = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') return value;
  const normalized = value.trim();
  return normalized === '' ? null : normalized;
};

export class CreateTournamentTypeDto {
  @ApiProperty({ example: 'Eliminación directa' })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string | null;

  @ApiProperty({ example: 7, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  minPlayersPerTeam!: number;

  @ApiProperty({ example: 14, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  maxPlayersPerTeam!: number;

  @ApiPropertyOptional({ nullable: true, maxLength: 10000 })
  @Transform(nullableString)
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  instructions?: string | null;
}
