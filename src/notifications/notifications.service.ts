import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
      title: notification.title,
      message: notification.message,
      entityType: notification.entity_type,
      entityId: notification.entity_id,
      metadata: notification.metadata,
      readAt: notification.read_at?.toISOString() ?? null,
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
}
