import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CompetitionAccessModule } from '../authorization/competition-access.module';
import {
  CardChargesController,
  MyCardChargesController,
} from './card-charges.controller';
import { CardChargesService } from './card-charges.service';

@Module({
  imports: [AuthModule, CompetitionAccessModule],
  controllers: [MyCardChargesController, CardChargesController],
  providers: [CardChargesService],
  exports: [CardChargesService],
})
export class CardChargesModule {}
