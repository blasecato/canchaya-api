import { Module } from '@nestjs/common';
import { DisciplinaryActionsController } from './disciplinary-actions.controller';
import { DisciplinaryActionsService } from './disciplinary-actions.service';

@Module({
  controllers: [DisciplinaryActionsController],
  providers: [DisciplinaryActionsService],
  exports: [DisciplinaryActionsService],
})
export class DisciplinaryActionsModule {}
