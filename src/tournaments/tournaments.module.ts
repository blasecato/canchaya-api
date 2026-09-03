import { Module } from '@nestjs/common';
import { AssociationsModule } from '../associations/associations.module';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { TournamentCatalogController } from './tournament-catalog.controller';
import { PublicTournamentsController } from './public-tournaments.controller';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

@Module({
  imports: [AssociationsModule, AuthModule, UploadsModule],
  controllers: [
    PublicTournamentsController,
    TournamentCatalogController,
    TournamentsController,
  ],
  providers: [TournamentsService],
  exports: [TournamentsService],
})
export class TournamentsModule {}
