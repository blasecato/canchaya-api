import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { AssignRefereeDto } from './dto/assign-referee.dto';
import { ReplaceRefereeDto } from './dto/replace-referee.dto';
import { RespondRefereeAssignmentDto } from './dto/respond-referee-assignment.dto';
import { RefereeAssignmentsService } from './referee-assignments.service';
export declare class RefereeAssignmentsController {
    private readonly assignments;
    constructor(assignments: RefereeAssignmentsService);
    findAll(matchId: bigint, request: AuthenticatedRequest): Promise<{
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
    assign(matchId: bigint, request: AuthenticatedRequest, dto: AssignRefereeDto): Promise<{
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
    respond(matchId: bigint, refereeId: bigint, request: AuthenticatedRequest, dto: RespondRefereeAssignmentDto): Promise<{
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
    replace(matchId: bigint, refereeId: bigint, request: AuthenticatedRequest, dto: ReplaceRefereeDto): Promise<{
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
}
