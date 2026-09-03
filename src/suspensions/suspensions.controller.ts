import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';
import { SuspensionsService } from './suspensions.service';

@ApiTags('Suspensions')
@Controller('suspensions')
export class SuspensionsController {
  constructor(private readonly suspensionsService: SuspensionsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una suspensión' })
  @ApiCreatedResponse({ description: 'Suspensión registrada correctamente.' })
  create(@Body() createSuspensionDto: CreateSuspensionDto) {
    return this.suspensionsService.create(createSuspensionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las suspensiones' })
  @ApiOkResponse({ description: 'Listado de suspensiones.' })
  findAll() {
    return this.suspensionsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una suspensión por ID' })
  @ApiOkResponse({ description: 'Suspensión encontrada.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.suspensionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una suspensión' })
  @ApiOkResponse({ description: 'Suspensión actualizada correctamente.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateSuspensionDto: UpdateSuspensionDto,
  ) {
    return this.suspensionsService.update(id, updateSuspensionDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una suspensión' })
  @ApiOkResponse({ description: 'Suspensión eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.suspensionsService.remove(id);
  }
}
