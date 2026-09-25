import { TournamentSponsorResponseDto } from '../associations/dto/association-tournament-response.dto';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { ListTournamentsQueryDto } from './dto/list-tournaments-query.dto';
import { TournamentLifecycleResponseDto } from './dto/tournament-lifecycle-response.dto';
import { TransitionTournamentDto } from './dto/transition-tournament.dto';
import { TournamentCatalogFiltersResponseDto, TournamentCatalogItemResponseDto, TournamentDetailResponseDto, TournamentRulesResponseDto, TournamentCatalogPageResponseDto } from './dto/tournament-catalog-response.dto';
import { TournamentsService } from './tournaments.service';
import { TournamentLifecycleService } from './tournament-lifecycle.service';
import { UpdateTournamentRulesDto } from './dto/update-tournament-rules.dto';
import { TournamentSponsorInputDto } from './dto/tournament-sponsor-input.dto';
import { ReviewTeamRegistrationDto } from './dto/review-team-registration.dto';
import { MyTournamentPaymentResponseDto, TournamentPaymentsResponseDto, TournamentRegistrationPaymentResponseDto, UpdateRegistrationPaymentDto } from './dto/registration-payment.dto';
import { CaptainTeamOptionResponseDto, RegisterTeamDto, TeamRegistrationResponseDto } from './dto/register-team.dto';
export declare class TournamentCatalogController {
    private readonly tournamentsService;
    private readonly tournamentLifecycleService;
    constructor(tournamentsService: TournamentsService, tournamentLifecycleService: TournamentLifecycleService);
    findFilterOptions(): Promise<TournamentCatalogFiltersResponseDto>;
    findMine(request: AuthenticatedRequest): Promise<TournamentCatalogItemResponseDto[]>;
    findCatalog(query: ListTournamentsQueryDto, request: AuthenticatedRequest): Promise<TournamentCatalogPageResponseDto>;
    findCatalogOne(tournamentId: bigint, request: AuthenticatedRequest): Promise<TournamentDetailResponseDto>;
    findLifecycle(tournamentId: bigint, request: AuthenticatedRequest): Promise<TournamentLifecycleResponseDto>;
    transitionLifecycle(tournamentId: bigint, request: AuthenticatedRequest, dto: TransitionTournamentDto): Promise<TournamentLifecycleResponseDto>;
    findSponsors(tournamentId: bigint, request: AuthenticatedRequest): Promise<TournamentSponsorResponseDto[]>;
    createSponsor(tournamentId: bigint, request: AuthenticatedRequest, dto: TournamentSponsorInputDto, logo?: UploadedImageFile): Promise<TournamentSponsorResponseDto>;
    updateSponsor(tournamentId: bigint, sponsorId: bigint, request: AuthenticatedRequest, dto: TournamentSponsorInputDto, logo?: UploadedImageFile): Promise<TournamentSponsorResponseDto>;
    removeSponsor(tournamentId: bigint, sponsorId: bigint, request: AuthenticatedRequest): Promise<{
        sponsorId: string;
    }>;
    findCaptainTeams(tournamentId: bigint, request: AuthenticatedRequest): Promise<CaptainTeamOptionResponseDto[]>;
    registerTeam(tournamentId: bigint, request: AuthenticatedRequest, dto: RegisterTeamDto): Promise<TeamRegistrationResponseDto>;
    findMyRegistrationPayment(tournamentId: bigint, request: AuthenticatedRequest): Promise<MyTournamentPaymentResponseDto>;
    findRegistrationPayments(tournamentId: bigint, request: AuthenticatedRequest): Promise<TournamentPaymentsResponseDto>;
    updateRegistrationPayment(tournamentId: bigint, teamId: bigint, request: AuthenticatedRequest, dto: UpdateRegistrationPaymentDto): Promise<TournamentRegistrationPaymentResponseDto>;
    findRegistrationDetail(tournamentId: bigint, teamId: bigint, request: AuthenticatedRequest): Promise<{
        tournamentId: string;
        tournamentName: string;
        teamId: string;
        teamName: string;
        sportType: string;
        modality: string | null;
        memberCount: number;
        status: string;
        reviewNotes: string | null;
        createdAt: string;
        reviewedAt: string | null;
        canReview: boolean;
        canResubmit: boolean;
        events: {
            id: string;
            type: string;
            message: string | null;
            createdAt: string;
        }[];
    }>;
    reviewRegistration(tournamentId: bigint, teamId: bigint, request: AuthenticatedRequest, dto: ReviewTeamRegistrationDto): Promise<{
        tournamentId: string;
        teamId: string;
        status: "approved" | "rejected" | "changes_requested";
    }>;
    resubmitRegistration(tournamentId: bigint, teamId: bigint, request: AuthenticatedRequest): Promise<{
        tournamentId: string;
        teamId: string;
        status: string;
    }>;
    updateRules(tournamentId: bigint, request: AuthenticatedRequest, updateTournamentRulesDto: UpdateTournamentRulesDto): Promise<TournamentRulesResponseDto>;
}
