import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class RespondRefereeAssignmentDto {
  @ApiProperty({ enum: ['accepted', 'rejected'], example: 'accepted' })
  @IsIn(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';

  @ApiPropertyOptional({ example: 'No estaré en la ciudad ese día.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
