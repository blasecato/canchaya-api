import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { CreateTeamDto } from './dto/create-team.dto';
import { ListTeamsQueryDto } from './dto/list-teams-query.dto';
import { ListTeamPlayersQueryDto } from './dto/list-team-players-query.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamCarnetsResponseDto } from './dto/team-carnets-response.dto';
import { TeamCarnetsQueryDto } from './dto/team-carnets-query.dto';
import {
  TeamRosterPlayerResponseDto,
  TeamRostersResponseDto,
} from './dto/team-rosters-response.dto';
import { UpdateTournamentRosterPlayerDto } from './dto/update-tournament-roster-player.dto';
import { TeamsService } from './teams.service';

const teamPhotoUploadOptions = {
  limits: { files: 1, fileSize: MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
  fileFilter: (
    _request: unknown,
    file: { mimetype: string },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(file.mimetype)
    ) {
      callback(
        new BadRequestException(
          'El escudo debe ser una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

const photoProperty = {
  type: 'string',
  format: 'binary',
  description: 'Escudo opcional JPEG, PNG o WebP de máximo 2 MB.',
} as const;

@ApiTags('Teams')
@ApiBearerAuth('access-token')
@ApiExtraModels(CreateTeamDto, UpdateTeamDto)
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER', 'REFEREE')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('filters')
  @ApiOperation({
    summary: 'Consultar torneos disponibles para filtrar equipos',
  })
  findFilters(@Req() request: AuthenticatedRequest) {
    return this.teamsService.findFilters(request.auth.userId);
  }

  @Get('captain-options')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Listar jugadores activos disponibles para un equipo',
  })
  findCaptainOptions(@Query() query: ListTeamPlayersQueryDto) {
    return this.teamsService.findPlayerOptions(query);
  }

  @Post()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @UseInterceptors(FileInterceptor('photo', teamPhotoUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateTeamDto) },
        { type: 'object', properties: { photo: photoProperty } },
      ],
    },
  })
  @ApiOperation({ summary: 'Registrar un equipo con un capitán obligatorio' })
  @ApiCreatedResponse({ description: 'Equipo registrado correctamente.' })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.teamsService.create(request.auth.userId, createTeamDto, photo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar equipos por rol, filtros y paginación' })
  @ApiOkResponse({ description: 'Página de equipos visible para el usuario.' })
  findAll(
    @Query() query: ListTeamsQueryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.findAll(query, request.auth.userId);
  }

  @Get(':id/carnets')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({
    summary: 'Consultar datos privados para generar los carnés de un equipo',
  })
  @ApiParam({ name: 'id', example: '26', type: String })
  @ApiOkResponse({ type: TeamCarnetsResponseDto })
  findCarnets(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Query() query: TeamCarnetsQueryDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<TeamCarnetsResponseDto> {
    return this.teamsService.findCarnets(
      id,
      request.auth.userId,
      query.tournamentId ? BigInt(query.tournamentId) : undefined,
    );
  }

  @Get(':id/rosters')
  @ApiOperation({
    summary: 'Consultar dorsales y posiciones del equipo por torneo',
  })
  @ApiOkResponse({ type: TeamRostersResponseDto })
  findTournamentRosters(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<TeamRostersResponseDto> {
    return this.teamsService.findTournamentRosters(id, request.auth.userId);
  }

  @Get(':id/matches')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Consultar resultados recientes y próximos partidos del equipo',
  })
  findMatches(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.findMatches(id, request.auth.userId);
  }

  @Patch(':id/rosters/:tournamentId/players/:playerId')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Actualizar dorsal y posición de un jugador en un torneo',
  })
  @ApiOkResponse({ type: TeamRosterPlayerResponseDto })
  updateTournamentRosterPlayer(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Param('playerId', ParseBigIntPipe) playerId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateTournamentRosterPlayerDto,
  ): Promise<TeamRosterPlayerResponseDto> {
    return this.teamsService.updateTournamentRosterPlayer(
      id,
      tournamentId,
      playerId,
      request.auth.userId,
      dto,
    );
  }

  @Delete(':id/members/:playerId')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Retirar un jugador respetando los mínimos de los torneos',
  })
  removeMember(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('playerId', ParseBigIntPipe) playerId: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.removeMember(id, playerId, request.auth.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un equipo visible por ID' })
  @ApiParam({ name: 'id', example: '1', type: String })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.findOne(id, request.auth.userId);
  }

  @Patch(':id/leave')
  @RequireRoles('PLAYER')
  @ApiOperation({ summary: 'Abandonar un equipo como jugador no capitán' })
  leave(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.leave(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @UseInterceptors(FileInterceptor('photo', teamPhotoUploadOptions))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation({ summary: 'Actualizar un equipo administrable' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.teamsService.update(
      id,
      request.auth.userId,
      updateTeamDto,
      photo,
    );
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({
    summary: 'Eliminar lógicamente un equipo y conservar su historial',
  })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.teamsService.remove(id, request.auth.userId);
  }
}
