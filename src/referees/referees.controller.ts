import {
  Controller,
  Get,
  Param,
  Patch,
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
import { ListRefereeMatchesQueryDto } from './dto/list-referee-matches-query.dto';
import { RefereesService } from './referees.service';

@ApiTags('Referees')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE')
@Controller('referees')
export class RefereesController {
  constructor(private readonly refereesService: RefereesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar árbitros activos y disponibilidad de hoy' })
  findAll(@Query('search') search?: string) {
    return this.refereesService.findAll(search);
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
  removeRole(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.refereesService.removeRole(id);
  }
}
