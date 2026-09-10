import { ConfigService } from '@nestjs/config';
import { MatchOperationalNotificationsService } from './match-operational-notifications.service';
export declare class MatchReminderScheduler {
    private readonly config;
    private readonly matchNotifications;
    private readonly logger;
    constructor(config: ConfigService, matchNotifications: MatchOperationalNotificationsService);
    dispatchDueReminders(): Promise<void>;
    private remindersEnabled;
}
