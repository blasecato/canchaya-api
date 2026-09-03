import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(request: AuthenticatedRequest): Promise<{
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
    markAllRead(request: AuthenticatedRequest): Promise<{
        updatedCount: number;
    }>;
    unreadCount(request: AuthenticatedRequest): Promise<{
        count: number;
    }>;
    markRead(id: bigint, request: AuthenticatedRequest, dto: UpdateNotificationDto): Promise<{
        updated: boolean;
    }>;
}
