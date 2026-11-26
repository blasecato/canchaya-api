import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Matches,
} from 'class-validator';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';
import { normalizeColombianPhone } from '../../common/utils/phone.util';
import { USER_GENDERS, type UserGender } from '../user-gender.constants';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const trimOptional = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const normalizeOptionalEmail = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
};

const transformColombianPhone = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? normalizeColombianPhone(value) : value;

export class RegisterPlayerDto {
  @ApiProperty({ example: '1020304050' })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  idNumber!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  fullName!: string;

  @ApiProperty({
    example: '3001234567',
    description:
      'Número celular colombiano de 10 dígitos iniciando en 3 (sin +57 ni espacios).',
  })
  @Transform(transformColombianPhone)
  @IsString()
  @Matches(/^3\d{9}$/, {
    message:
      'Ingresa un número celular colombiano válido de 10 dígitos que inicie con 3.',
  })
  phone!: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  @Transform(normalizeOptionalEmail)
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @ApiPropertyOptional({ example: 27, minimum: 1, maximum: 120 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(120)
  age?: number;

  @ApiProperty({ example: '1999-05-20', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate!: string;

  @ApiPropertyOptional({ example: 'Pitalito' })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  birthCity?: string;

  @ApiProperty({ enum: USER_GENDERS, example: 'male' })
  @IsIn(USER_GENDERS)
  gender!: UserGender;

  @ApiProperty({ minLength: 8, writeOnly: true })
  @IsString()
  @MinLength(8)
  @IsBcryptPassword()
  password!: string;
}
