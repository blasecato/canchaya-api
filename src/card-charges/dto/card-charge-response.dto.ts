import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsString } from 'class-validator';

export class CardChargeItemDto {
  @ApiProperty({ example: '12' })
  id!: string;

  @ApiProperty({ example: '44' })
  matchId!: string;

  @ApiProperty({ nullable: true })
  matchDate!: string | null;

  @ApiProperty({ enum: ['yellow', 'red'] })
  cardType!: 'yellow' | 'red';

  @ApiProperty({ example: 2 })
  quantity!: number;

  @ApiProperty({ example: '5000.00' })
  unitAmount!: string;

  @ApiProperty({ example: '10000.00' })
  totalAmount!: string;

  @ApiProperty({ enum: ['pending', 'paid'] })
  paymentStatus!: 'pending' | 'paid';

  @ApiProperty({ nullable: true })
  paidAt!: string | null;
}

export class CardChargeResponseDto {
  @ApiProperty({ example: '9' })
  playerId!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  playerName!: string;

  @ApiProperty({ example: 'COP' })
  currencyCode!: string;

  @ApiProperty({ example: 3 })
  pendingYellowCards!: number;

  @ApiProperty({ example: 1 })
  pendingRedCards!: number;

  @ApiProperty({ example: '30000.00' })
  pendingAmount!: string;

  @ApiProperty({ example: '5000.00' })
  paidAmount!: string;

  @ApiProperty({ type: CardChargeItemDto, isArray: true })
  charges!: CardChargeItemDto[];
}

export class TeamCardChargesResponseDto {
  @ApiProperty({ example: '7' })
  tournamentId!: string;

  @ApiProperty({ example: '3' })
  teamId!: string;

  @ApiProperty({ type: CardChargeResponseDto, isArray: true })
  players!: CardChargeResponseDto[];

  @ApiProperty({ example: '45000.00' })
  pendingTotal!: string;

  @ApiProperty({ example: '20000.00' })
  paidTotal!: string;
}

export class UpdateCardChargePaymentDto {
  @ApiProperty({ type: String, isArray: true, example: ['12', '13'] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  chargeIds!: string[];

  @ApiProperty({ example: true, description: 'true marca pagado, false lo devuelve a pendiente.' })
  @IsBoolean()
  paid!: boolean;
}

export class TournamentCardDebtDto {
  @ApiProperty({ example: '7' })
  tournamentId!: string;

  @ApiProperty({ example: 'Copa Pitalito' })
  tournamentName!: string;

  @ApiProperty({ example: 'Los Galácticos FC' })
  teamName!: string;

  @ApiProperty({ example: 'COP' })
  currencyCode!: string;

  @ApiProperty({ example: 2 })
  pendingYellowCards!: number;

  @ApiProperty({ example: 1 })
  pendingRedCards!: number;

  @ApiProperty({ example: '25000.00' })
  pendingAmount!: string;

  @ApiProperty({ example: '5000.00' })
  paidAmount!: string;

  @ApiProperty({ type: CardChargeItemDto, isArray: true })
  charges!: CardChargeItemDto[];
}

export class PlayerCardChargesSummaryDto {
  @ApiProperty({ type: TournamentCardDebtDto, isArray: true })
  tournaments!: TournamentCardDebtDto[];

  @ApiProperty({ example: '25000.00' })
  pendingTotal!: string;
}
