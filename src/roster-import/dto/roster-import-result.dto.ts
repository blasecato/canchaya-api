import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const ROSTER_PLAYER_OUTCOMES = [
  /** Cuenta nueva creada y agregada al equipo y al torneo. */
  'created',
  /** Ya tenía cuenta; se agregó al equipo y al torneo. */
  'linked',
  /** Ya estaba en este mismo equipo dentro del torneo. */
  'already_in_team',
  /** No se pudo cargar; el motivo va en el detalle. */
  'rejected',
] as const;
export type RosterPlayerOutcome = (typeof ROSTER_PLAYER_OUTCOMES)[number];

export const ROSTER_TEAM_OUTCOMES = [
  /** Equipo creado desde cero con su plantilla. */
  'team_created',
  /** El equipo ya existía y quedó inscrito en el torneo. */
  'team_registered',
  /** Ya estaba inscrito; solo se completó la plantilla. */
  'roster_updated',
  /** Nada se guardó para esta hoja. */
  'rejected',
] as const;
export type RosterTeamOutcome = (typeof ROSTER_TEAM_OUTCOMES)[number];

export class RosterImportPlayerResultDto {
  @ApiProperty({ example: 4 })
  row!: number;

  @ApiProperty({ example: 'María Pérez' })
  fullName!: string;

  @ApiProperty({ example: 'CC' })
  documentType!: string;

  @ApiProperty({ example: '1020304050' })
  idNumber!: string;

  @ApiProperty({ example: 'maria.perez@correo.com' })
  email!: string;

  @ApiProperty({ example: 'Delantero', nullable: true })
  position!: string | null;

  @ApiProperty({ example: 10, nullable: true })
  jerseyNumber!: number | null;

  @ApiProperty({ example: false })
  isCaptain!: boolean;

  @ApiProperty({ enum: ROSTER_PLAYER_OUTCOMES })
  outcome!: RosterPlayerOutcome;

  @ApiProperty({
    example: 'Ya tenía cuenta en la plataforma; quedó en el equipo y en el torneo.',
  })
  detail!: string;
}

export class RosterImportTeamResultDto {
  @ApiProperty({ example: 'Deportivo Pitalito' })
  sheetName!: string;

  @ApiProperty({ example: 'Deportivo Pitalito' })
  teamName!: string;

  @ApiPropertyOptional({ example: '12' })
  teamId?: string | null;

  @ApiProperty({ enum: ROSTER_TEAM_OUTCOMES })
  outcome!: RosterTeamOutcome;

  @ApiProperty({
    example: 'Equipo creado e inscrito con 12 jugadores.',
    description: 'Resumen en lenguaje claro de lo que pasó con la hoja.',
  })
  detail!: string;

  @ApiProperty({ example: 9 })
  playersCreated!: number;

  @ApiProperty({ example: 3 })
  playersLinked!: number;

  @ApiProperty({ example: 1 })
  playersRejected!: number;

  @ApiProperty({ example: 12, description: 'Jugadores del equipo en el torneo.' })
  rosterSize!: number;

  @ApiProperty({ type: RosterImportPlayerResultDto, isArray: true })
  players!: RosterImportPlayerResultDto[];
}

export class RosterImportResultDto {
  @ApiProperty({ example: '12' })
  tournamentId!: string;

  @ApiProperty({ example: 10 })
  sheetsReceived!: number;

  @ApiProperty({ example: 8 })
  teamsImported!: number;

  @ApiProperty({ example: 2 })
  teamsRejected!: number;

  @ApiProperty({ example: 96 })
  playersCreated!: number;

  @ApiProperty({ example: 14 })
  playersLinked!: number;

  @ApiProperty({ example: 5 })
  playersRejected!: number;

  @ApiProperty({ example: 4, description: 'Cupos de equipos que quedan libres.' })
  availableSlots!: number;

  @ApiProperty({
    nullable: true,
    example: 'Asprofutpi2026*',
    description:
      'Clave temporal de las cuentas nuevas. Llega vacía si no se creó ninguna.',
  })
  temporaryPassword!: string | null;

  @ApiProperty({ type: RosterImportTeamResultDto, isArray: true })
  teams!: RosterImportTeamResultDto[];
}
