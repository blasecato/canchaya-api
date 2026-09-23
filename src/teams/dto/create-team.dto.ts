import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsHexColor,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';
import {
  FOOTBALL_MODALITIES,
  FOOTBALL_SPORT_TYPE,
  type FootballModality,
} from '../../common/constants/football.constants';

export class CreateTeamDto {
  @ApiProperty({ example: 'Deportivo Central' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ enum: [FOOTBALL_SPORT_TYPE], example: FOOTBALL_SPORT_TYPE })
  @IsString()
  @IsNotEmpty()
  @IsIn([FOOTBALL_SPORT_TYPE], {
    message: 'El único deporte permitido es Fútbol.',
  })
  sportType!: typeof FOOTBALL_SPORT_TYPE;

  @ApiPropertyOptional({
    enum: FOOTBALL_MODALITIES,
    example: 'Fútbol 11',
    nullable: true,
    description:
      'Ya no se pide al crear el equipo: la modalidad la fija cada torneo. ' +
      'Se mantiene por compatibilidad y para no perder el dato histórico.',
  })
  @IsOptional()
  @IsIn(FOOTBALL_MODALITIES, {
    message: 'La modalidad debe ser Fútbol 5, Fútbol 7 o Fútbol 11.',
  })
  modality?: FootballModality | null;

  @ApiPropertyOptional({ example: '#0066CC', nullable: true })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string | null;

  @ApiPropertyOptional({ example: '#FFFFFF', nullable: true })
  @IsOptional()
  @IsHexColor()
  secondaryColor?: string | null;

  @ApiPropertyOptional({ example: '5', type: String })
  @IsOptional()
  @IsBigIntString()
  captainUserId?: string;

  @ApiPropertyOptional({
    example: '["5", "8"]',
    description: 'JSON con IDs de jugadores que integrarán el equipo.',
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
  @ArrayUnique()
  @IsBigIntString({ each: true })
  memberUserIds?: string[];

  @ApiPropertyOptional({ enum: ['active', 'inactive'], default: 'active' })
  @IsOptionalNonNullable()
  @IsIn(['active', 'inactive'])
  status?: string;
}
