import { ApiProperty } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';

const normalizeEmail = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

const trimValue = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class RequestPasswordResetDto {
  @ApiProperty({ example: 'jugador@asprofutpitorneos.com' })
  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email!: string;
}

export class VerifyPasswordResetCodeDto {
  @ApiProperty({ example: 'jugador@asprofutpitorneos.com' })
  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email!: string;

  @ApiProperty({ example: '482913', description: 'Código de seis dígitos.' })
  @Transform(trimValue)
  @IsString()
  @Matches(/^\d{6}$/, { message: 'El código debe tener seis dígitos.' })
  code!: string;
}

export class ConfirmPasswordResetDto {
  @ApiProperty({ description: 'Token entregado al verificar el código.' })
  @Transform(trimValue)
  @IsString()
  resetToken!: string;

  @ApiProperty({
    example: 'UnaClaveSegura123',
    description: 'Entre 8 caracteres y 72 bytes en UTF-8.',
    minLength: 8,
    writeOnly: true,
  })
  @IsString()
  @MinLength(8)
  @IsBcryptPassword()
  password!: string;
}

export class PasswordResetRequestResponseDto {
  @ApiProperty({
    example:
      'Si el correo está registrado enviaremos un código de verificación.',
  })
  message!: string;

  @ApiProperty({ example: 10, description: 'Minutos de vigencia del código.' })
  expiresInMinutes!: number;
}

export class PasswordResetVerificationResponseDto {
  @ApiProperty({ description: 'Token de un solo uso para cambiar la clave.' })
  resetToken!: string;

  @ApiProperty({ example: 600, description: 'Vigencia del token en segundos.' })
  expiresIn!: number;
}

export class PasswordResetConfirmationResponseDto {
  @ApiProperty({ example: 'Tu contraseña fue actualizada correctamente.' })
  message!: string;
}
