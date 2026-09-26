import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { ConfirmPasswordResetDto, PasswordResetConfirmationResponseDto, PasswordResetRequestResponseDto, PasswordResetVerificationResponseDto, RequestPasswordResetDto, VerifyPasswordResetCodeDto } from './dto/password-reset.dto';
import { PasswordResetService } from './password-reset.service';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
export declare class AuthController {
    private readonly authService;
    private readonly passwordResetService;
    constructor(authService: AuthService, passwordResetService: PasswordResetService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    logout(request: AuthenticatedRequest): Promise<LogoutResponseDto>;
    requestPasswordReset(dto: RequestPasswordResetDto, ip: string): Promise<PasswordResetRequestResponseDto>;
    verifyPasswordResetCode(dto: VerifyPasswordResetCodeDto): Promise<PasswordResetVerificationResponseDto>;
    confirmPasswordReset(dto: ConfirmPasswordResetDto): Promise<PasswordResetConfirmationResponseDto>;
}
