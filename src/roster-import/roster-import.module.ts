import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CompetitionAccessModule } from '../authorization/competition-access.module';
import { RosterImportController } from './roster-import.controller';
import { RosterImportService } from './roster-import.service';

@Module({
  imports: [AuthModule, CompetitionAccessModule],
  controllers: [RosterImportController],
  providers: [RosterImportService],
  exports: [RosterImportService],
})
export class RosterImportModule {}
