import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateUserDto {
  @ApiProperty({ example: '1020304050' })
  @IsString()
  @IsNotEmpty()
  idNumber!: string;

  @ApiProperty({ example: 'CC' })
  @IsString()
  @IsNotEmpty()
  documentType!: string;

  @ApiProperty({ example: 'María Pérez' })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: '1995-06-20', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate!: string;

  @ApiProperty({ example: 'maria@example.com', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: '+573001234567', nullable: true })
  @IsOptional()
  @IsString()
  phone?: string | null;

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

  @ApiPropertyOptional({ enum: ['active', 'inactive'], default: 'active' })
  @IsOptionalNonNullable()
  @IsIn(['active', 'inactive'])
  status?: string;
}
