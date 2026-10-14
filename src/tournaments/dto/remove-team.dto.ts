import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RemoveTeamFromTournamentDto {
  @ApiPropertyOptional({
    example: 'Se inscribió por error en esta categoría.',
    description: 'Motivo que se le informa al capitán del equipo.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class RemoveTeamFromTournamentResultDto {
  @ApiProperty({ example: '7' })
  teamId!: string;

  @ApiProperty({ example: 'Deportivo Pitalito' })
  teamName!: string;

  @ApiProperty({ example: 6, description: 'Partidos programados que se eliminaron.' })
  removedMatches!: number;

  @ApiProperty({ example: 12, description: 'Jugadores que salieron de la plantilla.' })
  removedPlayers!: number;

  @ApiProperty({ example: 4, description: 'Cupos libres después de sacarlo.' })
  availableSlots!: number;

  @ApiProperty({
    example: true,
    description: 'Si el equipo ocupaba un lugar del sorteo, quedó libre.',
  })
  freedDrawSlot!: boolean;
}
