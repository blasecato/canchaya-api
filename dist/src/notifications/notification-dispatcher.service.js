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
exports.NotificationDispatcherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_events_1 = require("./notification-events");
let NotificationDispatcherService = class NotificationDispatcherService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notifyUsers(input, client = this.prisma) {
        const userIds = [...new Set(input.userIds)];
        if (userIds.length === 0)
            return 0;
        const preferences = await client.notification_preferences.findMany({
            where: { user_id: { in: userIds } },
            select: {
                user_id: true,
                match_scheduled_enabled: true,
                match_updates_enabled: true,
                match_reminders_enabled: true,
            },
        });
        const preferencesByUser = new Map(preferences.map((preference) => [preference.user_id, preference]));
        const enabledUserIds = userIds.filter((userId) => this.isEventEnabled(input.eventCode, preferencesByUser.get(userId)));
        if (enabledUserIds.length === 0)
            return 0;
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
    isEventEnabled(eventCode, preference) {
        if (!preference)
            return true;
        if (eventCode === notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_SCHEDULED) {
            return preference.match_scheduled_enabled;
        }
        if (eventCode === notification_events_1.OPERATIONAL_NOTIFICATION_EVENTS.MATCH_REMINDER) {
            return preference.match_reminders_enabled;
        }
        return preference.match_updates_enabled;
    }
};
exports.NotificationDispatcherService = NotificationDispatcherService;
exports.NotificationDispatcherService = NotificationDispatcherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationDispatcherService);
//# sourceMappingURL=notification-dispatcher.service.js.map