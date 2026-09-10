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
exports.UpdateNotificationPreferencesDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const notification_events_1 = require("../notification-events");
class UpdateNotificationPreferencesDto {
    matchScheduledEnabled;
    matchUpdatesEnabled;
    matchRemindersEnabled;
    reminderHoursBefore;
    static _OPENAPI_METADATA_FACTORY() {
        return { matchScheduledEnabled: { required: false, type: () => Boolean }, matchUpdatesEnabled: { required: false, type: () => Boolean }, matchRemindersEnabled: { required: false, type: () => Boolean }, reminderHoursBefore: { required: false, type: () => Number, minimum: 1, maximum: notification_events_1.MAX_MATCH_REMINDER_HOURS } };
    }
}
exports.UpdateNotificationPreferencesDto = UpdateNotificationPreferencesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferencesDto.prototype, "matchScheduledEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferencesDto.prototype, "matchUpdatesEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferencesDto.prototype, "matchRemindersEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: notification_events_1.DEFAULT_MATCH_REMINDER_HOURS,
        minimum: 1,
        maximum: notification_events_1.MAX_MATCH_REMINDER_HOURS,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(notification_events_1.MAX_MATCH_REMINDER_HOURS),
    __metadata("design:type", Number)
], UpdateNotificationPreferencesDto.prototype, "reminderHoursBefore", void 0);
//# sourceMappingURL=update-notification-preferences.dto.js.map