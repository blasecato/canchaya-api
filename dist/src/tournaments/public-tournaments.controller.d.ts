import { ListTournamentsQueryDto } from './dto/list-tournaments-query.dto';
import { TournamentCatalogFiltersResponseDto, TournamentCatalogItemResponseDto, TournamentCatalogPageResponseDto } from './dto/tournament-catalog-response.dto';
import { TournamentsService } from './tournaments.service';
export declare class PublicTournamentsController {
    private readonly tournamentsService;
    constructor(tournamentsService: TournamentsService);
    findActive(): Promise<TournamentCatalogItemResponseDto[]>;
    findStats(): Promise<{
        activeTournaments: number;
        associations: number;
        activePlayers: number;
    }>;
    findCatalogFilters(): Promise<TournamentCatalogFiltersResponseDto>;
    findCatalog(query: ListTournamentsQueryDto): Promise<TournamentCatalogPageResponseDto>;
}
