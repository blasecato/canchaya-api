import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { type OperationalNotificationEventCode } from './notification-events';
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
export declare class NotificationDispatcherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    notifyUsers(input: InAppNotificationInput, client?: DatabaseClient): Promise<number>;
    private isEventEnabled;
}
export {};
