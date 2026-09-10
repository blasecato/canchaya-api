import { PrismaService } from '../prisma/prisma.service';
import { CreateRefereeAvailabilityDto } from './dto/create-referee-availability.dto';
import { ListRefereeAvailabilityQueryDto } from './dto/list-referee-availability-query.dto';
import { ListRefereeMatchesQueryDto } from './dto/list-referee-matches-query.dto';
import { UpdateRefereeAvailabilityDto } from './dto/update-referee-availability.dto';
export declare class RefereesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findMatches(id: bigint, requestingUserId: bigint, query: ListRefereeMatchesQueryDto): Promise<{
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
    findAvailability(id: bigint, requestingUserId: bigint, query: ListRefereeAvailabilityQueryDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }[]>;
    createAvailability(refereeId: bigint, dto: CreateRefereeAvailabilityDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }>;
    updateAvailability(refereeId: bigint, availabilityId: bigint, dto: UpdateRefereeAvailabilityDto): Promise<{
        id: string;
        startsAt: string;
        endsAt: string;
        notes: string | null;
        status: string;
    }>;
    removeAvailability(refereeId: bigint, availabilityId: bigint): Promise<{
        message: string;
    }>;
    removeRole(id: bigint, actorId: bigint): Promise<{
        id: string;
        roles: string[];
        message: string;
    }>;
    private findRoleCodes;
    private assertRefereeExists;
    private assertValidAvailabilityRange;
    private assertAvailabilityDoesNotOverlap;
    private findOwnedAvailability;
    private assertAvailabilityNotCommitted;
    private toAvailabilityResponse;
    private toMatchResponse;
}
