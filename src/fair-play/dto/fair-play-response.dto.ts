import { ApiProperty } from '@nestjs/swagger';

export class FairPlayPlayerDto {
  @ApiProperty({ example: '9' })
  playerId!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  playerName!: string;

  @ApiProperty({ example: 3 })
  yellowCards!: number;

  @ApiProperty({ example: 1 })
  redCards!: number;
}

export class FairPlayTeamDto {
  @ApiProperty({ example: 1 })
  position!: number;

  @ApiProperty({ example: '7' })
  teamId!: string;

  @ApiProperty({ example: 'Atlético Pitalito' })
  teamName!: string;

  @ApiProperty({ nullable: true })
  photoUrl!: string | null;

  @ApiProperty({ example: 8, description: 'Partidos jugados del calendario vigente.' })
  matchesPlayed!: number;

  @ApiProperty({ example: 11 })
  yellowCards!: number;

  @ApiProperty({ example: 2 })
  redCards!: number;

  @ApiProperty({ example: 13, description: 'Amonestaciones totales: amarillas + rojas.' })
  totalCards!: number;

  @ApiProperty({
    example: 17,
    description: 'Puntos de juego limpio: menos puntos es mejor.',
  })
  fairPlayPoints!: number;

  @ApiProperty({ example: 2.13, description: 'Puntos por partido jugado.' })
  pointsPerMatch!: number;

  @ApiProperty({
    example: 1,
    description:
      'Tarjetas registradas en informes arbitrales. Se muestran aparte y no suman al puntaje.',
  })
  disciplinaryCards!: number;

  @ApiProperty({ type: FairPlayPlayerDto, isArray: true })
  players!: FairPlayPlayerDto[];
}

export class FairPlayResponseDto {
  @ApiProperty({ example: '12' })
  tournamentId!: string;

  @ApiProperty({ example: 1, description: 'Puntos que suma una tarjeta amarilla.' })
  yellowCardPoints!: number;

  @ApiProperty({ example: 3, description: 'Puntos que suma una tarjeta roja.' })
  redCardPoints!: number;

  @ApiProperty({ example: 42 })
  totalYellowCards!: number;

  @ApiProperty({ example: 5 })
  totalRedCards!: number;

  @ApiProperty({ type: FairPlayTeamDto, isArray: true })
  teams!: FairPlayTeamDto[];
}
