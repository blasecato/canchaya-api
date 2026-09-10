import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateTeamDto } from './dto/create-team.dto';
import { ListTeamsQueryDto } from './dto/list-teams-query.dto';
import { ListTeamPlayersQueryDto } from './dto/list-team-players-query.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamCarnetsResponseDto } from './dto/team-carnets-response.dto';
import { TeamCarnetsQueryDto } from './dto/team-carnets-query.dto';
import { TeamRosterPlayerResponseDto, TeamRostersResponseDto } from './dto/team-rosters-response.dto';
import { UpdateTournamentRosterPlayerDto } from './dto/update-tournament-roster-player.dto';
import { TeamsService } from './teams.service';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    findFilters(request: AuthenticatedRequest): Promise<{
        tournaments: {
            id: string;
            name: string;
        }[];
    }>;
    findCaptainOptions(query: ListTeamPlayersQueryDto): Promise<{
        items: {
            id: string;
            fullName: string;
            email: string;
        }[];
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
    }>;
    create(request: AuthenticatedRequest, createTeamDto: CreateTeamDto, photo?: UploadedImageFile): Promise<{
        id: string;
        name: string;
        sportType: string;
        modality: string;
        primaryColor: string | null;
        secondaryColor: string | null;
        photoUrl: string | null;
        status: string;
        captain: {
            id: string;
            fullName: string;
        };
        members: {
            id: string;
            fullName: string;
            photoUrl: string | null;
            role: string;
        }[];
        memberCount: number;
        maxPlayers: number;
        tournaments: {
            id: string;
            name: string;
            registrationStatus: string;
        }[];
        permissions: {
            isMember: boolean;
            isCaptain: boolean;
            canEnter: boolean;
            canEdit: boolean;
            canRemoveMembers: boolean;
            canLeave: boolean;
            canDelete: boolean;
        };
        createdAt: string;
        updatedAt: string;
    }>;
    findAll(query: ListTeamsQueryDto, request: AuthenticatedRequest): Promise<{
        items: {
            id: string;
            name: string;
            sportType: string;
            modality: string;
            primaryColor: string | null;
            secondaryColor: string | null;
            photoUrl: string | null;
            status: string;
            captain: {
                id: string;
                fullName: string;
            };
            members: {
                id: string;
                fullName: string;
                photoUrl: string | null;
                role: string;
            }[];
            memberCount: number;
            maxPlayers: number;
            tournaments: {
                id: string;
                name: string;
                registrationStatus: string;
            }[];
            permissions: {
                isMember: boolean;
                isCaptain: boolean;
                canEnter: boolean;
                canEdit: boolean;
                canRemoveMembers: boolean;
                canLeave: boolean;
                canDelete: boolean;
            };
            createdAt: string;
            updatedAt: string;
        }[];
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
    }>;
    findCarnets(id: bigint, query: TeamCarnetsQueryDto, request: AuthenticatedRequest): Promise<TeamCarnetsResponseDto>;
    findTournamentRosters(id: bigint, request: AuthenticatedRequest): Promise<TeamRostersResponseDto>;
    updateTournamentRosterPlayer(id: bigint, tournamentId: bigint, playerId: bigint, request: AuthenticatedRequest, dto: UpdateTournamentRosterPlayerDto): Promise<TeamRosterPlayerResponseDto>;
    removeMember(id: bigint, playerId: bigint, request: AuthenticatedRequest): Promise<{
        teamId: string;
        playerId: string;
        message: string;
    }>;
    findOne(id: bigint, request: AuthenticatedRequest): Promise<{
        id: string;
        name: string;
        sportType: string;
        modality: string;
        primaryColor: string | null;
        secondaryColor: string | null;
        photoUrl: string | null;
        status: string;
        captain: {
            id: string;
            fullName: string;
        };
        members: {
            id: string;
            fullName: string;
            photoUrl: string | null;
            role: string;
        }[];
        memberCount: number;
        maxPlayers: number;
        tournaments: {
            id: string;
            name: string;
            registrationStatus: string;
        }[];
        permissions: {
            isMember: boolean;
            isCaptain: boolean;
            canEnter: boolean;
            canEdit: boolean;
            canRemoveMembers: boolean;
            canLeave: boolean;
            canDelete: boolean;
        };
        createdAt: string;
        updatedAt: string;
    }>;
    leave(id: bigint, request: AuthenticatedRequest): Promise<{
        id: string;
        message: string;
    }>;
    update(id: bigint, request: AuthenticatedRequest, updateTeamDto: UpdateTeamDto, photo?: UploadedImageFile): Promise<{
        id: string;
        name: string;
        sportType: string;
        modality: string;
        primaryColor: string | null;
        secondaryColor: string | null;
        photoUrl: string | null;
        status: string;
        captain: {
            id: string;
            fullName: string;
        };
        members: {
            id: string;
            fullName: string;
            photoUrl: string | null;
            role: string;
        }[];
        memberCount: number;
        maxPlayers: number;
        tournaments: {
            id: string;
            name: string;
            registrationStatus: string;
        }[];
        permissions: {
            isMember: boolean;
            isCaptain: boolean;
            canEnter: boolean;
            canEdit: boolean;
            canRemoveMembers: boolean;
            canLeave: boolean;
            canDelete: boolean;
        };
        createdAt: string;
        updatedAt: string;
    }>;
    remove(id: bigint, request: AuthenticatedRequest): Promise<{
        id: string;
        message: string;
    }>;
}
