import { PublicUserResponseDto } from '../../users/dto/public-user-response.dto';
export declare class LoginResponseDto {
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: number;
    expiresAt: string;
    user: PublicUserResponseDto;
}
