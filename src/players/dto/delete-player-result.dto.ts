import { ApiProperty } from '@nestjs/swagger';

export class DeletePlayerResultDto {
  @ApiProperty({ example: '42' })
  id!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  fullName!: string;

  @ApiProperty({ example: 2, description: 'Equipos de los que salió.' })
  removedTeamMemberships!: number;

  @ApiProperty({ example: 1, description: 'Inscripciones a torneos borradas.' })
  removedTournamentRosters!: number;
}
