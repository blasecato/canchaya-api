import { IsOptional } from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export class TeamCarnetsQueryDto {
  @IsOptional()
  @IsBigIntString()
  tournamentId?: string;
}
