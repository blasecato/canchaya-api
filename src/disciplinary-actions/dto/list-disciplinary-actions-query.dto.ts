import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListDisciplinaryActionsQueryDto {
  @ApiPropertyOptional({
    enum: ['reported', 'under_review', 'approved', 'dismissed'],
  })
  @IsOptional()
  @IsIn(['reported', 'under_review', 'approved', 'dismissed'])
  status?: string;

  @ApiPropertyOptional({ example: 'Juan o Copa' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 1, default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ example: 20, default: 20, minimum: 1, maximum: 50 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  pageSize = 20;
}
