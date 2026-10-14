import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { FairPlayResponseDto } from './dto/fair-play-response.dto';
import { FairPlayService } from './fair-play.service';
export declare class FairPlayController {
    private readonly fairPlay;
    constructor(fairPlay: FairPlayService);
    findByTournament(tournamentId: bigint, request: AuthenticatedRequest): Promise<FairPlayResponseDto>;
}
