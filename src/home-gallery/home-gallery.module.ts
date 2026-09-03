import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { HomeGalleryController } from './home-gallery.controller';
import { HomeGalleryService } from './home-gallery.service';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [HomeGalleryController],
  providers: [HomeGalleryService],
})
export class HomeGalleryModule {}
