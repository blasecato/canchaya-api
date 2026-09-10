import { ApiProperty } from '@nestjs/swagger';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export class ReportOptionsQueryDto {
  @ApiProperty({ example: '25' })
  @IsBigIntString()
  matchId: string;
}
