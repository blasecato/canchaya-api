export declare const OPERATIONAL_NOTIFICATION_EVENTS: {
    readonly MATCH_SCHEDULED: "match_scheduled";
    readonly MATCH_UPDATED: "match_updated";
    readonly MATCH_POSTPONED: "match_postponed";
    readonly MATCH_CANCELLED: "match_cancelled";
    readonly MATCH_REMINDER: "match_reminder";
};
export type OperationalNotificationEventCode = (typeof OPERATIONAL_NOTIFICATION_EVENTS)[keyof typeof OPERATIONAL_NOTIFICATION_EVENTS];
export declare const DEFAULT_MATCH_REMINDER_HOURS = 24;
export declare const MAX_MATCH_REMINDER_HOURS = 168;
