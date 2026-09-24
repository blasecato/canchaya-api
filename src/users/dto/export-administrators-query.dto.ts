import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class ExportAdministratorsQueryDto {
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @ApiPropertyOptional({ enum: ['SUPER_ADMIN', 'ASSOCIATION_ADMIN'] })
  @IsOptional()
  @IsIn(['SUPER_ADMIN', 'ASSOCIATION_ADMIN'])
  role?: 'SUPER_ADMIN' | 'ASSOCIATION_ADMIN';

  @ApiPropertyOptional({ enum: ['active', 'blocked'] })
  @IsOptional()
  @IsIn(['active', 'blocked'])
  status?: 'active' | 'blocked';
}
