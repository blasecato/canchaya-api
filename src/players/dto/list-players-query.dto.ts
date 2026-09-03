import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class ListPlayersQueryDto {
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @ApiPropertyOptional({ enum: ['active', 'blocked'] })
  @IsOptional()
  @IsIn(['active', 'blocked'])
  status?: 'active' | 'blocked';

  @Transform(trim)
  @IsOptional()
  @IsBigIntString()
  teamId?: string;

  @Transform(trim)
  @IsOptional()
  @IsBigIntString()
  tournamentId?: string;

  @ApiPropertyOptional({ default: false })
  @Transform(
    ({ value }: TransformFnParams) => value === true || value === 'true',
  )
  @IsOptional()
  @IsBoolean()
  managedTournamentsOnly?: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  pageSize = 20;
}
