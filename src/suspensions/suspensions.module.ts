import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SuspensionsController } from './suspensions.controller';
import { SuspensionsService } from './suspensions.service';

@Module({
  imports: [AuthModule],
  controllers: [SuspensionsController],
  providers: [SuspensionsService],
  exports: [SuspensionsService],
})
export class SuspensionsModule {}
