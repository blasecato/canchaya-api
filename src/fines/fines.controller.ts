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
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FinesService } from './fines.service';

@ApiTags('Fines')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Registrar una multa' })
  @ApiCreatedResponse({ description: 'Multa registrada correctamente.' })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createFineDto: CreateFineDto,
  ) {
    return this.finesService.create(request.auth.userId, createFineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las multas' })
  @ApiOkResponse({ description: 'Listado de multas.' })
  findAll(@Req() request: AuthenticatedRequest) {
    return this.finesService.findAll(request.auth.userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar una multa por ID' })
  @ApiOkResponse({ description: 'Multa encontrada.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.finesService.findOne(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar una multa' })
  @ApiOkResponse({ description: 'Multa actualizada correctamente.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateFineDto: UpdateFineDto,
  ) {
    return this.finesService.update(id, request.auth.userId, updateFineDto);
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar una multa' })
  @ApiOkResponse({ description: 'Multa eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'Multa no encontrada.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.finesService.remove(id, request.auth.userId);
  }
}
