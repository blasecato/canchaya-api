import { AssociationTournamentResponseDto } from '../associations/dto/association-tournament-response.dto';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentsService } from './tournaments.service';
export declare class TournamentsController {
    private readonly tournamentsService;
    constructor(tournamentsService: TournamentsService);
    create(associationId: bigint, request: AuthenticatedRequest, createTournamentDto: CreateTournamentDto, images?: {
        photo?: UploadedImageFile[];
        sponsorLogos?: UploadedImageFile[];
    }): Promise<AssociationTournamentResponseDto>;
    findOne(associationId: bigint, tournamentId: bigint, request: AuthenticatedRequest): Promise<AssociationTournamentResponseDto>;
    update(associationId: bigint, tournamentId: bigint, request: AuthenticatedRequest, updateTournamentDto: UpdateTournamentDto, images?: {
        photo?: UploadedImageFile[];
        sponsorLogos?: UploadedImageFile[];
    }): Promise<AssociationTournamentResponseDto>;
    remove(associationId: bigint, tournamentId: bigint, request: AuthenticatedRequest): Promise<AssociationTournamentResponseDto>;
}
