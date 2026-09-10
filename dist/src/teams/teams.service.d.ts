import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateTeamDto } from './dto/create-team.dto';
import { ListTeamsQueryDto } from './dto/list-teams-query.dto';
import { ListTeamPlayersQueryDto } from './dto/list-team-players-query.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamCarnetsResponseDto } from './dto/team-carnets-response.dto';
import type { TeamRosterPlayerResponseDto, TeamRostersResponseDto } from './dto/team-rosters-response.dto';
import type { UpdateTournamentRosterPlayerDto } from './dto/update-tournament-roster-player.dto';
export declare class TeamsService {
    private readonly prisma;
    private readonly imageStorage;
    constructor(prisma: PrismaService, imageStorage: ImageStorageService);
    create(requestingUserId: bigint, dto: CreateTeamDto, photo?: UploadedImageFile): Promise<{
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
    findAll(query: ListTeamsQueryDto, requestingUserId: bigint): Promise<{
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
    findFilters(requestingUserId: bigint): Promise<{
        tournaments: {
            id: string;
            name: string;
        }[];
    }>;
    findPlayerOptions(query: ListTeamPlayersQueryDto): Promise<{
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
    findOne(id: bigint, requestingUserId: bigint): Promise<{
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
    findTournamentRosters(id: bigint, requestingUserId: bigint): Promise<TeamRostersResponseDto>;
    updateTournamentRosterPlayer(teamId: bigint, tournamentId: bigint, playerId: bigint, requestingUserId: bigint, dto: UpdateTournamentRosterPlayerDto): Promise<TeamRosterPlayerResponseDto>;
    removeMember(teamId: bigint, playerId: bigint, requestingUserId: bigint): Promise<{
        teamId: string;
        playerId: string;
        message: string;
    }>;
    findCarnets(id: bigint, requestingUserId: bigint, tournamentId?: bigint): Promise<TeamCarnetsResponseDto>;
    update(id: bigint, requestingUserId: bigint, dto: UpdateTeamDto, photo?: UploadedImageFile): Promise<{
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
    leave(id: bigint, requestingUserId: bigint): Promise<{
        id: string;
        message: string;
    }>;
    remove(id: bigint, requestingUserId: bigint): Promise<{
        id: string;
        message: string;
    }>;
    private findRoleCodes;
    private buildVisibleWhere;
    private assertActivePlayers;
    private findActiveTeamRegistrations;
    private assertMemberCountWithinTournamentLimits;
    private assertPlayersAvailableForTournaments;
    private assertPlayersEligibleForTournaments;
    private synchronizeApprovedTournamentRosters;
    private withdrawPlayersFromApprovedRosters;
    private toResponse;
}
