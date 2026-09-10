import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRefereeAvailabilityDto {
  @ApiProperty({ example: '2026-09-10T18:00:00.000Z' })
  @IsDateString({ strict: true, strictSeparator: true })
  startsAt: string;

  @ApiProperty({ example: '2026-09-10T23:00:00.000Z' })
  @IsDateString({ strict: true, strictSeparator: true })
  endsAt: string;

  @ApiPropertyOptional({ example: 'Disponible en Pitalito y alrededores.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
