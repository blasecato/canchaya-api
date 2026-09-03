import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
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

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const normalizeEmail = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

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

  @ApiProperty({ example: 'juan@example.com' })
  @Transform(normalizeEmail)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({ example: 27, minimum: 1, maximum: 120 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(120)
  age!: number;

  @ApiPropertyOptional({ example: '+57 300 123 4567' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiProperty({ example: '1999-05-20', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate!: string;

  @ApiProperty({ example: 'Pitalito' })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  birthCity!: string;

  @ApiProperty({ minLength: 8, writeOnly: true })
  @IsString()
  @MinLength(8)
  @IsBcryptPassword()
  password!: string;
}
