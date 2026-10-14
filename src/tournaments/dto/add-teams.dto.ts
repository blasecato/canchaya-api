import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';

export const MAX_TEAMS_PER_BATCH = 50;

export class AddTeamsToTournamentDto {
  @ApiProperty({ type: String, isArray: true, example: ['3', '7'] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(MAX_TEAMS_PER_BATCH, {
    message: `Puedes agregar máximo ${MAX_TEAMS_PER_BATCH} equipos a la vez.`,
  })
  @IsString({ each: true })
  teamIds!: string[];
}

export class AddedTeamDto {
  @ApiProperty({ example: '3' })
  teamId!: string;

  @ApiProperty({ example: 'Los Galácticos FC' })
  teamName!: string;
}

export class RejectedTeamDto {
  @ApiProperty({ example: '7' })
  teamId!: string;

  @ApiProperty({ example: 'Vereda FC' })
  teamName!: string;

  @ApiProperty({
    example: 'Dos jugadores superan la edad máxima de la categoría.',
  })
  reason!: string;
}

export class AddTeamsResultDto {
  @ApiProperty({ type: AddedTeamDto, isArray: true })
  added!: AddedTeamDto[];

  @ApiProperty({ type: RejectedTeamDto, isArray: true })
  rejected!: RejectedTeamDto[];

  @ApiProperty({ example: 12, description: 'Cupos libres después de agregar.' })
  availableSlots!: number;
}
