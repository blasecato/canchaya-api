import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { UploadsModule } from '../uploads/uploads.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IdentityVerificationService } from './identity-verification.service';

@Module({
  imports: [AuthModule, MailModule, UploadsModule],
  controllers: [UsersController],
  providers: [UsersService, IdentityVerificationService],
  exports: [UsersService],
})
export class UsersModule {}
