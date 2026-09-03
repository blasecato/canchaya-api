import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';

export class CreateSponsorDto {
  @ApiProperty({ example: 'Deportes Colombia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '900123456-7', nullable: true })
  @IsOptional()
  @IsString()
  taxId?: string | null;

  @ApiPropertyOptional({ example: 'Laura Gómez', nullable: true })
  @IsOptional()
  @IsString()
  contactName?: string | null;

  @ApiPropertyOptional({ example: 'contacto@deportes.co', nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional({ example: '+57 300 123 4567', nullable: true })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional({ example: 'https://deportes.co', nullable: true })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  websiteUrl?: string | null;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  @IsOptionalNonNullable()
  @IsIn(['active', 'inactive'])
  status?: string;
}
