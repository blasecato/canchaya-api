import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateRefereeAvailabilityDto } from './dto/create-referee-availability.dto';
import { ListRefereeAvailabilityQueryDto } from './dto/list-referee-availability-query.dto';
import { ListRefereeMatchesQueryDto } from './dto/list-referee-matches-query.dto';
import { UpdateRefereeAvailabilityDto } from './dto/update-referee-availability.dto';
import { RefereeAssignmentsService } from './referee-assignments.service';
import { RefereesService } from './referees.service';
export declare class RefereesController {
    private readonly refereesService;
    private readonly assignmentsService;
    constructor(refereesService: RefereesService, assignmentsService: RefereeAssignmentsService);
    findAll(search?: string): Promise<{
        items: {
            id: string;
            fullName: string;
            email: string;
            phone: string | null;
            idNumber: string;
            documentType: string;
            photoUrl: string | null;
            directedMatches: number;
            upcomingMatches: number;
            availableToday: boolean;
        }[];
        metrics: {
            total: number;
            availableToday: number;
        };
    }>;
    findMyAvailability(request: AuthenticatedRequest, query: ListRefereeAvailabilityQueryDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }[]>;
    createMyAvailability(request: AuthenticatedRequest, dto: CreateRefereeAvailabilityDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }>;
    updateMyAvailability(request: AuthenticatedRequest, availabilityId: bigint, dto: UpdateRefereeAvailabilityDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }>;
    removeMyAvailability(request: AuthenticatedRequest, availabilityId: bigint): Promise<{
        message: string;
    }>;
    findAvailability(id: bigint, request: AuthenticatedRequest, query: ListRefereeAvailabilityQueryDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }[]>;
    findAssignableMatches(id: bigint, request: AuthenticatedRequest): Promise<{
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
    findMatches(id: bigint, request: AuthenticatedRequest, query: ListRefereeMatchesQueryDto): Promise<{
        items: {
            id: string;
            matchDate: string | null;
            venue: string | null;
            stage: string;
            roundNumber: number | null;
            status: string;
            homeScore: number | null;
            awayScore: number | null;
            refereeRole: string;
            assignmentStatus: string;
            tournament: {
                id: string;
                name: string;
            };
            homeTeam: {
                id: string;
                name: string;
            };
            awayTeam: {
                id: string;
                name: string;
            };
        }[];
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
    }>;
    removeRole(id: bigint, request: AuthenticatedRequest): Promise<{
        id: string;
        roles: string[];
        message: string;
    }>;
}
