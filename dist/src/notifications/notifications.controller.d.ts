import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(request: AuthenticatedRequest): Promise<{
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
    markAllRead(request: AuthenticatedRequest): Promise<{
        updatedCount: number;
    }>;
    unreadCount(request: AuthenticatedRequest): Promise<{
        count: number;
    }>;
    getPreferences(request: AuthenticatedRequest): Promise<{
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
    updatePreferences(request: AuthenticatedRequest, dto: UpdateNotificationPreferencesDto): Promise<{
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
    markRead(id: bigint, request: AuthenticatedRequest, dto: UpdateNotificationDto): Promise<{
        updated: boolean;
    }>;
}
