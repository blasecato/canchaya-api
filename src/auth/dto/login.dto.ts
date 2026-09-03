import { Transform, type TransformFnParams } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class LoginDto {
  @ApiProperty({ example: 'usuario@example.com', format: 'email' })
  @Transform(({ value }: TransformFnParams): unknown => {
    const input: unknown = value;
    return typeof input === 'string' ? input.trim().toLowerCase() : input;
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario. Máximo 72 bytes en UTF-8.',
    example: 'UnaClaveSegura123',
    format: 'password',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsBcryptPassword()
  password!: string;

  @ApiPropertyOptional({
    default: false,
    description:
      'Mantiene la sesión durante el período extendido configurado por el servidor.',
  })
  @IsOptionalNonNullable()
  @IsBoolean()
  rememberMe?: boolean;
}
