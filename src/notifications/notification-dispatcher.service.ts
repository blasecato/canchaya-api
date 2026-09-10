import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  OPERATIONAL_NOTIFICATION_EVENTS,
  type OperationalNotificationEventCode,
} from './notification-events';

type DatabaseClient = PrismaService | Prisma.TransactionClient;

export interface InAppNotificationInput {
  userIds: readonly bigint[];
  type: string;
  eventCode: OperationalNotificationEventCode;
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  deduplicationKey: string;
  scheduledFor?: Date;
}

@Injectable()
export class NotificationDispatcherService {
  constructor(private readonly prisma: PrismaService) {}

  async notifyUsers(
    input: InAppNotificationInput,
    client: DatabaseClient = this.prisma,
  ): Promise<number> {
    const userIds = [...new Set(input.userIds)];
    if (userIds.length === 0) return 0;

    const preferences = await client.notification_preferences.findMany({
      where: { user_id: { in: userIds } },
      select: {
        user_id: true,
        match_scheduled_enabled: true,
        match_updates_enabled: true,
        match_reminders_enabled: true,
      },
    });
    const preferencesByUser = new Map(
      preferences.map((preference) => [preference.user_id, preference]),
    );
    const enabledUserIds = userIds.filter((userId) =>
      this.isEventEnabled(input.eventCode, preferencesByUser.get(userId)),
    );
    if (enabledUserIds.length === 0) return 0;

    const result = await client.notifications.createMany({
      data: enabledUserIds.map((userId) => ({
        user_id: userId,
        type: input.type,
        event_code: input.eventCode,
        deduplication_key: input.deduplicationKey,
        title: input.title,
        message: input.message,
        entity_type: input.entityType,
        entity_id: input.entityId,
        metadata: input.metadata,
        scheduled_for: input.scheduledFor,
      })),
      skipDuplicates: true,
    });

    return result.count;
  }

  private isEventEnabled(
    eventCode: OperationalNotificationEventCode,
    preference:
      | {
          match_scheduled_enabled: boolean;
          match_updates_enabled: boolean;
          match_reminders_enabled: boolean;
        }
      | undefined,
  ): boolean {
    if (!preference) return true;

    if (eventCode === OPERATIONAL_NOTIFICATION_EVENTS.MATCH_SCHEDULED) {
      return preference.match_scheduled_enabled;
    }
    if (eventCode === OPERATIONAL_NOTIFICATION_EVENTS.MATCH_REMINDER) {
      return preference.match_reminders_enabled;
    }
    return preference.match_updates_enabled;
  }
}
