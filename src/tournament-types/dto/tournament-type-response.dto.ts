import { ApiProperty } from '@nestjs/swagger';

export class TournamentTypeResponseDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: 'Eliminación directa' })
  name!: string;

  @ApiProperty({ nullable: true })
  description!: string | null;

  @ApiProperty({ example: 7 })
  minPlayersPerTeam!: number;

  @ApiProperty({ example: 14 })
  maxPlayersPerTeam!: number;

  @ApiProperty({ nullable: true })
  instructions!: string | null;

  @ApiProperty({ example: 3 })
  tournamentCount!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;
}
