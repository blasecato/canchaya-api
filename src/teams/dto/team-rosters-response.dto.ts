import { ApiProperty } from '@nestjs/swagger';

export class TeamRosterPlayerResponseDto {
  @ApiProperty({ example: '12', type: String })
  id!: string;

  @ApiProperty({ example: 'Alejandro Acevedo' })
  fullName!: string;

  @ApiProperty({ example: '/uploads/users/player.webp', nullable: true })
  photoUrl!: string | null;

  @ApiProperty({ example: 10, nullable: true })
  jerseyNumber!: number | null;

  @ApiProperty({ example: 'Delantero', nullable: true })
  position!: string | null;

  @ApiProperty({ example: false })
  isCaptain!: boolean;
}

export class TeamTournamentRosterResponseDto {
  @ApiProperty({ example: '7', type: String })
  tournamentId!: string;

  @ApiProperty({ example: 'Copa Regional' })
  tournamentName!: string;

  @ApiProperty({ example: 'in_progress' })
  phase!: string;

  @ApiProperty({ example: 15 })
  minPlayers!: number;

  @ApiProperty({ example: 25 })
  maxPlayers!: number;

  @ApiProperty({ example: true })
  canEdit!: boolean;

  @ApiProperty({ type: TeamRosterPlayerResponseDto, isArray: true })
  players!: TeamRosterPlayerResponseDto[];
}

export class TeamRostersResponseDto {
  @ApiProperty({ example: '40', type: String })
  teamId!: string;

  @ApiProperty({ example: true })
  canManageMembers!: boolean;

  @ApiProperty({ type: TeamTournamentRosterResponseDto, isArray: true })
  tournaments!: TeamTournamentRosterResponseDto[];
}
