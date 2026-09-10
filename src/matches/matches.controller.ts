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
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@ApiTags('Matches')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Registrar un partido' })
  @ApiCreatedResponse({ description: 'Partido registrado correctamente.' })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createMatchDto: CreateMatchDto,
  ) {
    return this.matchesService.create(request.auth.userId, createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los partidos' })
  @ApiOkResponse({ description: 'Listado de partidos.' })
  findAll(@Req() request: AuthenticatedRequest) {
    return this.matchesService.findAll(request.auth.userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar un partido por ID' })
  @ApiOkResponse({ description: 'Partido encontrado.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.matchesService.findOne(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar un partido' })
  @ApiOkResponse({ description: 'Partido actualizado correctamente.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, request.auth.userId, updateMatchDto);
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar un partido' })
  @ApiOkResponse({ description: 'Partido eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.matchesService.remove(id, request.auth.userId);
  }
}
