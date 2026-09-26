import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type { ConfirmPasswordResetDto, PasswordResetConfirmationResponseDto, PasswordResetRequestResponseDto, PasswordResetVerificationResponseDto, RequestPasswordResetDto, VerifyPasswordResetCodeDto } from './dto/password-reset.dto';
export declare class PasswordResetService {
    private readonly prisma;
    private readonly jwtService;
    private readonly mailService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService, configService: ConfigService);
    request(dto: RequestPasswordResetDto, requestedIp?: string): Promise<PasswordResetRequestResponseDto>;
    verify(dto: VerifyPasswordResetCodeDto): Promise<PasswordResetVerificationResponseDto>;
    confirm(dto: ConfirmPasswordResetDto): Promise<PasswordResetConfirmationResponseDto>;
    private generateCode;
    private hashCode;
    private codeMatches;
}
