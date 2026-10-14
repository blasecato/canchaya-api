import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { FairPlayResponseDto } from './dto/fair-play-response.dto';
export declare const YELLOW_CARD_POINTS = 1;
export declare const RED_CARD_POINTS = 3;
export declare class FairPlayService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    findByTournament(tournamentId: bigint, requestingUserId: bigint): Promise<FairPlayResponseDto>;
}
