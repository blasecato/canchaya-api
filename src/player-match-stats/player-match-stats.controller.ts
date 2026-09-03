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
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';
import { PlayerMatchStatsService } from './player-match-stats.service';

@ApiTags('Player match stats')
@Controller('player-match-stats')
export class PlayerMatchStatsController {
  constructor(
    private readonly playerMatchStatsService: PlayerMatchStatsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar estadísticas de un jugador en un partido',
  })
  @ApiCreatedResponse({
    description: 'Estadísticas registradas correctamente.',
  })
  create(@Body() createPlayerMatchStatDto: CreatePlayerMatchStatDto) {
    return this.playerMatchStatsService.create(createPlayerMatchStatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las estadísticas por partido' })
  @ApiOkResponse({ description: 'Listado de estadísticas por partido.' })
  findAll() {
    return this.playerMatchStatsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar estadísticas por ID' })
  @ApiOkResponse({ description: 'Estadísticas encontradas.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.playerMatchStatsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar estadísticas de un partido' })
  @ApiOkResponse({ description: 'Estadísticas actualizadas correctamente.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updatePlayerMatchStatDto: UpdatePlayerMatchStatDto,
  ) {
    return this.playerMatchStatsService.update(id, updatePlayerMatchStatDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar estadísticas de un partido' })
  @ApiOkResponse({ description: 'Estadísticas eliminadas correctamente.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.playerMatchStatsService.remove(id);
  }
}
