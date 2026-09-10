import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Matches,
  Min,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateSuspensionDto {
  @ApiProperty({ example: '12' })
  @IsBigIntString()
  disciplinaryActionId: string;

  @ApiPropertyOptional({
    example: 2,
    minimum: 1,
    nullable: true,
    description: 'Debe enviarse este campo o startDate.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  matchesCount?: number | null;

  @ApiPropertyOptional({
    example: '2026-09-15',
    nullable: true,
    description: 'Debe enviarse este campo o matchesCount.',
  })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  startDate?: string | null;

  @ApiPropertyOptional({ example: '2026-09-30', nullable: true })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  endDate?: string | null;

  @ApiPropertyOptional({ example: 'Sanción por tarjeta roja.', nullable: true })
  @IsOptional()
  @IsString()
  reason?: string | null;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'served', 'revoked'],
    default: 'active',
  })
  @IsOptionalNonNullable()
  @IsIn(['active', 'served', 'revoked'])
  status?: string;
}
