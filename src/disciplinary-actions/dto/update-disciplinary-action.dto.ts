import { PartialType } from '@nestjs/swagger';
import { CreateDisciplinaryActionDto } from './create-disciplinary-action.dto';

export class UpdateDisciplinaryActionDto extends PartialType(
  CreateDisciplinaryActionDto,
  { skipNullProperties: false },
) {}
