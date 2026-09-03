import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import type { AuthenticatedSession } from './interfaces/authenticated-request.interface';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly settings;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    validateAccessToken(token: string): Promise<AuthenticatedSession>;
    logout(session: AuthenticatedSession): Promise<LogoutResponseDto>;
    private hashTokenId;
    private isAccessTokenPayload;
}
