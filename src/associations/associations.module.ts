import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { AssociationAnnouncementsController } from './association-announcements.controller';
import { AssociationAnnouncementsService } from './association-announcements.service';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [AssociationsController, AssociationAnnouncementsController],
  providers: [AssociationsService, AssociationAnnouncementsService],
  exports: [AssociationsService],
})
export class AssociationsModule {}
