"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_events_1 = require("./notification-events");
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
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
    async markRead(id, userId, read) {
        const result = await this.prisma.notifications.updateMany({
            where: { id, user_id: userId },
            data: { read_at: read ? new Date() : null },
        });
        return { updated: result.count > 0 };
    }
    async unreadCount(userId) {
        const count = await this.prisma.notifications.count({
            where: { user_id: userId, read_at: null },
        });
        return { count };
    }
    async markAllRead(userId) {
        const result = await this.prisma.notifications.updateMany({
            where: { user_id: userId, read_at: null },
            data: { read_at: new Date() },
        });
        return { updatedCount: result.count };
    }
    async getPreferences(userId) {
        const preferences = await this.prisma.notification_preferences.upsert({
            where: { user_id: userId },
            create: { user_id: userId },
            update: {},
        });
        return this.toPreferencesResponse(preferences);
    }
    async updatePreferences(userId, dto) {
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
    toPreferencesResponse(preferences) {
        return {
            matchScheduledEnabled: preferences.match_scheduled_enabled,
            matchUpdatesEnabled: preferences.match_updates_enabled,
            matchRemindersEnabled: preferences.match_reminders_enabled,
            reminderHoursBefore: preferences.reminder_hours_before ?? notification_events_1.DEFAULT_MATCH_REMINDER_HOURS,
            futureChannels: {
                email: { available: false, enabled: preferences.email_enabled },
                whatsapp: { available: false, enabled: preferences.whatsapp_enabled },
            },
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map