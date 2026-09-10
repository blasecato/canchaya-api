import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { type OperationalNotificationEventCode } from './notification-events';
import { NotificationDispatcherService } from './notification-dispatcher.service';
type DatabaseClient = PrismaService | Prisma.TransactionClient;
export declare class MatchOperationalNotificationsService {
    private readonly prisma;
    private readonly dispatcher;
    constructor(prisma: PrismaService, dispatcher: NotificationDispatcherService);
    notifyMatchScheduled(matchId: bigint, client?: DatabaseClient): Promise<number>;
    notifyMatchChanged(matchId: bigint, eventCode: OperationalNotificationEventCode, additionalRefereeIds?: readonly bigint[], client?: DatabaseClient): Promise<number>;
    sendDueReminders(now?: Date): Promise<number>;
    private sendMatchReminderIfDue;
    private notifyMatchAudience;
    private uniqueAudience;
    private loadMatchContext;
    private changeCopy;
    private matchLabel;
    private venueSuffix;
    private formatDate;
    private reminderTitle;
}
export {};
