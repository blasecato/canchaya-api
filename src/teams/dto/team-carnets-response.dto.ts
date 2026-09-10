import { ApiProperty } from '@nestjs/swagger';

export class TeamCarnetTournamentResponseDto {
  @ApiProperty({ example: '7', type: String })
  id!: string;

  @ApiProperty({ example: 'Copa Relámpago Fútbol 7' })
  name!: string;

  @ApiProperty({ example: '2026-09-26', format: 'date' })
  startDate!: string;

  @ApiProperty({ example: '2026-10-16', format: 'date', nullable: true })
  endDate!: string | null;
}

export class TeamCarnetPlayerResponseDto {
  @ApiProperty({ example: '21', type: String })
  id!: string;

  @ApiProperty({ example: 'Julián Ramírez' })
  fullName!: string;

  @ApiProperty({ example: '1023456789' })
  idNumber!: string;

  @ApiProperty({ example: 'CC' })
  documentType!: string;

  @ApiProperty({ example: '1999-04-17', format: 'date' })
  birthDate!: string;

  @ApiProperty({ example: '+57 300 123 4567', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: 'jugador@canchaya.test' })
  email!: string;

  @ApiProperty({ example: '/uploads/users/player.webp', nullable: true })
  photoUrl!: string | null;

  @ApiProperty({ example: 10, nullable: true })
  jerseyNumber!: number | null;

  @ApiProperty({ example: 'Delantero', nullable: true })
  position!: string | null;
}

export class TeamCarnetsResponseDto {
  @ApiProperty({ example: '26', type: String })
  teamId!: string;

  @ApiProperty({ example: 'Amazonas FC' })
  teamName!: string;

  @ApiProperty({ example: 'Fútbol' })
  sportType!: string;

  @ApiProperty({ example: 'Sala' })
  modality!: string;

  @ApiProperty({ example: '#00994f', nullable: true })
  primaryColor!: string | null;

  @ApiProperty({ example: '#f6dc00', nullable: true })
  secondaryColor!: string | null;

  @ApiProperty({ example: '/uploads/teams/team.webp', nullable: true })
  photoUrl!: string | null;

  @ApiProperty({ type: TeamCarnetTournamentResponseDto, isArray: true })
  tournaments!: TeamCarnetTournamentResponseDto[];

  @ApiProperty({ type: TeamCarnetPlayerResponseDto, isArray: true })
  players!: TeamCarnetPlayerResponseDto[];
}
