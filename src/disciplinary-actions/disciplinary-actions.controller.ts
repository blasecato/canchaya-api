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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AllowBlockedUser } from '../auth/decorators/allow-blocked-user.decorator';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary-action.dto';
import { CreateDisciplinaryAppealDto } from './dto/create-disciplinary-appeal.dto';
import { DecideDisciplinaryActionDto } from './dto/decide-disciplinary-action.dto';
import { ListDisciplinaryActionsQueryDto } from './dto/list-disciplinary-actions-query.dto';
import { ReportOptionsQueryDto } from './dto/report-options-query.dto';
import { ResolveDisciplinaryAppealDto } from './dto/resolve-disciplinary-appeal.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary-action.dto';
import { UpdateDisciplinaryComplianceDto } from './dto/update-disciplinary-compliance.dto';
import { DisciplinaryActionsService } from './disciplinary-actions.service';

@ApiTags('Disciplinary actions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'REFEREE', 'PLAYER')
@Controller('disciplinary-actions')
export class DisciplinaryActionsController {
  constructor(
    private readonly disciplinaryActionsService: DisciplinaryActionsService,
  ) {}

  @Post()
  @RequireRoles('REFEREE')
  @ApiOperation({ summary: 'Registrar un informe arbitral disciplinario' })
  @ApiCreatedResponse({
    description: 'Acción disciplinaria registrada correctamente.',
  })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createDisciplinaryActionDto: CreateDisciplinaryActionDto,
  ) {
    return this.disciplinaryActionsService.create(
      request.auth.userId,
      createDisciplinaryActionDto,
    );
  }

  @Get()
  @AllowBlockedUser()
  @ApiOperation({ summary: 'Listar todas las acciones disciplinarias' })
  @ApiOkResponse({ description: 'Listado de acciones disciplinarias.' })
  findAll(
    @Req() request: AuthenticatedRequest,
    @Query() query: ListDisciplinaryActionsQueryDto,
  ) {
    return this.disciplinaryActionsService.findAll(request.auth.userId, query);
  }

  @Get('report-options')
  @RequireRoles('REFEREE')
  @ApiOperation({
    summary: 'Consultar jugadores disponibles para un informe arbitral',
  })
  findReportOptions(
    @Req() request: AuthenticatedRequest,
    @Query() query: ReportOptionsQueryDto,
  ) {
    return this.disciplinaryActionsService.findReportOptions(
      request.auth.userId,
      BigInt(query.matchId),
    );
  }

  @Get(':id')
  @AllowBlockedUser()
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una acción disciplinaria por ID' })
  @ApiOkResponse({ description: 'Acción disciplinaria encontrada.' })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.disciplinaryActionsService.findOne(id, request.auth.userId);
  }

  @Patch(':id/review')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Tomar un informe disciplinario para revisión' })
  startReview(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.disciplinaryActionsService.startReview(id, request.auth.userId);
  }

  @Patch(':id/decision')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Decidir un caso y aplicar sus sanciones' })
  decide(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: DecideDisciplinaryActionDto,
  ) {
    return this.disciplinaryActionsService.decide(id, request.auth.userId, dto);
  }

  @Post(':id/appeals')
  @RequireRoles('PLAYER')
  @AllowBlockedUser()
  @ApiOperation({ summary: 'Apelar una decisión disciplinaria propia' })
  appeal(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateDisciplinaryAppealDto,
  ) {
    return this.disciplinaryActionsService.appeal(id, request.auth.userId, dto);
  }

  @Patch(':id/appeals/resolve')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Resolver una apelación disciplinaria' })
  resolveAppeal(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: ResolveDisciplinaryAppealDto,
  ) {
    return this.disciplinaryActionsService.resolveAppeal(
      id,
      request.auth.userId,
      dto,
    );
  }

  @Patch(':id/compliance')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Registrar el cumplimiento de una sanción' })
  updateCompliance(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateDisciplinaryComplianceDto,
  ) {
    return this.disciplinaryActionsService.updateCompliance(
      id,
      request.auth.userId,
      dto,
    );
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una acción disciplinaria' })
  @ApiOkResponse({
    description: 'Acción disciplinaria actualizada correctamente.',
  })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    return this.disciplinaryActionsService.update(
      id,
      request.auth.userId,
      updateDisciplinaryActionDto,
    );
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una acción disciplinaria' })
  @ApiOkResponse({
    description: 'Acción disciplinaria eliminada correctamente.',
  })
  @ApiNotFoundResponse({ description: 'Acción disciplinaria no encontrada.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.disciplinaryActionsService.remove(id, request.auth.userId);
  }
}
