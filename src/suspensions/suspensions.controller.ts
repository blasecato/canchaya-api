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
import { CreateSuspensionDto } from './dto/create-suspension.dto';
import { UpdateSuspensionDto } from './dto/update-suspension.dto';
import { SuspensionsService } from './suspensions.service';

@ApiTags('Suspensions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
@Controller('suspensions')
export class SuspensionsController {
  constructor(private readonly suspensionsService: SuspensionsService) {}

  @Post()
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Registrar una suspensión' })
  @ApiCreatedResponse({ description: 'Suspensión registrada correctamente.' })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createSuspensionDto: CreateSuspensionDto,
  ) {
    return this.suspensionsService.create(
      request.auth.userId,
      createSuspensionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las suspensiones' })
  @ApiOkResponse({ description: 'Listado de suspensiones.' })
  findAll(@Req() request: AuthenticatedRequest) {
    return this.suspensionsService.findAll(request.auth.userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una suspensión por ID' })
  @ApiOkResponse({ description: 'Suspensión encontrada.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.suspensionsService.findOne(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una suspensión' })
  @ApiOkResponse({ description: 'Suspensión actualizada correctamente.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateSuspensionDto: UpdateSuspensionDto,
  ) {
    return this.suspensionsService.update(
      id,
      request.auth.userId,
      updateSuspensionDto,
    );
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una suspensión' })
  @ApiOkResponse({ description: 'Suspensión eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'Suspensión no encontrada.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.suspensionsService.remove(id, request.auth.userId);
  }
}
