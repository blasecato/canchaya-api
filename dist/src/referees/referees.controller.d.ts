import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ListRefereeMatchesQueryDto } from './dto/list-referee-matches-query.dto';
import { RefereesService } from './referees.service';
export declare class RefereesController {
    private readonly refereesService;
    constructor(refereesService: RefereesService);
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
    removeRole(id: bigint): Promise<{
        id: string;
        roles: string[];
        message: string;
    }>;
}
