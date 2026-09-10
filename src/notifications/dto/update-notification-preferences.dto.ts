import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_MATCH_REMINDER_HOURS,
  MAX_MATCH_REMINDER_HOURS,
} from '../notification-events';

export class UpdateNotificationPreferencesDto {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  matchScheduledEnabled?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  matchUpdatesEnabled?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  matchRemindersEnabled?: boolean;

  @ApiPropertyOptional({
    default: DEFAULT_MATCH_REMINDER_HOURS,
    minimum: 1,
    maximum: MAX_MATCH_REMINDER_HOURS,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_MATCH_REMINDER_HOURS)
  reminderHoursBefore?: number;
}
