import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class RegisterTeamDto {
  @ApiProperty({ example: '40', type: String })
  @IsString()
  @Matches(/^\d+$/, { message: 'El identificador del equipo no es válido.' })
  teamId!: string;
}

export class CaptainTeamOptionResponseDto {
  @ApiProperty({ example: '40', type: String })
  id!: string;

  @ApiProperty({ example: 'Ladrillera Fútbol Club' })
  name!: string;

  @ApiProperty({ example: '/uploads/teams/team.jpg', nullable: true })
  photoUrl!: string | null;

  @ApiProperty({ example: 12, minimum: 0 })
  memberCount!: number;

  @ApiProperty({ example: null, nullable: true })
  registrationStatus!: string | null;
}

export class TeamRegistrationResponseDto {
  @ApiProperty({ example: '10', type: String })
  tournamentId!: string;

  @ApiProperty({ example: '40', type: String })
  teamId!: string;

  @ApiProperty({ example: 'pending' })
  status!: string;
}
