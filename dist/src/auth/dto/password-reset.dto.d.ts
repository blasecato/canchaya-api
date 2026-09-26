export declare class RequestPasswordResetDto {
    email: string;
}
export declare class VerifyPasswordResetCodeDto {
    email: string;
    code: string;
}
export declare class ConfirmPasswordResetDto {
    resetToken: string;
    password: string;
}
export declare class PasswordResetRequestResponseDto {
    message: string;
    expiresInMinutes: number;
}
export declare class PasswordResetVerificationResponseDto {
    resetToken: string;
    expiresIn: number;
}
export declare class PasswordResetConfirmationResponseDto {
    message: string;
}
