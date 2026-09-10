import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CreatePlayerMatchStatDto } from './dto/create-player-match-stat.dto';
import { UpdatePlayerMatchStatDto } from './dto/update-player-match-stat.dto';
import { PlayerMatchStatsService } from './player-match-stats.service';

@ApiTags('Player match stats')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER')
@Controller('player-match-stats')
export class PlayerMatchStatsController {
  constructor(
    private readonly playerMatchStatsService: PlayerMatchStatsService,
  ) {}

  @Post()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
  @ApiOperation({
    summary: 'Registrar estadísticas de un jugador en un partido',
  })
  @ApiCreatedResponse({
    description: 'Estadísticas registradas correctamente.',
  })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createPlayerMatchStatDto: CreatePlayerMatchStatDto,
  ) {
    return this.playerMatchStatsService.create(
      request.auth.userId,
      createPlayerMatchStatDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las estadísticas por partido' })
  @ApiOkResponse({ description: 'Listado de estadísticas por partido.' })
  findAll(@Req() request: AuthenticatedRequest) {
    return this.playerMatchStatsService.findAll(request.auth.userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar estadísticas por ID' })
  @ApiOkResponse({ description: 'Estadísticas encontradas.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.playerMatchStatsService.findOne(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar estadísticas de un partido' })
  @ApiOkResponse({ description: 'Estadísticas actualizadas correctamente.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updatePlayerMatchStatDto: UpdatePlayerMatchStatDto,
  ) {
    return this.playerMatchStatsService.update(
      id,
      request.auth.userId,
      updatePlayerMatchStatDto,
    );
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar estadísticas de un partido' })
  @ApiOkResponse({ description: 'Estadísticas eliminadas correctamente.' })
  @ApiNotFoundResponse({ description: 'Estadísticas no encontradas.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.playerMatchStatsService.remove(id, request.auth.userId);
  }
}
