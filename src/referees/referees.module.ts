import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RefereesController } from './referees.controller';
import { RefereesService } from './referees.service';

@Module({
  imports: [AuthModule],
  controllers: [RefereesController],
  providers: [RefereesService],
})
export class RefereesModule {}
