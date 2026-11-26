import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

export class TeamLineupSlotDto {
  @IsString()
  @MaxLength(20)
  slotKey!: string;

  @IsOptional()
  @IsBigIntString()
  playerId?: string | null;
}

export class UpdateTeamLineupDto {
  @IsString()
  @MaxLength(20)
  formation!: string;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => TeamLineupSlotDto)
  slots!: TeamLineupSlotDto[];
}
