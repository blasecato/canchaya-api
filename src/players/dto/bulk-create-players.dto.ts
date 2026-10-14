import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  USER_GENDERS,
  type UserGender,
} from '../../users/user-gender.constants';

/** Tope por carga: mantiene la transacción y la respuesta en un tamaño sano. */
export const MAX_BULK_PLAYERS = 500;

export class BulkPlayerRowDto {
  @ApiProperty({
    example: 2,
    description: 'Fila del archivo, para señalar el error donde ocurrió.',
  })
  @IsInt()
  @Min(1)
  row!: number;

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
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de nacimiento debe tener formato AAAA-MM-DD.',
  })
  @IsDateString({ strict: true, strictSeparator: true })
  birthDate!: string;

  @ApiProperty({ enum: USER_GENDERS })
  @IsIn(USER_GENDERS, { message: 'El género no es válido.' })
  gender!: UserGender;

  @ApiProperty({ example: 'maria@example.com' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;
}

export class BulkCreatePlayersDto {
  @ApiProperty({ type: BulkPlayerRowDto, isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(MAX_BULK_PLAYERS, {
    message: `Puedes cargar máximo ${MAX_BULK_PLAYERS} jugadores por archivo.`,
  })
  @ValidateNested({ each: true })
  @Type(() => BulkPlayerRowDto)
  players!: BulkPlayerRowDto[];
}

export class BulkPlayerSkippedDto {
  @ApiProperty({ example: 14 })
  row!: number;

  @ApiProperty({ example: '1020304050' })
  idNumber!: string;

  @ApiProperty({ example: 'María Pérez' })
  fullName!: string;

  @ApiProperty({
    enum: ['duplicate_document', 'duplicate_email', 'duplicate_in_file'],
  })
  reason: 'duplicate_document' | 'duplicate_email' | 'duplicate_in_file';

  @ApiProperty({ example: 'Ya existe una cuenta con ese documento.' })
  detail!: string;
}

export class BulkCreatePlayersResponseDto {
  @ApiProperty({ example: 100 })
  received!: number;

  @ApiProperty({ example: 80 })
  created!: number;

  @ApiProperty({ type: BulkPlayerSkippedDto, isArray: true })
  skipped!: BulkPlayerSkippedDto[];

  @ApiProperty({
    example: 'Asprofutpi2026*',
    description: 'Clave temporal asignada a los jugadores creados.',
  })
  temporaryPassword!: string;
}
