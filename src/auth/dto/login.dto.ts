import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

const trimInput = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class LoginDto {
  @ApiPropertyOptional({
    description: 'Número celular colombiano (10 dígitos sin +57) o correo electrónico.',
    example: '3001234567',
  })
  @ValidateIf((dto: LoginDto) => !dto.email)
  @Transform(trimInput)
  @IsString()
  @IsNotEmpty({ message: 'Ingresa tu número celular o correo electrónico.' })
  @MaxLength(254)
  identifier?: string;

  @ApiPropertyOptional({
    example: 'usuario@example.com',
    format: 'email',
    description: 'Campo legado compatible con clientes anteriores.',
  })
  @ValidateIf((dto: LoginDto) => !dto.identifier)
  @Transform(({ value }: TransformFnParams): unknown => {
    const input: unknown = value;
    return typeof input === 'string' ? input.trim().toLowerCase() : input;
  })
  @IsOptional()
  @IsEmail()
  email?: string;

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
