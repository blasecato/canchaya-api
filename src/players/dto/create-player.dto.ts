import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsBcryptPassword } from '../../common/decorators/is-bcrypt-password.decorator';
import {
  USER_GENDERS,
  type UserGender,
} from '../../users/user-gender.constants';

export class CreatePlayerDto {
  @ApiProperty({ example: '1020304050' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  idNumber!: string;

  @ApiProperty({ example: 'CC' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  documentType!: string;

  @ApiProperty({ example: 'María Pérez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  fullName!: string;

  @ApiProperty({ example: '2000-06-20', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate!: string;

  @ApiProperty({ enum: USER_GENDERS, example: 'male' })
  @IsIn(USER_GENDERS)
  gender!: UserGender;

  @ApiProperty({ example: 'maria@example.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;

  @ApiProperty({ minLength: 8, writeOnly: true })
  @IsString()
  @MinLength(8)
  @IsBcryptPassword()
  password!: string;
}
