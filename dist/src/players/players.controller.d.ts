import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { BlockPlayerDto } from './dto/block-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ListPlayersQueryDto } from './dto/list-players-query.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    findFilters(): Promise<{
        teams: {
            id: string;
            name: string;
        }[];
        tournaments: {
            id: string;
            name: string;
        }[];
    }>;
    findAll(query: ListPlayersQueryDto, request: AuthenticatedRequest): Promise<{
        items: {
            id: string;
            idNumber: string;
            documentType: string;
            fullName: string;
            birthDate: string;
            gender: string | null;
            age: number;
            email: string;
            phone: string | null;
            photoUrl: string | null;
            status: string;
            blockReason: string | null;
            blockedUntil: string | null;
            roles: string[];
            teams: {
                id: string;
                name: string;
            }[];
            tournaments: {
                id: string;
                name: string;
            }[];
            createdAt: string;
            updatedAt: string;
        }[];
        metrics: {
            total: number;
            active: number;
            blocked: number;
            minors: number;
        };
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
    }>;
    create(dto: CreatePlayerDto, photo?: UploadedImageFile): Promise<{
        id: string;
        idNumber: string;
        documentType: string;
        fullName: string;
        birthDate: string;
        gender: string | null;
        age: number;
        email: string;
        phone: string | null;
        photoUrl: string | null;
        status: string;
        blockReason: string | null;
        blockedUntil: string | null;
        roles: string[];
        teams: {
            id: string;
            name: string;
        }[];
        tournaments: {
            id: string;
            name: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    block(id: bigint, request: AuthenticatedRequest, dto: BlockPlayerDto): Promise<{
        id: string;
        idNumber: string;
        documentType: string;
        fullName: string;
        birthDate: string;
        gender: string | null;
        age: number;
        email: string;
        phone: string | null;
        photoUrl: string | null;
        status: string;
        blockReason: string | null;
        blockedUntil: string | null;
        roles: string[];
        teams: {
            id: string;
            name: string;
        }[];
        tournaments: {
            id: string;
            name: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    unblock(id: bigint): Promise<{
        id: string;
        idNumber: string;
        documentType: string;
        fullName: string;
        birthDate: string;
        gender: string | null;
        age: number;
        email: string;
        phone: string | null;
        photoUrl: string | null;
        status: string;
        blockReason: string | null;
        blockedUntil: string | null;
        roles: string[];
        teams: {
            id: string;
            name: string;
        }[];
        tournaments: {
            id: string;
            name: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
    update(id: bigint, dto: UpdatePlayerDto, photo?: UploadedImageFile): Promise<{
        id: string;
        idNumber: string;
        documentType: string;
        fullName: string;
        birthDate: string;
        gender: string | null;
        age: number;
        email: string;
        phone: string | null;
        photoUrl: string | null;
        status: string;
        blockReason: string | null;
        blockedUntil: string | null;
        roles: string[];
        teams: {
            id: string;
            name: string;
        }[];
        tournaments: {
            id: string;
            name: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }>;
}
