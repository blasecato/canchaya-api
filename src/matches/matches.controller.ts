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
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un partido' })
  @ApiCreatedResponse({ description: 'Partido registrado correctamente.' })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los partidos' })
  @ApiOkResponse({ description: 'Listado de partidos.' })
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar un partido por ID' })
  @ApiOkResponse({ description: 'Partido encontrado.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar un partido' })
  @ApiOkResponse({ description: 'Partido actualizado correctamente.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar un partido' })
  @ApiOkResponse({ description: 'Partido eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.matchesService.remove(id);
  }
}
