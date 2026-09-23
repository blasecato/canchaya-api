import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

function trimString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

/**
 * Los campos opcionales llegan como cadena vacía desde un formulario HTML.
 * Convertirlos a null los guarda como ausentes en lugar de como texto vacío,
 * que además chocaría contra el índice único del NIT.
 */
function trimToNull(params: TransformFnParams): unknown {
  const value = trimString(params);
  return value === '' ? null : value;
}

export class CreateAssociationDto {
  @ApiProperty({ example: 'Liga Distrital de Fútbol' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiProperty({ example: 'Organización deportiva regional.' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;

  @ApiProperty({ example: 'Bogotá' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  city!: string;

  @ApiProperty({ example: 'Calle 10 # 20-30' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  address!: string;

  @ApiPropertyOptional({ example: '900123456-7', nullable: true })
  @Transform(trimToNull)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  taxId?: string | null;

  @ApiPropertyOptional({
    example: 'contacto@liga.example',
    nullable: true,
  })
  @Transform(trimToNull)
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string | null;

  @ApiProperty({ example: '+576011234567' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phone!: string;

  @ApiProperty({
    example: '1',
    description: 'ID del usuario propietario de la asociación.',
    type: String,
  })
  @Transform(trimString)
  @IsBigIntString()
  ownerUserId!: string;

  @ApiProperty({ enum: ['active', 'inactive'], example: 'active' })
  @Transform(trimString)
  @IsIn(['active', 'inactive'])
  status!: 'active' | 'inactive';
}
