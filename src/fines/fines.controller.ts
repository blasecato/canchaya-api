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
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FinesService } from './fines.service';

@ApiTags('Fines')
@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una multa' })
  @ApiCreatedResponse({ description: 'Multa registrada correctamente.' })
  create(@Body() createFineDto: CreateFineDto) {
    return this.finesService.create(createFineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las multas' })
  @ApiOkResponse({ description: 'Listado de multas.' })
  findAll() {
    return this.finesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una multa por ID' })
  @ApiOkResponse({ description: 'Multa encontrada.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.finesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una multa' })
  @ApiOkResponse({ description: 'Multa actualizada correctamente.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateFineDto: UpdateFineDto,
  ) {
    return this.finesService.update(id, updateFineDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una multa' })
  @ApiOkResponse({ description: 'Multa eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.finesService.remove(id);
  }
}
