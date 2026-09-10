import { PartialType } from '@nestjs/swagger';
import { CreateRefereeAvailabilityDto } from './create-referee-availability.dto';

export class UpdateRefereeAvailabilityDto extends PartialType(
  CreateRefereeAvailabilityDto,
) {}
