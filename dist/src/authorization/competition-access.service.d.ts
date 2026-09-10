import type { RoleCode } from '../auth/decorators/require-roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
export type MatchWriteAccess = 'manager' | 'main_referee';
export interface TournamentAccessScope {
    roles: Set<string>;
    tournamentIds: bigint[] | null;
}
export declare class CompetitionAccessService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findRoleCodes(userId: bigint): Promise<Set<string>>;
    findAccessibleTournamentScope(userId: bigint): Promise<TournamentAccessScope>;
    assertCanViewTournament(userId: bigint, tournamentId: bigint): Promise<void>;
    assertCanManageTournament(userId: bigint, tournamentId: bigint): Promise<void>;
    canUpdateTournamentPayments(userId: bigint, tournamentId: bigint): Promise<boolean>;
    assertCanUpdateTournamentPayments(userId: bigint, tournamentId: bigint): Promise<void>;
    assertTournamentInPhases(tournamentId: bigint, allowedPhases: readonly string[], message: string): Promise<string>;
    findManageableTournamentIds(userId: bigint): Promise<bigint[] | null>;
    assertCanViewMatch(userId: bigint, matchId: bigint): Promise<bigint>;
    resolveMatchWriteAccess(userId: bigint, matchId: bigint): Promise<{
        tournamentId: bigint;
        access: MatchWriteAccess;
    }>;
    assertCanManageMatch(userId: bigint, matchId: bigint): Promise<bigint>;
    assertHasAnyRole(userId: bigint, allowedRoles: readonly RoleCode[]): Promise<Set<string>>;
    private assertTournamentExists;
    private findMatchTournament;
}
