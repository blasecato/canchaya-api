import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Matches,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateFineDto {
  @ApiProperty({ example: '12' })
  @IsBigIntString()
  disciplinaryActionId: string;

  @ApiProperty({ example: 50000.0, minimum: 0, exclusiveMinimum: true })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(999_999_999_999.99)
  amount: number;

  @ApiPropertyOptional({
    example: 'COP',
    default: 'COP',
    minLength: 3,
    maxLength: 3,
  })
  @IsOptionalNonNullable()
  @Matches(/^[A-Z]{3}$/)
  currencyCode?: string;

  @ApiPropertyOptional({ example: '2026-10-01', nullable: true })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  dueDate?: string | null;

  @ApiPropertyOptional({
    example: 'pending',
    enum: ['pending', 'paid', 'waived', 'cancelled'],
    default: 'pending',
  })
  @IsOptionalNonNullable()
  @IsIn(['pending', 'paid', 'waived', 'cancelled'])
  paymentStatus?: string;

  @ApiPropertyOptional({
    example: '2026-09-15T14:00:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  paidAt?: string | null;

  @ApiPropertyOptional({ example: 'PAY-2026-0001', nullable: true })
  @IsOptional()
  @IsString()
  paymentReference?: string | null;

  @ApiPropertyOptional({ example: 'Pago por transferencia.', nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;

  @ApiProperty({ example: '7' })
  @IsBigIntString()
  createdBy: string;
}
