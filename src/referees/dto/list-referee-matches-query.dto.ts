import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export const REFEREE_MATCH_KINDS = ['past', 'upcoming'] as const;
export type RefereeMatchKind = (typeof REFEREE_MATCH_KINDS)[number];

export class ListRefereeMatchesQueryDto {
  @ApiPropertyOptional({ enum: REFEREE_MATCH_KINDS, default: 'past' })
  @IsOptional()
  @IsIn(REFEREE_MATCH_KINDS)
  kind: RefereeMatchKind = 'past';

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  pageSize = 10;
}
