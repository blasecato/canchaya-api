import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
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
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { normalizeColombianPhone } from '../../common/utils/phone.util';
import { USER_GENDERS } from '../../users/user-gender.constants';

export const MAX_SHEETS_PER_IMPORT = 40;
export const MAX_PLAYERS_PER_SHEET = 60;
export const DOCUMENT_TYPES = ['CC', 'TI', 'CE', 'PA'] as const;

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

const transformPhone = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? normalizeColombianPhone(value) : value;

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

  @ApiPropertyOptional({ example: 'maria.perez@correo.com' })
  @Transform(normalizeOptionalEmail)
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @MaxLength(180)
  email?: string;

  @ApiProperty({ example: '3001234567' })
  @Transform(transformPhone)
  @IsString()
  @Matches(/^3\d{9}$/, {
    message:
      'El teléfono debe ser un celular colombiano de 10 dígitos iniciando en 3 (sin +57).',
  })
  phone!: string;

  @ApiPropertyOptional({ enum: DOCUMENT_TYPES, default: 'CC' })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return 'CC';
    const normalized = value.trim().toUpperCase();
    return normalized.length > 0 ? normalized : 'CC';
  })
  @IsOptional()
  @IsIn(DOCUMENT_TYPES, {
    message: `El tipo de documento debe ser ${DOCUMENT_TYPES.join(', ')}.`,
  })
  documentType: string = 'CC';

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

  @ApiPropertyOptional({ example: 'Delantero' })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  position?: string;

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
  @ApiProperty({ example: 'Nombre equipo 1', description: 'Nombre de la hoja.' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  sheetName!: string;

  @ApiProperty({ example: 'Nombre equipo 1' })
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
