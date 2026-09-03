import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateDisciplinaryActionDto {
  @ApiProperty({ example: '1' })
  @IsBigIntString()
  tournamentId: string;

  @ApiPropertyOptional({ example: '25', nullable: true })
  @IsOptional()
  @IsBigIntString()
  matchId?: string | null;

  @ApiProperty({ example: '10' })
  @IsBigIntString()
  teamId: string;

  @ApiProperty({ example: '42' })
  @IsBigIntString()
  playerId: string;

  @ApiPropertyOptional({
    example: 'yellow',
    enum: ['none', 'yellow', 'double_yellow', 'red'],
    default: 'none',
  })
  @IsOptionalNonNullable()
  @IsIn(['none', 'yellow', 'double_yellow', 'red'])
  cardType?: string;

  @ApiProperty({ example: 'Conducta antideportiva.' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ example: '2026-09-10T21:35:00.000Z' })
  @IsOptionalNonNullable()
  @IsDateString({ strict: true, strictSeparator: true })
  occurredAt?: string;

  @ApiProperty({ example: '7' })
  @IsBigIntString()
  reportedBy: string;

  @ApiPropertyOptional({
    example: 'reported',
    enum: ['reported', 'approved', 'dismissed'],
    default: 'reported',
  })
  @IsOptionalNonNullable()
  @IsIn(['reported', 'approved', 'dismissed'])
  decisionStatus?: string;

  @ApiPropertyOptional({ example: '8', nullable: true })
  @IsOptional()
  @IsBigIntString()
  decidedBy?: string | null;

  @ApiPropertyOptional({
    example: '2026-09-11T14:00:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  decidedAt?: string | null;

  @ApiPropertyOptional({ example: 'Decisión confirmada.', nullable: true })
  @IsOptional()
  @IsString()
  decisionNotes?: string | null;
}
