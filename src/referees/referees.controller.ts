import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CreateRefereeAvailabilityDto } from './dto/create-referee-availability.dto';
import { ListRefereeAvailabilityQueryDto } from './dto/list-referee-availability-query.dto';
import { ListRefereeMatchesQueryDto } from './dto/list-referee-matches-query.dto';
import { UpdateRefereeAvailabilityDto } from './dto/update-referee-availability.dto';
import { RefereeAssignmentsService } from './referee-assignments.service';
import { RefereesService } from './referees.service';

@ApiTags('Referees')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
@Controller('referees')
export class RefereesController {
  constructor(
    private readonly refereesService: RefereesService,
    private readonly assignmentsService: RefereeAssignmentsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar árbitros activos y disponibilidad de hoy' })
  findAll(@Query('search') search?: string) {
    return this.refereesService.findAll(search);
  }

  @Get('me/availability')
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Consultar mi disponibilidad arbitral' })
  findMyAvailability(
    @Req() request: AuthenticatedRequest,
    @Query() query: ListRefereeAvailabilityQueryDto,
  ) {
    return this.refereesService.findAvailability(
      request.auth.userId,
      request.auth.userId,
      query,
    );
  }

  @Post('me/availability')
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Registrar un bloque de disponibilidad arbitral' })
  createMyAvailability(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateRefereeAvailabilityDto,
  ) {
    return this.refereesService.createAvailability(request.auth.userId, dto);
  }

  @Patch('me/availability/:availabilityId')
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Actualizar un bloque de disponibilidad arbitral' })
  updateMyAvailability(
    @Req() request: AuthenticatedRequest,
    @Param('availabilityId', ParseBigIntPipe) availabilityId: bigint,
    @Body() dto: UpdateRefereeAvailabilityDto,
  ) {
    return this.refereesService.updateAvailability(
      request.auth.userId,
      availabilityId,
      dto,
    );
  }

  @Delete('me/availability/:availabilityId')
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Eliminar un bloque de disponibilidad arbitral' })
  removeMyAvailability(
    @Req() request: AuthenticatedRequest,
    @Param('availabilityId', ParseBigIntPipe) availabilityId: bigint,
  ) {
    return this.refereesService.removeAvailability(
      request.auth.userId,
      availabilityId,
    );
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Consultar disponibilidad de un árbitro' })
  findAvailability(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Query() query: ListRefereeAvailabilityQueryDto,
  ) {
    return this.refereesService.findAvailability(
      id,
      request.auth.userId,
      query,
    );
  }

  @Get(':id/assignable-matches')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({
    summary: 'Listar partidos donde se puede asignar un árbitro',
  })
  findAssignableMatches(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.assignmentsService.findAssignableMatches(
      request.auth.userId,
      id,
    );
  }

  @Get(':id/matches')
  @ApiOperation({
    summary: 'Consultar partidos dirigidos y próximos de un árbitro',
  })
  findMatches(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Query() query: ListRefereeMatchesQueryDto,
  ) {
    return this.refereesService.findMatches(id, request.auth.userId, query);
  }

  @Patch(':id/remove-role')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Cambiar el rol de árbitro por el rol de jugador' })
  removeRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.refereesService.removeRole(id, request.auth.userId);
  }
}
