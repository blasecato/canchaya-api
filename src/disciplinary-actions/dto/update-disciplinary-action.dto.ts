import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { IsOptionalNonNullable } from '../../common/decorators/is-optional-non-nullable.decorator';
import { CreateDisciplinaryActionDto } from './create-disciplinary-action.dto';

export class UpdateDisciplinaryActionDto extends PartialType(
  CreateDisciplinaryActionDto,
  { skipNullProperties: false },
) {
  @ApiPropertyOptional({
    example: 'approved',
    enum: ['reported', 'approved', 'dismissed'],
  })
  @IsOptionalNonNullable()
  @IsIn(['reported', 'approved', 'dismissed'])
  decisionStatus?: string;

  @ApiPropertyOptional({ example: 'Decisión confirmada.', nullable: true })
  @IsOptional()
  @IsString()
  decisionNotes?: string | null;
}
