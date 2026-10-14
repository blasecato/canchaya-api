import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { RosterImportDto } from './dto/roster-import.dto';
import { RosterImportResultDto } from './dto/roster-import-result.dto';
import { RosterImportService } from './roster-import.service';

@ApiTags('Carga masiva de plantillas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
@Controller('tournaments/:tournamentId/roster-import')
export class RosterImportController {
  constructor(private readonly rosterImport: RosterImportService) {}

  @Post()
  @ApiOperation({
    summary: 'Cargar equipos y plantillas desde un archivo de varias hojas',
    description:
      'Cada hoja es un equipo. Los jugadores nuevos se crean con una clave temporal; los que ya existen se vinculan al equipo y al torneo.',
  })
  @ApiOkResponse({ type: RosterImportResultDto })
  import(
    @Param('tournamentId', ParseBigIntPipe) tournamentId: bigint,
    @Body() dto: RosterImportDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<RosterImportResultDto> {
    return this.rosterImport.import(tournamentId, dto, request.auth.userId);
  }
}
