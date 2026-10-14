import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { BlockPlayerDto } from './dto/block-player.dto';
import { BulkCreatePlayersDto, BulkCreatePlayersResponseDto } from './dto/bulk-create-players.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { DeletePlayerResultDto } from './dto/delete-player-result.dto';
import { ListPlayersQueryDto } from './dto/list-players-query.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayersService {
    private readonly prisma;
    private readonly imageStorage;
    constructor(prisma: PrismaService, imageStorage: ImageStorageService);
    findAll(query: ListPlayersQueryDto, requestingUserId: bigint): Promise<{
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
    bulkCreate(dto: BulkCreatePlayersDto): Promise<BulkCreatePlayersResponseDto>;
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
    remove(id: bigint, requestingUserId: bigint): Promise<DeletePlayerResultDto>;
    block(id: bigint, requestingUserId: bigint, dto: BlockPlayerDto): Promise<{
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
    private findBlockNotificationRecipients;
    private notifyBlockRecipients;
    unblock(id: bigint, requestingUserId: bigint): Promise<{
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
    private ensurePlayer;
    private releaseExpiredBlocks;
    private assertValidBirthDate;
    private calculateBlockedUntil;
    private formatBlockDate;
    private toResponse;
    private calculateAge;
}
