import { ApiProperty } from '@nestjs/swagger';
import {
  TOURNAMENT_CATEGORY_GENDERS,
  type TournamentCategoryGender,
} from '../../tournaments/tournament-category.constants';

export class AssociationTournamentTypeResponseDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: 'Eliminación directa' })
  name!: string;

  @ApiProperty({
    example: 'Los equipos compiten en llaves de eliminación directa.',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({ example: 7, minimum: 1 })
  minPlayersPerTeam!: number;

  @ApiProperty({ example: 14, minimum: 1 })
  maxPlayersPerTeam!: number;

  @ApiProperty({
    example: 'Cada llave se juega a partido único.',
    nullable: true,
  })
  instructions!: string | null;
}

export class TournamentSponsorResponseDto {
  @ApiProperty({ example: '3', type: String })
  sponsorId!: string;

  @ApiProperty({ example: 'Deportes Andinos' })
  name!: string;

  @ApiProperty({ example: '900123456-7', nullable: true })
  taxId!: string | null;

  @ApiProperty({ example: 'Laura Gómez', nullable: true })
  contactName!: string | null;

  @ApiProperty({ example: 'contacto@patrocinador.co', nullable: true })
  email!: string | null;

  @ApiProperty({ example: '+57 300 123 4567', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: 'https://patrocinador.co', nullable: true })
  websiteUrl!: string | null;

  @ApiProperty({ example: 'https://cdn.example.com/logo.png', nullable: true })
  logoUrl!: string | null;

  @ApiProperty({ example: 'Oro', nullable: true })
  sponsorshipLevel!: string | null;

  @ApiProperty({ enum: ['money', 'products', 'services', 'mixed'] })
  contributionType!: 'money' | 'products' | 'services' | 'mixed';

  @ApiProperty({ example: '2000000.00', nullable: true, type: String })
  contributionAmount!: string | null;

  @ApiProperty({ example: 'COP' })
  contributionCurrencyCode!: string;

  @ApiProperty({ nullable: true })
  contributionDescription!: string | null;

  @ApiProperty({ example: '2026-08-01', nullable: true })
  agreementStartDate!: string | null;

  @ApiProperty({ example: '2026-12-01', nullable: true })
  agreementEndDate!: string | null;

  @ApiProperty({ enum: ['active', 'inactive', 'completed', 'cancelled'] })
  status!: 'active' | 'inactive' | 'completed' | 'cancelled';
}

export class AssociationTournamentResponseDto {
  @ApiProperty({ example: '12', type: String })
  id!: string;

  @ApiProperty({ example: '1', type: String })
  associationId!: string;

  @ApiProperty({ example: 'Copa CanchaYa 2026' })
  name!: string;

  @ApiProperty({ example: 'Torneo regional de fútbol.', nullable: true })
  description!: string | null;

  @ApiProperty({ type: AssociationTournamentTypeResponseDto })
  tournamentType!: AssociationTournamentTypeResponseDto;

  @ApiProperty({ example: 'football' })
  sportType!: string;

  @ApiProperty({ example: '11v11' })
  modality!: string;

  @ApiProperty({ example: 'Sub-15' })
  categoryName!: string;

  @ApiProperty({ example: 12, nullable: true })
  categoryMinAge!: number | null;

  @ApiProperty({ example: 15, nullable: true })
  categoryMaxAge!: number | null;

  @ApiProperty({ enum: TOURNAMENT_CATEGORY_GENDERS, example: 'male' })
  categoryGender!: TournamentCategoryGender;

  @ApiProperty({ example: '2026-09-01', format: 'date' })
  startDate!: string;

  @ApiProperty({ example: '2026-12-01', format: 'date', nullable: true })
  endDate!: string | null;

  @ApiProperty({ example: '2026-08-01', format: 'date', nullable: true })
  registrationStartDate!: string | null;

  @ApiProperty({ example: '2026-08-25', format: 'date', nullable: true })
  registrationEndDate!: string | null;

  @ApiProperty({ example: '150000.00', type: String })
  registrationFee!: string;

  @ApiProperty({ example: 'COP', minLength: 3, maxLength: 3 })
  currencyCode!: string;

  @ApiProperty({ example: '5000000.00', type: String })
  grandPrize!: string;

  @ApiProperty({ example: '2500000.00', type: String })
  secondPrize!: string;

  @ApiProperty({ example: '1000000.00', type: String })
  thirdPrize!: string;

  @ApiProperty({ example: 16, minimum: 2 })
  maxTeams!: number;

  @ApiProperty({ example: 7, minimum: 1 })
  minPlayersPerTeam!: number;

  @ApiProperty({ example: 25, minimum: 1 })
  maxPlayersPerTeam!: number;

  @ApiProperty({ example: 8, minimum: 0 })
  registeredTeamCount!: number;

  @ApiProperty({ example: 'Estadio Municipal', nullable: true })
  locationName!: string | null;

  @ApiProperty({ example: 'Carrera 5 # 10-20', nullable: true })
  locationAddress!: string | null;

  @ApiProperty({ example: 'https://example.com/rules.pdf', nullable: true })
  rulesUrl!: string | null;

  @ApiProperty({
    example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
    nullable: true,
    description: 'Reglamento enriquecido sanitizado en formato HTML.',
  })
  rulesContent!: string | null;

  @ApiProperty({
    example: 'https://example.com/tournament.png',
    nullable: true,
  })
  photoUrl!: string | null;

  @ApiProperty({ type: TournamentSponsorResponseDto, isArray: true })
  sponsors!: TournamentSponsorResponseDto[];

  @ApiProperty({
    enum: [
      'draft',
      'registration',
      'validation',
      'scheduled',
      'in_progress',
      'finished',
      'archived',
      'cancelled',
    ],
    example: 'registration',
  })
  phase!:
    | 'draft'
    | 'registration'
    | 'validation'
    | 'scheduled'
    | 'in_progress'
    | 'finished'
    | 'archived'
    | 'cancelled';

  @ApiProperty({ enum: ['active', 'inactive'], example: 'active' })
  status!: 'active' | 'inactive';

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ example: '2026-08-22T18:00:00.000Z', format: 'date-time' })
  updatedAt!: string;
}
