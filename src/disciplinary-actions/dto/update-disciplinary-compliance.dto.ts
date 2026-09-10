import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDisciplinaryComplianceDto {
  @ApiPropertyOptional({ enum: ['served', 'revoked'] })
  @IsOptional()
  @IsIn(['served', 'revoked'])
  suspensionStatus?: 'served' | 'revoked';

  @ApiPropertyOptional({ enum: ['paid', 'waived', 'cancelled'] })
  @IsOptional()
  @IsIn(['paid', 'waived', 'cancelled'])
  fineStatus?: 'paid' | 'waived' | 'cancelled';

  @ApiPropertyOptional({ example: 'TRX-2026-001' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  paymentReference?: string;

  @ApiPropertyOptional({ example: 'Medida cumplida y verificada.' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  unblockAccount?: boolean;
}
