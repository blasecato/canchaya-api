import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResolveDisciplinaryAppealDto {
  @ApiProperty({ enum: ['accepted', 'rejected'] })
  @IsIn(['accepted', 'rejected'])
  decision: 'accepted' | 'rejected';

  @ApiProperty({ example: 'La evidencia aportada permite resolver...' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  notes: string;
}
