import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: bigint): Promise<{
        id: string;
        type: string;
        title: string;
        message: string;
        entityType: string | null;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue;
        readAt: string | null;
        createdAt: string;
    }[]>;
    markRead(id: bigint, userId: bigint, read: boolean): Promise<{
        updated: boolean;
    }>;
    unreadCount(userId: bigint): Promise<{
        count: number;
    }>;
    markAllRead(userId: bigint): Promise<{
        updatedCount: number;
    }>;
}
