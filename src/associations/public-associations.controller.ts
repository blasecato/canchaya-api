import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssociationsService } from './associations.service';
import { PublicAssociationResponseDto } from './dto/public-association-response.dto';

@ApiTags('Public associations')
@Controller('public/associations')
export class PublicAssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar las organizaciones activas para la página pública',
    description:
      'Solo expone nombre, ciudad, logo y administrador responsable; nunca datos de contacto.',
  })
  @ApiOkResponse({ type: PublicAssociationResponseDto, isArray: true })
  findAll(): Promise<PublicAssociationResponseDto[]> {
    return this.associationsService.findPublicDirectory();
  }
}
