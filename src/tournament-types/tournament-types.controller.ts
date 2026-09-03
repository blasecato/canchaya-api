import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CreateTournamentTypeDto } from './dto/create-tournament-type.dto';
import { TournamentTypeResponseDto } from './dto/tournament-type-response.dto';
import { UpdateTournamentTypeDto } from './dto/update-tournament-type.dto';
import { TournamentTypesService } from './tournament-types.service';

@ApiTags('Tournament types')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
  description: 'Token de acceso ausente, inválido, expirado o revocado.',
})
@ApiForbiddenResponse({
  description: 'El usuario no tiene un rol autorizado para esta operación.',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tournament-types')
export class TournamentTypesController {
  constructor(
    private readonly tournamentTypesService: TournamentTypesService,
  ) {}

  @Post()
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Registrar un tipo de torneo' })
  @ApiCreatedResponse({
    description: 'Tipo de torneo registrado correctamente.',
    type: TournamentTypeResponseDto,
  })
  @ApiConflictResponse({ description: 'Ya existe un tipo con ese nombre.' })
  create(
    @Body() createTournamentTypeDto: CreateTournamentTypeDto,
  ): Promise<TournamentTypeResponseDto> {
    return this.tournamentTypesService.create(createTournamentTypeDto);
  }

  @Get()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Listar todos los tipos de torneo' })
  @ApiOkResponse({
    description: 'Listado de tipos de torneo.',
    type: TournamentTypeResponseDto,
    isArray: true,
  })
  findAll(): Promise<TournamentTypeResponseDto[]> {
    return this.tournamentTypesService.findAll();
  }

  @Get(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Consultar un tipo de torneo por ID' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Tipo de torneo encontrado.',
    type: TournamentTypeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'El tipo de torneo no existe.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
  ): Promise<TournamentTypeResponseDto> {
    return this.tournamentTypesService.findOne(id);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Actualizar un tipo de torneo' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Tipo de torneo actualizado correctamente.',
    type: TournamentTypeResponseDto,
  })
  @ApiBadRequestResponse({ description: 'El rango de jugadores es inválido.' })
  @ApiConflictResponse({ description: 'Ya existe un tipo con ese nombre.' })
  @ApiNotFoundResponse({ description: 'El tipo de torneo no existe.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateTournamentTypeDto: UpdateTournamentTypeDto,
  ): Promise<TournamentTypeResponseDto> {
    return this.tournamentTypesService.update(id, updateTournamentTypeDto);
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Eliminar un tipo de torneo' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Tipo de torneo eliminado correctamente.',
    type: TournamentTypeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El tipo está siendo utilizado por uno o más torneos.',
  })
  @ApiNotFoundResponse({ description: 'El tipo de torneo no existe.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
  ): Promise<TournamentTypeResponseDto> {
    return this.tournamentTypesService.remove(id);
  }
}
