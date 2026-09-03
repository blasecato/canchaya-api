import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IdentityVerificationService } from './identity-verification.service';

@Module({
  imports: [AuthModule, UploadsModule],
  controllers: [UsersController],
  providers: [UsersService, IdentityVerificationService],
  exports: [UsersService],
})
export class UsersModule {}
