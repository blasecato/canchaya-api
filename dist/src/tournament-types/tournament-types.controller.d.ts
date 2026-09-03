import { CreateTournamentTypeDto } from './dto/create-tournament-type.dto';
import { TournamentTypeResponseDto } from './dto/tournament-type-response.dto';
import { UpdateTournamentTypeDto } from './dto/update-tournament-type.dto';
import { TournamentTypesService } from './tournament-types.service';
export declare class TournamentTypesController {
    private readonly tournamentTypesService;
    constructor(tournamentTypesService: TournamentTypesService);
    create(createTournamentTypeDto: CreateTournamentTypeDto): Promise<TournamentTypeResponseDto>;
    findAll(): Promise<TournamentTypeResponseDto[]>;
    findOne(id: bigint): Promise<TournamentTypeResponseDto>;
    update(id: bigint, updateTournamentTypeDto: UpdateTournamentTypeDto): Promise<TournamentTypeResponseDto>;
    remove(id: bigint): Promise<TournamentTypeResponseDto>;
}
