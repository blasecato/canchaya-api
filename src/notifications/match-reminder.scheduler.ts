import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { MatchOperationalNotificationsService } from './match-operational-notifications.service';

const MATCH_REMINDER_CRON = '0 */5 * * * *';

@Injectable()
export class MatchReminderScheduler {
  private readonly logger = new Logger(MatchReminderScheduler.name);

  constructor(
    private readonly config: ConfigService,
    private readonly matchNotifications: MatchOperationalNotificationsService,
  ) {}

  @Cron(MATCH_REMINDER_CRON, {
    name: 'match-reminders',
    waitForCompletion: true,
  })
  async dispatchDueReminders(): Promise<void> {
    if (!this.remindersEnabled()) return;

    try {
      const created = await this.matchNotifications.sendDueReminders();
      if (created > 0) {
        this.logger.log(
          `Se generaron ${created} recordatorios internos de partidos.`,
        );
      }
    } catch (error) {
      const detail = error instanceof Error ? error.stack : String(error);
      this.logger.error(
        'No fue posible generar los recordatorios internos de partidos.',
        detail,
      );
    }
  }

  private remindersEnabled(): boolean {
    const value = this.config.get<string>('MATCH_REMINDERS_ENABLED');
    return value?.trim().toLowerCase() !== 'false';
  }
}
