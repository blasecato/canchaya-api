import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export class ReplaceRefereeDto {
  @ApiProperty({ example: '12' })
  @IsBigIntString()
  newRefereeId: string;

  @ApiPropertyOptional({ example: 'El árbitro original reportó una novedad.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
