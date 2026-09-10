import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationsController } from './notifications.controller';
import { NotificationDispatcherService } from './notification-dispatcher.service';
import { MatchOperationalNotificationsService } from './match-operational-notifications.service';
import { MatchReminderScheduler } from './match-reminder.scheduler';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [AuthModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationDispatcherService,
    MatchOperationalNotificationsService,
    MatchReminderScheduler,
  ],
  exports: [
    NotificationDispatcherService,
    MatchOperationalNotificationsService,
  ],
})
export class NotificationsModule {}
