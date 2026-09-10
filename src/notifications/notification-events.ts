export const OPERATIONAL_NOTIFICATION_EVENTS = {
  MATCH_SCHEDULED: 'match_scheduled',
  MATCH_UPDATED: 'match_updated',
  MATCH_POSTPONED: 'match_postponed',
  MATCH_CANCELLED: 'match_cancelled',
  MATCH_REMINDER: 'match_reminder',
} as const;

export type OperationalNotificationEventCode =
  (typeof OPERATIONAL_NOTIFICATION_EVENTS)[keyof typeof OPERATIONAL_NOTIFICATION_EVENTS];

export const DEFAULT_MATCH_REMINDER_HOURS = 24;
export const MAX_MATCH_REMINDER_HOURS = 168;
