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

export class CreateTeamDto {
  @ApiProperty({ example: 'Deportivo Central' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'football' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sportType!: string;

  @ApiProperty({ example: '11v11' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  modality!: string;

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
