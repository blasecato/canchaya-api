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
var MatchReminderScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchReminderScheduler = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const match_operational_notifications_service_1 = require("./match-operational-notifications.service");
const MATCH_REMINDER_CRON = '0 */5 * * * *';
let MatchReminderScheduler = MatchReminderScheduler_1 = class MatchReminderScheduler {
    config;
    matchNotifications;
    logger = new common_1.Logger(MatchReminderScheduler_1.name);
    constructor(config, matchNotifications) {
        this.config = config;
        this.matchNotifications = matchNotifications;
    }
    async dispatchDueReminders() {
        if (!this.remindersEnabled())
            return;
        try {
            const created = await this.matchNotifications.sendDueReminders();
            if (created > 0) {
                this.logger.log(`Se generaron ${created} recordatorios internos de partidos.`);
            }
        }
        catch (error) {
            const detail = error instanceof Error ? error.stack : String(error);
            this.logger.error('No fue posible generar los recordatorios internos de partidos.', detail);
        }
    }
    remindersEnabled() {
        const value = this.config.get('MATCH_REMINDERS_ENABLED');
        return value?.trim().toLowerCase() !== 'false';
    }
};
exports.MatchReminderScheduler = MatchReminderScheduler;
__decorate([
    (0, schedule_1.Cron)(MATCH_REMINDER_CRON, {
        name: 'match-reminders',
        waitForCompletion: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchReminderScheduler.prototype, "dispatchDueReminders", null);
exports.MatchReminderScheduler = MatchReminderScheduler = MatchReminderScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        match_operational_notifications_service_1.MatchOperationalNotificationsService])
], MatchReminderScheduler);
//# sourceMappingURL=match-reminder.scheduler.js.map