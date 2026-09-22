import { CompetitionAccessService } from '../authorization/competition-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssignRefereeDto } from './dto/assign-referee.dto';
import { ReplaceRefereeDto } from './dto/replace-referee.dto';
import { RespondRefereeAssignmentDto } from './dto/respond-referee-assignment.dto';
export declare class RefereeAssignmentsService {
    private readonly prisma;
    private readonly access;
    constructor(prisma: PrismaService, access: CompetitionAccessService);
    findAssignableMatches(managerId: bigint, refereeId: bigint): Promise<{
        id: string;
        tournamentId: string;
        tournamentName: string;
        tournamentPhase: string;
        matchDate: string | null;
        durationMinutes: number;
        venue: string | null;
        status: string;
        stage: string;
        homeTeam: string;
        awayTeam: string;
        assignments: {
            refereeId: string;
            refereeName: string;
            role: string;
            status: string;
        }[];
    }[]>;
    findMatchAssignments(managerId: bigint, matchId: bigint): Promise<{
        matchId: string;
        refereeId: string;
        refereeRole: string;
        assignmentStatus: string;
        assignedBy: string | null;
        respondedAt: string | null;
        responseNotes: string | null;
        replacementReason: string | null;
        createdAt: string;
        updatedAt: string;
        referee: {
            id: string;
            fullName: string;
            email: string;
            photoUrl: string | null;
        };
        match: {
            id: string;
            tournamentId: string;
            tournamentName: string;
            tournamentPhase: string;
            matchDate: string | null;
            durationMinutes: number;
            venue: string | null;
            status: string;
            stage: string;
            homeTeam: {
                id: string;
                name: string;
            };
            awayTeam: {
                id: string;
                name: string;
            };
        };
    }[]>;
    assign(managerId: bigint, matchId: bigint, dto: AssignRefereeDto): Promise<{
        matchId: string;
        refereeId: string;
        refereeRole: string;
        assignmentStatus: string;
        assignedBy: string | null;
        respondedAt: string | null;
        responseNotes: string | null;
        replacementReason: string | null;
        createdAt: string;
        updatedAt: string;
        referee: {
            id: string;
            fullName: string;
            email: string;
            photoUrl: string | null;
        };
        match: {
            id: string;
            tournamentId: string;
            tournamentName: string;
            tournamentPhase: string;
            matchDate: string | null;
            durationMinutes: number;
            venue: string | null;
            status: string;
            stage: string;
            homeTeam: {
                id: string;
                name: string;
            };
            awayTeam: {
                id: string;
                name: string;
            };
        };
    }>;
    respond(refereeId: bigint, matchId: bigint, dto: RespondRefereeAssignmentDto): Promise<{
        matchId: string;
        refereeId: string;
        refereeRole: string;
        assignmentStatus: string;
        assignedBy: string | null;
        respondedAt: string | null;
        responseNotes: string | null;
        replacementReason: string | null;
        createdAt: string;
        updatedAt: string;
        referee: {
            id: string;
            fullName: string;
            email: string;
            photoUrl: string | null;
        };
        match: {
            id: string;
            tournamentId: string;
            tournamentName: string;
            tournamentPhase: string;
            matchDate: string | null;
            durationMinutes: number;
            venue: string | null;
            status: string;
            stage: string;
            homeTeam: {
                id: string;
                name: string;
            };
            awayTeam: {
                id: string;
                name: string;
            };
        };
    }>;
    replace(managerId: bigint, matchId: bigint, currentRefereeId: bigint, dto: ReplaceRefereeDto): Promise<{
        matchId: string;
        refereeId: string;
        refereeRole: string;
        assignmentStatus: string;
        assignedBy: string | null;
        respondedAt: string | null;
        responseNotes: string | null;
        replacementReason: string | null;
        createdAt: string;
        updatedAt: string;
        referee: {
            id: string;
            fullName: string;
            email: string;
            photoUrl: string | null;
        };
        match: {
            id: string;
            tournamentId: string;
            tournamentName: string;
            tournamentPhase: string;
            matchDate: string | null;
            durationMinutes: number;
            venue: string | null;
            status: string;
            stage: string;
            homeTeam: {
                id: string;
                name: string;
            };
            awayTeam: {
                id: string;
                name: string;
            };
        };
    }>;
    assertActiveAssignmentsCompatible(matchId: bigint, matchDate: Date | null): Promise<void>;
    private findAssignment;
    private findAssignableMatch;
    private assertActiveReferee;
    private assertCanAttend;
    private assertRoleIsAvailable;
    private persistPendingAssignment;
    private notifyTournamentManagers;
    private toResponse;
    private rethrowAssignmentConflict;
}
