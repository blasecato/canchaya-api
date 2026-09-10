import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ROLE_CODES } from '../../auth/decorators/require-roles.decorator';
import { USER_GENDERS, type UserGender } from '../user-gender.constants';

export class UpdateUserProfileDto {
  @ApiPropertyOptional({ example: '1020304050' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  idNumber?: string;

  @ApiPropertyOptional({ example: 'CC' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  documentType?: string;

  @ApiPropertyOptional({ example: 'María Pérez' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  fullName?: string;

  @ApiPropertyOptional({ example: '1995-06-20', format: 'date' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate?: string;

  @ApiPropertyOptional({ enum: USER_GENDERS })
  @IsOptional()
  @IsIn(USER_GENDERS)
  gender?: UserGender;

  @ApiPropertyOptional({ example: 'maria@example.com', format: 'email' })
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @ApiPropertyOptional({ example: '+573001234567', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;

  @ApiPropertyOptional({
    example: '["PLAYER", "REFEREE"]',
    description:
      'JSON con los roles del usuario. Solamente SUPER_ADMIN puede enviarlo.',
  })
  @Transform(({ value }: TransformFnParams): unknown => {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string' || value.trim() === '') return undefined;
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return value;
    }
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(ROLE_CODES, { each: true })
  roles?: string[];
}
