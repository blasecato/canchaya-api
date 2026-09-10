import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export class AssignRefereeDto {
  @ApiProperty({ example: '9' })
  @IsBigIntString()
  refereeId: string;

  @ApiProperty({ enum: ['main', 'assistant'], example: 'main' })
  @IsIn(['main', 'assistant'])
  role: 'main' | 'assistant';
}
