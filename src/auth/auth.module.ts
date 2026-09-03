import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { getAuthSettings, JWT_ALGORITHM } from './auth.config';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const settings = getAuthSettings(configService);

        return {
          secret: settings.secret,
          signOptions: {
            algorithm: JWT_ALGORITHM,
            audience: settings.audience,
            issuer: settings.issuer,
          },
          verifyOptions: {
            algorithms: [JWT_ALGORITHM],
            audience: settings.audience,
            issuer: settings.issuer,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
