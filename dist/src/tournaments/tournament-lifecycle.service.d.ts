import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import type { TournamentLifecycleResponseDto } from './dto/tournament-lifecycle-response.dto';
import type { TransitionTournamentDto } from './dto/transition-tournament.dto';
export declare class TournamentLifecycleService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    findLifecycle(tournamentId: bigint, requestingUserId: bigint): Promise<TournamentLifecycleResponseDto>;
    transition(tournamentId: bigint, requestingUserId: bigint, dto: TransitionTournamentDto): Promise<TournamentLifecycleResponseDto>;
    private buildTransitionOptions;
    private findWarnings;
    private buildPaymentSummary;
    private formatAmount;
    private findBlockers;
    private findSnapshot;
    private notifyLifecycleChange;
    private toPhase;
    private toNullablePhase;
}
