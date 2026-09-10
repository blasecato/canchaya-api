import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateMatchDto {
  @ApiProperty({ example: '1' })
  @IsBigIntString()
  tournamentId: string;

  @ApiProperty({ example: '10' })
  @IsBigIntString()
  homeTeamId: string;

  @ApiProperty({ example: '11' })
  @IsBigIntString()
  awayTeamId: string;

  @ApiPropertyOptional({
    example: '2026-09-10T20:00:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  matchDate?: string | null;

  @ApiPropertyOptional({ example: 'Estadio Municipal', nullable: true })
  @IsOptional()
  @IsString()
  venue?: string | null;

  @ApiProperty({ example: 'group_stage' })
  @IsString()
  @IsNotEmpty()
  stage: string;

  @ApiPropertyOptional({ example: 1, minimum: 1, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  roundNumber?: number | null;

  @ApiPropertyOptional({ example: 2, minimum: 0, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  homeScore?: number | null;

  @ApiPropertyOptional({ example: 1, minimum: 0, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  awayScore?: number | null;

  @ApiPropertyOptional({
    example: 'scheduled',
    enum: ['scheduled', 'in_progress', 'played', 'postponed', 'cancelled'],
    default: 'scheduled',
  })
  @IsOptionalNonNullable()
  @IsIn(['scheduled', 'in_progress', 'played', 'postponed', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({ example: 120, minimum: 15, maximum: 1440 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(15)
  @Max(1440)
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'Partido de apertura.', nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;
}
