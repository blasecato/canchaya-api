import { PrismaService } from '../prisma/prisma.service';
import { UpdateTeamLineupDto } from './dto/team-lineup.dto';
export declare class TeamLineupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private findPlayerRegistration;
    private buildRoster;
    private formatResponse;
    getMyLineup(tournamentId: bigint, userId: bigint): Promise<{
        tournamentId: string;
        tournamentName: string;
        association: {
            id: string;
            name: string;
            logoUrl: string | null;
        } | null;
        modality: string;
        playersOnPitch: number;
        team: {
            id: string;
            name: string;
            photoUrl: string | null;
            primaryColor: string;
            secondaryColor: string;
            captainUserId: string;
            captainName: string;
        };
        canEdit: boolean;
        availableFormations: string[];
        formation: string;
        slots: ({
            slotKey: string;
            playerId: string;
        } | {
            slotKey: string;
            playerId: null;
        })[];
        roster: {
            playerId: string;
            fullName: string;
            firstName: string;
            jerseyNumber: number;
            isAssignedNumberRandom: boolean;
            position: string | null;
            isCaptain: boolean;
        }[];
        updatedAt: string | null;
    }>;
    updateMyLineup(tournamentId: bigint, userId: bigint, dto: UpdateTeamLineupDto): Promise<{
        tournamentId: string;
        tournamentName: string;
        association: {
            id: string;
            name: string;
            logoUrl: string | null;
        } | null;
        modality: string;
        playersOnPitch: number;
        team: {
            id: string;
            name: string;
            photoUrl: string | null;
            primaryColor: string;
            secondaryColor: string;
            captainUserId: string;
            captainName: string;
        };
        canEdit: boolean;
        availableFormations: string[];
        formation: string;
        slots: ({
            slotKey: string;
            playerId: string;
        } | {
            slotKey: string;
            playerId: null;
        })[];
        roster: {
            playerId: string;
            fullName: string;
            firstName: string;
            jerseyNumber: number;
            isAssignedNumberRandom: boolean;
            position: string | null;
            isCaptain: boolean;
        }[];
        updatedAt: string | null;
    }>;
}
