import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AssociationsModule } from './associations/associations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompetitionAccessModule } from './authorization/competition-access.module';
import { DisciplinaryActionsModule } from './disciplinary-actions/disciplinary-actions.module';
import { FinesModule } from './fines/fines.module';
import { HomeGalleryModule } from './home-gallery/home-gallery.module';
import { MatchesModule } from './matches/matches.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlayerMatchStatsModule } from './player-match-stats/player-match-stats.module';
import { PlayersModule } from './players/players.module';
import { PrismaModule } from './prisma/prisma.module';
import { RefereesModule } from './referees/referees.module';
import { RolesModule } from './roles/roles.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { SuspensionsModule } from './suspensions/suspensions.module';
import { TeamsModule } from './teams/teams.module';
import { TournamentTypesModule } from './tournament-types/tournament-types.module';
import { CompetitionModule } from './competition/competition.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CompetitionAccessModule,
    RolesModule,
    UsersModule,
    AssociationsModule,
    TournamentTypesModule,
    TournamentsModule,
    CompetitionModule,
    TeamsModule,
    MatchesModule,
    NotificationsModule,
    PlayerMatchStatsModule,
    PlayersModule,
    RefereesModule,
    DisciplinaryActionsModule,
    FinesModule,
    HomeGalleryModule,
    SuspensionsModule,
    SponsorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
