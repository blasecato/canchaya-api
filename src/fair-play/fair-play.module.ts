import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CompetitionAccessModule } from '../authorization/competition-access.module';
import { FairPlayController } from './fair-play.controller';
import { FairPlayService } from './fair-play.service';

@Module({
  imports: [AuthModule, CompetitionAccessModule],
  controllers: [FairPlayController],
  providers: [FairPlayService],
  exports: [FairPlayService],
})
export class FairPlayModule {}
