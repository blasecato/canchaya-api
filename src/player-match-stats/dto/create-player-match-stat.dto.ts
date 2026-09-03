import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreatePlayerMatchStatDto {
  @ApiProperty({ example: '25' })
  @IsBigIntString()
  matchId: string;

  @ApiProperty({ example: '1' })
  @IsBigIntString()
  tournamentId: string;

  @ApiProperty({ example: '10' })
  @IsBigIntString()
  teamId: string;

  @ApiProperty({ example: '42' })
  @IsBigIntString()
  playerId: string;

  @ApiPropertyOptional({ example: 2, minimum: 0, default: 0 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  goals?: number;

  @ApiPropertyOptional({ example: 1, minimum: 0, default: 0 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  assists?: number;

  @ApiPropertyOptional({ example: 1, minimum: 0, default: 0 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  yellowCards?: number;

  @ApiPropertyOptional({ example: 0, minimum: 0, default: 0 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  redCards?: number;

  @ApiPropertyOptional({ example: 90, minimum: 0, default: 0 })
  @IsOptionalNonNullable()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  minutesPlayed?: number;
}
