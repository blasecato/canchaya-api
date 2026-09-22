import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CompetitionController } from './competition.controller';
import { CompetitionService } from './competition.service';
@Module({
  imports: [AuthModule],
  controllers: [CompetitionController],
  providers: [CompetitionService],
})
export class CompetitionModule {}
