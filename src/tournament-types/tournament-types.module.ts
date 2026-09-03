import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TournamentTypesController } from './tournament-types.controller';
import { TournamentTypesService } from './tournament-types.service';

@Module({
  imports: [AuthModule],
  controllers: [TournamentTypesController],
  providers: [TournamentTypesService],
  exports: [TournamentTypesService],
})
export class TournamentTypesModule {}
