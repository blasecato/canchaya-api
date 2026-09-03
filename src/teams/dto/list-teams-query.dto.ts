import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsBigIntString } from '../../common/decorators/is-big-int-string.decorator';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class ListTeamsQueryDto {
  @ApiPropertyOptional({ example: 'Galácticos' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @ApiPropertyOptional({ example: '1', type: String })
  @Transform(trim)
  @IsOptional()
  @IsBigIntString()
  tournamentId?: string;

  @ApiPropertyOptional({
    enum: ['approved', 'pending', 'rejected', 'changes_requested'],
  })
  @IsOptional()
  @IsIn(['approved', 'pending', 'rejected', 'changes_requested'])
  registrationStatus?: string;

  @ApiPropertyOptional({ default: false })
  @Transform(
    ({ value }: TransformFnParams) => value === true || value === 'true',
  )
  @IsOptional()
  @IsBoolean()
  managedTournamentsOnly?: boolean;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  pageSize = 10;
}
