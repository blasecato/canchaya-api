import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListTournamentsQueryDto } from './dto/list-tournaments-query.dto';
import {
  TournamentCatalogFiltersResponseDto,
  TournamentCatalogItemResponseDto,
  TournamentCatalogPageResponseDto,
} from './dto/tournament-catalog-response.dto';
import { TournamentsService } from './tournaments.service';

@ApiTags('Public tournaments')
@Controller('public/tournaments')
export class PublicTournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get('active')
  @ApiOperation({
    summary: 'Consultar los seis torneos activos más recientes para el inicio',
  })
  @ApiOkResponse({ type: TournamentCatalogItemResponseDto, isArray: true })
  findActive(): Promise<TournamentCatalogItemResponseDto[]> {
    return this.tournamentsService.findFeaturedActive();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Consultar estadísticas públicas del inicio' })
  findStats(): Promise<{
    activeTournaments: number;
    associations: number;
    activePlayers: number;
  }> {
    return this.tournamentsService.findPublicStats();
  }

  @Get('catalog/filters')
  @ApiOperation({
    summary: 'Consultar filtros públicos del catálogo de torneos',
  })
  @ApiOkResponse({ type: TournamentCatalogFiltersResponseDto })
  findCatalogFilters(): Promise<TournamentCatalogFiltersResponseDto> {
    return this.tournamentsService.findCatalogFilterOptions();
  }

  @Get('catalog')
  @ApiOperation({
    summary: 'Listar torneos públicos activos con filtros y paginación',
  })
  @ApiOkResponse({ type: TournamentCatalogPageResponseDto })
  findCatalog(
    @Query() query: ListTournamentsQueryDto,
  ): Promise<TournamentCatalogPageResponseDto> {
    return this.tournamentsService.findCatalog(query);
  }
}
