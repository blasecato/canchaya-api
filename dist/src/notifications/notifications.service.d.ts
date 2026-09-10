import { PrismaService } from '../prisma/prisma.service';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: bigint): Promise<{
        id: string;
        type: string;
        eventCode: string | null;
        title: string;
        message: string;
        entityType: string | null;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue;
        readAt: string | null;
        scheduledFor: string | null;
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
    getPreferences(userId: bigint): Promise<{
        matchScheduledEnabled: boolean;
        matchUpdatesEnabled: boolean;
        matchRemindersEnabled: boolean;
        reminderHoursBefore: number;
        futureChannels: {
            email: {
                available: boolean;
                enabled: boolean;
            };
            whatsapp: {
                available: boolean;
                enabled: boolean;
            };
        };
    }>;
    updatePreferences(userId: bigint, dto: UpdateNotificationPreferencesDto): Promise<{
        matchScheduledEnabled: boolean;
        matchUpdatesEnabled: boolean;
        matchRemindersEnabled: boolean;
        reminderHoursBefore: number;
        futureChannels: {
            email: {
                available: boolean;
                enabled: boolean;
            };
            whatsapp: {
                available: boolean;
                enabled: boolean;
            };
        };
    }>;
    private toPreferencesResponse;
}
