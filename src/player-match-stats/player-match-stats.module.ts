import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PlayerMatchStatsController } from './player-match-stats.controller';
import { PlayerMatchStatsService } from './player-match-stats.service';

@Module({
  imports: [AuthModule],
  controllers: [PlayerMatchStatsController],
  providers: [PlayerMatchStatsService],
  exports: [PlayerMatchStatsService],
})
export class PlayerMatchStatsModule {}
