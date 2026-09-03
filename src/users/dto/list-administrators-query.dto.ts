import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class ListAdministratorsQueryDto {
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

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  pageSize = 20;
}
