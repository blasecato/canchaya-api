import { ApiProperty } from '@nestjs/swagger';
import { TOURNAMENT_PHASES } from '../tournament-lifecycle.constants';
import type { TournamentPhase } from '../tournament-lifecycle.constants';
import { TournamentPaymentSummaryResponseDto } from './registration-payment.dto';

export class TournamentTransitionOptionResponseDto {
  @ApiProperty({ enum: TOURNAMENT_PHASES })
  phase!: TournamentPhase;

  @ApiProperty({ example: 'Validación' })
  label!: string;

  @ApiProperty({ example: true })
  allowed!: boolean;

  @ApiProperty({ type: String, isArray: true })
  blockers!: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    description:
      'Advertencias informativas que requieren confirmación, pero no impiden avanzar.',
  })
  warnings!: string[];

  @ApiProperty({ example: false })
  requiresReason!: boolean;
}

export class TournamentLifecycleEventResponseDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ enum: TOURNAMENT_PHASES, nullable: true })
  fromPhase!: TournamentPhase | null;

  @ApiProperty({ enum: TOURNAMENT_PHASES })
  toPhase!: TournamentPhase;

  @ApiProperty({ nullable: true })
  reason!: string | null;

  @ApiProperty({ example: '2026-09-06T12:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '10', type: String })
  actorUserId!: string;

  @ApiProperty({ example: 'Laura Gómez' })
  actorName!: string;
}

export class TournamentLifecycleResponseDto {
  @ApiProperty({ example: '7', type: String })
  tournamentId!: string;

  @ApiProperty({ enum: TOURNAMENT_PHASES })
  currentPhase!: TournamentPhase;

  @ApiProperty({ example: 'Inscripciones' })
  currentPhaseLabel!: string;

  @ApiProperty({ type: TournamentTransitionOptionResponseDto, isArray: true })
  transitions!: TournamentTransitionOptionResponseDto[];

  @ApiProperty({ type: TournamentPaymentSummaryResponseDto })
  paymentSummary!: TournamentPaymentSummaryResponseDto;

  @ApiProperty({ type: TournamentLifecycleEventResponseDto, isArray: true })
  history!: TournamentLifecycleEventResponseDto[];
}
