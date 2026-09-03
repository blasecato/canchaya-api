import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
