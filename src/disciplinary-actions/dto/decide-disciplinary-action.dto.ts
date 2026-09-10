import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class DisciplinarySuspensionDecisionDto {
  @ApiPropertyOptional({ example: 2, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  matchesCount?: number;

  @ApiPropertyOptional({ example: '2026-09-08' })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-09-30' })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  endDate?: string;

  @ApiPropertyOptional({ example: 'Conducta antideportiva grave.' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}

export class DisciplinaryFineDecisionDto {
  @ApiProperty({ example: 50000 })
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(999_999_999_999.99)
  amount: number;

  @ApiPropertyOptional({ example: '2026-09-30' })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  dueDate?: string;

  @ApiPropertyOptional({ example: 'Multa reglamentaria.' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

export class DisciplinaryBlockDecisionDto {
  @ApiProperty({
    enum: [
      'one_week',
      'one_month',
      'three_months',
      'six_months',
      'nine_months',
      'one_year',
    ],
  })
  @IsIn([
    'one_week',
    'one_month',
    'three_months',
    'six_months',
    'nine_months',
    'one_year',
  ])
  duration:
    | 'one_week'
    | 'one_month'
    | 'three_months'
    | 'six_months'
    | 'nine_months'
    | 'one_year';

  @ApiProperty({ example: 'Bloqueo preventivo por conducta grave.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}

export class DecideDisciplinaryActionDto {
  @ApiProperty({ enum: ['approved', 'dismissed'] })
  @IsIn(['approved', 'dismissed'])
  decision: 'approved' | 'dismissed';

  @ApiProperty({ example: 'Decisión basada en el informe y los antecedentes.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  notes: string;

  @ApiPropertyOptional({ type: DisciplinarySuspensionDecisionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DisciplinarySuspensionDecisionDto)
  suspension?: DisciplinarySuspensionDecisionDto;

  @ApiPropertyOptional({ type: DisciplinaryFineDecisionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DisciplinaryFineDecisionDto)
  fine?: DisciplinaryFineDecisionDto;

  @ApiPropertyOptional({ type: DisciplinaryBlockDecisionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DisciplinaryBlockDecisionDto)
  block?: DisciplinaryBlockDecisionDto;
}
