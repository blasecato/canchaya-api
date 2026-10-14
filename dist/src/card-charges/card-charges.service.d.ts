import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionAccessService } from '../authorization/competition-access.service';
import type { PlayerCardChargesSummaryDto, TeamCardChargesResponseDto } from './dto/card-charge-response.dto';
type MatchCardEntry = {
    tournamentId: bigint;
    teamId: bigint;
    playerId: bigint;
    matchId: bigint;
    yellowCards: number;
    redCards: number;
};
export declare class CardChargesService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    syncMatchCards(client: Prisma.TransactionClient | PrismaService, entry: MatchCardEntry): Promise<void>;
    removeMatchCards(client: Prisma.TransactionClient | PrismaService, matchId: bigint, playerId: bigint): Promise<void>;
    findByTeam(tournamentId: bigint, teamId: bigint, requestingUserId: bigint): Promise<TeamCardChargesResponseDto>;
    private notifySettledPlayers;
    private formatAmount;
    private notifyPlayer;
    findMyCharges(playerId: bigint): Promise<PlayerCardChargesSummaryDto>;
    updatePayment(tournamentId: bigint, chargeIds: bigint[], paid: boolean, requestingUserId: bigint): Promise<{
        updated: number;
    }>;
}
export {};
