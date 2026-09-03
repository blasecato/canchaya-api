import { Module } from '@nestjs/common';
import { PlayerMatchStatsController } from './player-match-stats.controller';
import { PlayerMatchStatsService } from './player-match-stats.service';

@Module({
  controllers: [PlayerMatchStatsController],
  providers: [PlayerMatchStatsService],
  exports: [PlayerMatchStatsService],
})
export class PlayerMatchStatsModule {}
