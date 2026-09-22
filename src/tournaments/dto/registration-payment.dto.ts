import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export const REGISTRATION_PAYMENT_STATUSES = [
  'unpaid',
  'partial',
  'paid',
] as const;

export type RegistrationPaymentStatus =
  (typeof REGISTRATION_PAYMENT_STATUSES)[number];

export class UpdateRegistrationPaymentDto {
  @ApiProperty({ enum: REGISTRATION_PAYMENT_STATUSES, example: 'partial' })
  @IsIn(REGISTRATION_PAYMENT_STATUSES)
  paymentStatus!: RegistrationPaymentStatus;

  @ApiPropertyOptional({
    example: 100000,
    minimum: 0,
    description:
      'Valor recibido. Es obligatorio únicamente para un pago parcial.',
  })
  @Transform(({ value }: { value: unknown }) =>
    value === '' || value === null || value === undefined
      ? undefined
      : Number(value),
  )
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999_999_999.99)
  amountPaid?: number;

  @ApiPropertyOptional({
    example: 'Abono recibido en efectivo en la sede de la asociación.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string | null;
}

export class RegistrationPaymentUserResponseDto {
  @ApiProperty({ example: '12', type: String })
  id!: string;

  @ApiProperty({ example: 'Laura Gómez' })
  fullName!: string;
}

export class TournamentRegistrationPaymentResponseDto {
  @ApiProperty({ example: '40', type: String })
  teamId!: string;

  @ApiProperty({ example: 'Ladrillera Fútbol Club' })
  teamName!: string;

  @ApiProperty({ enum: REGISTRATION_PAYMENT_STATUSES })
  paymentStatus!: RegistrationPaymentStatus;

  @ApiProperty({ example: '150000.00' })
  registrationFee!: string;

  @ApiProperty({ example: '50000.00' })
  amountPaid!: string;

  @ApiProperty({ example: '100000.00' })
  balanceDue!: string;

  @ApiProperty({ example: null, nullable: true })
  notes!: string | null;

  @ApiProperty({ example: null, nullable: true })
  updatedAt!: string | null;

  @ApiProperty({
    type: RegistrationPaymentUserResponseDto,
    nullable: true,
  })
  updatedBy!: RegistrationPaymentUserResponseDto | null;
}

export class MyTournamentTeamPaymentResponseDto {
  @ApiProperty({ example: '40', type: String })
  teamId!: string;

  @ApiProperty({ example: 'Ladrillera Fútbol Club' })
  teamName!: string;

  @ApiProperty({ enum: REGISTRATION_PAYMENT_STATUSES })
  paymentStatus!: RegistrationPaymentStatus;

  @ApiProperty({ example: '150000.00' })
  registrationFee!: string;

  @ApiProperty({ example: '50000.00' })
  amountPaid!: string;

  @ApiProperty({ example: '100000.00' })
  balanceDue!: string;

  @ApiProperty({ example: null, nullable: true })
  updatedAt!: string | null;
}

export class MyTournamentPaymentResponseDto {
  @ApiProperty({ example: '7', type: String })
  tournamentId!: string;

  @ApiProperty({ example: 'Copa Surcolombiana' })
  tournamentName!: string;

  @ApiProperty({ example: 'COP' })
  currencyCode!: string;

  @ApiProperty({ type: MyTournamentTeamPaymentResponseDto })
  payment!: MyTournamentTeamPaymentResponseDto;
}

export class TournamentPaymentSummaryResponseDto {
  @ApiProperty({ example: 8 })
  totalTeams!: number;

  @ApiProperty({ example: 5 })
  paidTeams!: number;

  @ApiProperty({ example: 2 })
  partialTeams!: number;

  @ApiProperty({ example: 1 })
  unpaidTeams!: number;

  @ApiProperty({ example: '1200000.00' })
  expectedAmount!: string;

  @ApiProperty({ example: '950000.00' })
  totalPaid!: string;

  @ApiProperty({ example: '250000.00' })
  totalBalance!: string;

  @ApiProperty({ example: false })
  allPaid!: boolean;
}

export class TournamentPaymentsResponseDto {
  @ApiProperty({ example: '7', type: String })
  tournamentId!: string;

  @ApiProperty({ example: 'Copa Surcolombiana' })
  tournamentName!: string;

  @ApiProperty({ example: 'COP' })
  currencyCode!: string;

  @ApiProperty({ example: '150000.00' })
  registrationFee!: string;

  @ApiProperty({ example: true })
  canUpdate!: boolean;

  @ApiProperty({ type: TournamentPaymentSummaryResponseDto })
  summary!: TournamentPaymentSummaryResponseDto;

  @ApiProperty({
    type: TournamentRegistrationPaymentResponseDto,
    isArray: true,
  })
  registrations!: TournamentRegistrationPaymentResponseDto[];
}
