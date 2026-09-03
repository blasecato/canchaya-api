import { ApiProperty } from '@nestjs/swagger';
import { AssociationTournamentResponseDto } from '../../associations/dto/association-tournament-response.dto';

export class TournamentCatalogAssociationDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: 'Liga Deportiva Laboyana' })
  name!: string;
}

export class TournamentCatalogItemResponseDto extends AssociationTournamentResponseDto {
  @ApiProperty({ type: TournamentCatalogAssociationDto })
  association!: TournamentCatalogAssociationDto;

  @ApiProperty({
    example: true,
    description:
      'Indica si el usuario autenticado puede administrar este torneo.',
  })
  canManage!: boolean;
}

export class TournamentScorerResponseDto {
  @ApiProperty({ example: '21', type: String })
  id!: string;

  @ApiProperty({ example: 'Julián Ramírez' })
  name!: string;

  @ApiProperty({ example: 'Los Galácticos FC' })
  team!: string;

  @ApiProperty({ example: 9, minimum: 0 })
  goals!: number;
}

export class TournamentStandingResponseDto {
  @ApiProperty({ example: '4', type: String })
  teamId!: string;

  @ApiProperty({ example: 'Los Galácticos FC' })
  teamName!: string;

  @ApiProperty({ example: '#FFC400', nullable: true })
  primaryColor!: string | null;

  @ApiProperty({ example: 5, minimum: 0 })
  played!: number;

  @ApiProperty({ example: 4, minimum: 0 })
  wins!: number;

  @ApiProperty({ example: 1, minimum: 0 })
  draws!: number;

  @ApiProperty({ example: 0, minimum: 0 })
  losses!: number;

  @ApiProperty({ example: 14, minimum: 0 })
  goalsFor!: number;

  @ApiProperty({ example: 5, minimum: 0 })
  goalsAgainst!: number;

  @ApiProperty({ example: 13, minimum: 0 })
  points!: number;
}

export class TournamentDetailResponseDto extends TournamentCatalogItemResponseDto {
  @ApiProperty({ type: TournamentScorerResponseDto, isArray: true })
  scorers!: TournamentScorerResponseDto[];

  @ApiProperty({ type: TournamentStandingResponseDto, isArray: true })
  standings!: TournamentStandingResponseDto[];

  @ApiProperty({ example: 20, minimum: 0 })
  matchesPlayed!: number;

  @ApiProperty({ example: 68, minimum: 0 })
  totalGoals!: number;
}

export class TournamentRulesResponseDto {
  @ApiProperty({ example: '12', type: String })
  id!: string;

  @ApiProperty({
    example: '<h2>Reglas generales</h2><p>Todos los equipos...</p>',
    nullable: true,
  })
  rulesContent!: string | null;
}

export class TournamentCatalogPageResponseDto {
  @ApiProperty({ type: TournamentCatalogItemResponseDto, isArray: true })
  items!: TournamentCatalogItemResponseDto[];

  @ApiProperty({ example: 1, minimum: 1 })
  page!: number;

  @ApiProperty({ example: 10, minimum: 1, maximum: 10 })
  pageSize!: number;

  @ApiProperty({ example: 100, minimum: 0 })
  total!: number;

  @ApiProperty({ example: true })
  hasNextPage!: boolean;
}

export class TournamentCatalogFilterOptionDto {
  @ApiProperty({ example: '1', type: String })
  id!: string;

  @ApiProperty({ example: 'Liga Deportiva Laboyana' })
  name!: string;
}

export class TournamentCatalogFiltersResponseDto {
  @ApiProperty({ type: TournamentCatalogFilterOptionDto, isArray: true })
  associations!: TournamentCatalogFilterOptionDto[];

  @ApiProperty({ type: TournamentCatalogFilterOptionDto, isArray: true })
  categories!: TournamentCatalogFilterOptionDto[];
}
