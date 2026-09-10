import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RefereeAssignmentsController } from './referee-assignments.controller';
import { RefereeAssignmentsService } from './referee-assignments.service';
import { RefereesController } from './referees.controller';
import { RefereesService } from './referees.service';

@Module({
  imports: [AuthModule],
  controllers: [RefereesController, RefereeAssignmentsController],
  providers: [RefereesService, RefereeAssignmentsService],
  exports: [RefereesService, RefereeAssignmentsService],
})
export class RefereesModule {}
