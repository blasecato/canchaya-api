import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  TOURNAMENT_PHASES,
  type TournamentPhase,
} from '../tournament-lifecycle.constants';

const trimString = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class TransitionTournamentDto {
  @ApiProperty({ enum: TOURNAMENT_PHASES, example: 'registration' })
  @Transform(trimString)
  @IsIn(TOURNAMENT_PHASES)
  phase!: TournamentPhase;

  @ApiPropertyOptional({
    example: 'El evento no continuará por falta de escenario.',
    maxLength: 1000,
  })
  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
