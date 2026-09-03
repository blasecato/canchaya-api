import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const PLAYER_BLOCK_DURATIONS = [
  'one_week',
  'one_month',
  'three_months',
  'six_months',
  'nine_months',
  'one_year',
] as const;

export type PlayerBlockDuration = (typeof PLAYER_BLOCK_DURATIONS)[number];

export class BlockPlayerDto {
  @ApiProperty({ enum: PLAYER_BLOCK_DURATIONS })
  @IsIn(PLAYER_BLOCK_DURATIONS)
  duration!: PlayerBlockDuration;

  @ApiProperty({ example: 'Conducta antideportiva reiterada.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  reason!: string;
}
