import { ApiProperty } from '@nestjs/swagger';
import { PublicUserResponseDto } from '../../users/dto/public-user-response.dto';

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT de acceso.' })
  accessToken!: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';

  @ApiProperty({
    description: 'Duración del token en segundos.',
    example: 86400,
  })
  expiresIn!: number;

  @ApiProperty({ example: '2026-08-22T19:00:00.000Z', format: 'date-time' })
  expiresAt!: string;

  @ApiProperty({ type: PublicUserResponseDto })
  user!: PublicUserResponseDto;
}
