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
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';
import { DisciplinaryActionsService } from './disciplinary-actions.service';

@ApiTags('Disciplinary actions')
@Controller('disciplinary-actions')
export class DisciplinaryActionsController {
  constructor(
    private readonly disciplinaryActionsService: DisciplinaryActionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una acción disciplinaria' })
  @ApiCreatedResponse({
    description: 'Acción disciplinaria registrada correctamente.',
  })
  create(@Body() createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    return this.disciplinaryActionsService.create(createDisciplinaryActionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las acciones disciplinarias' })
  @ApiOkResponse({ description: 'Listado de acciones disciplinarias.' })
  findAll() {
    return this.disciplinaryActionsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una acción disciplinaria por ID' })
  @ApiOkResponse({ description: 'Acción disciplinaria encontrada.' })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.disciplinaryActionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una acción disciplinaria' })
  @ApiOkResponse({
    description: 'Acción disciplinaria actualizada correctamente.',
  })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    return this.disciplinaryActionsService.update(
      id,
      updateDisciplinaryActionDto,
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una acción disciplinaria' })
  @ApiOkResponse({
    description: 'Acción disciplinaria eliminada correctamente.',
  })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.disciplinaryActionsService.remove(id);
  }
}
