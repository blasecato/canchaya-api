import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { AssignRefereeDto } from './dto/assign-referee.dto';
import { ReplaceRefereeDto } from './dto/replace-referee.dto';
import { RespondRefereeAssignmentDto } from './dto/respond-referee-assignment.dto';
import { RefereeAssignmentsService } from './referee-assignments.service';

@ApiTags('Referee assignments')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('matches')
export class RefereeAssignmentsController {
  constructor(private readonly assignments: RefereeAssignmentsService) {}

  @Get(':matchId/referees')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Consultar asignaciones arbitrales de un partido' })
  findAll(
    @Param('matchId', ParseBigIntPipe) matchId: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.assignments.findMatchAssignments(request.auth.userId, matchId);
  }

  @Post(':matchId/referees')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Asignar un árbitro principal o asistente' })
  assign(
    @Param('matchId', ParseBigIntPipe) matchId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: AssignRefereeDto,
  ) {
    return this.assignments.assign(request.auth.userId, matchId, dto);
  }

  @Patch(':matchId/referees/:refereeId/respond')
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Aceptar o rechazar mi asignación arbitral' })
  respond(
    @Param('matchId', ParseBigIntPipe) matchId: bigint,
    @Param('refereeId', ParseBigIntPipe) refereeId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: RespondRefereeAssignmentDto,
  ) {
    if (refereeId !== request.auth.userId) {
      throw new ForbiddenException(
        'La asignación solo puede ser respondida por su árbitro.',
      );
    }
    return this.assignments.respond(request.auth.userId, matchId, dto);
  }

  @Post(':matchId/referees/:refereeId/replace')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({ summary: 'Reemplazar un árbitro asignado' })
  replace(
    @Param('matchId', ParseBigIntPipe) matchId: bigint,
    @Param('refereeId', ParseBigIntPipe) refereeId: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: ReplaceRefereeDto,
  ) {
    return this.assignments.replace(
      request.auth.userId,
      matchId,
      refereeId,
      dto,
    );
  }
}
