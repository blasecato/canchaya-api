import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AllowBlockedUser } from '../auth/decorators/allow-blocked-user.decorator';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { NotificationsService } from './notifications.service';

@UseGuards(JwtAuthGuard)
@AllowBlockedUser()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.notificationsService.findAll(request.auth.userId);
  }

  @Patch('read-all')
  markAllRead(@Req() request: AuthenticatedRequest) {
    return this.notificationsService.markAllRead(request.auth.userId);
  }

  @Get('unread-count')
  unreadCount(@Req() request: AuthenticatedRequest) {
    return this.notificationsService.unreadCount(request.auth.userId);
  }

  @Get('preferences')
  getPreferences(@Req() request: AuthenticatedRequest) {
    return this.notificationsService.getPreferences(request.auth.userId);
  }

  @Patch('preferences')
  updatePreferences(
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateNotificationPreferencesDto,
  ) {
    return this.notificationsService.updatePreferences(
      request.auth.userId,
      dto,
    );
  }

  @Patch(':id')
  markRead(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationsService.markRead(
      id,
      request.auth.userId,
      dto.read,
    );
  }
}
