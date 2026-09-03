import { Module } from '@nestjs/common';
import { LocalImageStorageService } from './local-image-storage.service';
import { ImageStorageService } from './image-storage.service';

@Module({
  providers: [LocalImageStorageService, ImageStorageService],
  exports: [ImageStorageService, LocalImageStorageService],
})
export class UploadsModule {}
