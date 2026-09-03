import { PartialType } from '@nestjs/swagger';
import { CreateSuspensionDto } from './create-suspension.dto';

export class UpdateSuspensionDto extends PartialType(CreateSuspensionDto, {
  skipNullProperties: false,
}) {}
