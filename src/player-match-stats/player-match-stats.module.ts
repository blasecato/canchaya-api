import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CardChargesModule } from '../card-charges/card-charges.module';
import { PlayerMatchStatsController } from './player-match-stats.controller';
import { PlayerMatchStatsService } from './player-match-stats.service';

@Module({
  imports: [AuthModule, CardChargesModule],
  controllers: [PlayerMatchStatsController],
  providers: [PlayerMatchStatsService],
  exports: [PlayerMatchStatsService],
})
export class PlayerMatchStatsModule {}
