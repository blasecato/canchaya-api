import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { HomeHeroController } from './home-hero.controller';
import { HomeHeroService } from './home-hero.service';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [HomeHeroController],
  providers: [HomeHeroService],
})
export class HomeHeroModule {}
