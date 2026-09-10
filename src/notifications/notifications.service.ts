import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { DEFAULT_MATCH_REMINDER_HOURS } from './notification-events';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: bigint) {
    const notifications = await this.prisma.notifications.findMany({
      where: { user_id: userId },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      take: 100,
    });
    return notifications.map((notification) => ({
      id: notification.id.toString(),
      type: notification.type,
      eventCode: notification.event_code,
      title: notification.title,
      message: notification.message,
      entityType: notification.entity_type,
      entityId: notification.entity_id,
      metadata: notification.metadata,
      readAt: notification.read_at?.toISOString() ?? null,
      scheduledFor: notification.scheduled_for?.toISOString() ?? null,
      createdAt: notification.created_at.toISOString(),
    }));
  }

  async markRead(id: bigint, userId: bigint, read: boolean) {
    const result = await this.prisma.notifications.updateMany({
      where: { id, user_id: userId },
      data: { read_at: read ? new Date() : null },
    });
    return { updated: result.count > 0 };
  }

  async unreadCount(userId: bigint) {
    const count = await this.prisma.notifications.count({
      where: { user_id: userId, read_at: null },
    });
    return { count };
  }

  async markAllRead(userId: bigint) {
    const result = await this.prisma.notifications.updateMany({
      where: { user_id: userId, read_at: null },
      data: { read_at: new Date() },
    });
    return { updatedCount: result.count };
  }

  async getPreferences(userId: bigint) {
    const preferences = await this.prisma.notification_preferences.upsert({
      where: { user_id: userId },
      create: { user_id: userId },
      update: {},
    });
    return this.toPreferencesResponse(preferences);
  }

  async updatePreferences(
    userId: bigint,
    dto: UpdateNotificationPreferencesDto,
  ) {
    const preferences = await this.prisma.notification_preferences.upsert({
      where: { user_id: userId },
      create: {
        user_id: userId,
        match_scheduled_enabled: dto.matchScheduledEnabled,
        match_updates_enabled: dto.matchUpdatesEnabled,
        match_reminders_enabled: dto.matchRemindersEnabled,
        reminder_hours_before: dto.reminderHoursBefore,
      },
      update: {
        match_scheduled_enabled: dto.matchScheduledEnabled,
        match_updates_enabled: dto.matchUpdatesEnabled,
        match_reminders_enabled: dto.matchRemindersEnabled,
        reminder_hours_before: dto.reminderHoursBefore,
        updated_at: new Date(),
      },
    });
    return this.toPreferencesResponse(preferences);
  }

  private toPreferencesResponse(preferences: {
    match_scheduled_enabled: boolean;
    match_updates_enabled: boolean;
    match_reminders_enabled: boolean;
    reminder_hours_before: number;
    email_enabled: boolean;
    whatsapp_enabled: boolean;
  }) {
    return {
      matchScheduledEnabled: preferences.match_scheduled_enabled,
      matchUpdatesEnabled: preferences.match_updates_enabled,
      matchRemindersEnabled: preferences.match_reminders_enabled,
      reminderHoursBefore:
        preferences.reminder_hours_before ?? DEFAULT_MATCH_REMINDER_HOURS,
      futureChannels: {
        email: { available: false, enabled: preferences.email_enabled },
        whatsapp: { available: false, enabled: preferences.whatsapp_enabled },
      },
    };
  }
}
