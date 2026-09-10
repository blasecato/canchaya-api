import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DisciplinaryActionsController } from './disciplinary-actions.controller';
import { DisciplinaryActionsService } from './disciplinary-actions.service';

@Module({
  imports: [AuthModule],
  controllers: [DisciplinaryActionsController],
  providers: [DisciplinaryActionsService],
  exports: [DisciplinaryActionsService],
})
export class DisciplinaryActionsModule {}
