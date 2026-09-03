import { PartialType } from '@nestjs/swagger';
import { CreateTournamentTypeDto } from './create-tournament-type.dto';

export class UpdateTournamentTypeDto extends PartialType(
  CreateTournamentTypeDto,
  { skipNullProperties: false },
) {}
