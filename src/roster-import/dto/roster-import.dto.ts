import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { USER_GENDERS } from '../../users/user-gender.constants';

export const MAX_SHEETS_PER_IMPORT = 40;
export const MAX_PLAYERS_PER_SHEET = 60;
export const DOCUMENT_TYPES = ['CC', 'TI', 'CE', 'PA'] as const;

export class RosterImportPlayerDto {
  @ApiProperty({ example: 4, description: 'Fila del Excel, para ubicar el error.' })
  @IsInt()
  @Min(1)
  @Max(100000)
  row!: number;

  @ApiProperty({ example: 'María Pérez' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  fullName!: string;

  @ApiProperty({ example: 'maria.perez@correo.com' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @MaxLength(180)
  email!: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiProperty({ enum: DOCUMENT_TYPES })
  @IsIn(DOCUMENT_TYPES, {
    message: `El tipo de documento debe ser ${DOCUMENT_TYPES.join(', ')}.`,
  })
  documentType!: string;

  @ApiProperty({ example: '1020304050' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  idNumber!: string;

  @ApiProperty({ example: '2000-06-20' })
  @IsISO8601(
    { strict: true },
    { message: 'La fecha de nacimiento debe tener el formato AAAA-MM-DD.' },
  )
  birthDate!: string;

  @ApiProperty({ enum: USER_GENDERS })
  @IsIn(USER_GENDERS, { message: 'El género registrado no es válido.' })
  gender!: string;

  @ApiProperty({ example: 'Delantero' })
  @IsString()
  @MaxLength(60)
  position!: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  jerseyNumber?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isCaptain?: boolean;
}

export class RosterImportTeamDto {
  @ApiProperty({ example: 'Deportivo Pitalito', description: 'Nombre de la hoja.' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  sheetName!: string;

  @ApiProperty({ example: 'Deportivo Pitalito' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  teamName!: string;

  @ApiProperty({ type: RosterImportPlayerDto, isArray: true })
  @IsArray()
  @ArrayNotEmpty({ message: 'Cada hoja debe traer al menos un jugador.' })
  @ArrayMaxSize(MAX_PLAYERS_PER_SHEET, {
    message: `Cada hoja admite máximo ${MAX_PLAYERS_PER_SHEET} jugadores.`,
  })
  @ValidateNested({ each: true })
  @Type(() => RosterImportPlayerDto)
  players!: RosterImportPlayerDto[];
}

export class RosterImportDto {
  @ApiProperty({ type: RosterImportTeamDto, isArray: true })
  @IsArray()
  @ArrayNotEmpty({ message: 'El archivo no trae ninguna hoja con jugadores.' })
  @ArrayMaxSize(MAX_SHEETS_PER_IMPORT, {
    message: `Puedes cargar máximo ${MAX_SHEETS_PER_IMPORT} equipos (hojas) por archivo.`,
  })
  @ValidateNested({ each: true })
  @Type(() => RosterImportTeamDto)
  teams!: RosterImportTeamDto[];
}
