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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
import { AssociationsService } from './associations.service';
import { AssociationResponseDto } from './dto/association-response.dto';
import { AssociationDetailResponseDto } from './dto/association-detail-response.dto';
import { AssociationTournamentResponseDto } from './dto/association-tournament-response.dto';
import { CreateAssociationDto } from './dto/create-association.dto';
import { ListAssociationTournamentsQueryDto } from './dto/list-association-tournaments-query.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';

@ApiTags('Associations')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
  description: 'Token de acceso ausente, inválido, expirado o revocado.',
})
@ApiForbiddenResponse({
  description: 'El usuario no tiene rol o alcance sobre la asociación.',
})
@ApiExtraModels(CreateAssociationDto, UpdateAssociationDto)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Post()
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ],
      {
        limits: {
          fields: 9,
          files: 2,
          fileSize: MAX_IMAGE_SIZE_BYTES,
          parts: 12,
        },
        fileFilter: (_request, file, callback) => {
          if (
            !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(
              file.mimetype,
            )
          ) {
            callback(
              new BadRequestException(
                'El logo y la portada deben ser imágenes JPEG, PNG o WebP.',
              ),
              false,
            );
            return;
          }

          callback(null, true);
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateAssociationDto) },
        {
          type: 'object',
          required: ['logo', 'cover'],
          properties: {
            logo: {
              type: 'string',
              format: 'binary',
              description: 'Imagen JPEG, PNG o WebP de máximo 2 MB.',
            },
            cover: {
              type: 'string',
              format: 'binary',
              description: 'Portada JPEG, PNG o WebP de máximo 2 MB.',
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Registrar una asociación' })
  @ApiCreatedResponse({
    description: 'Asociación registrada correctamente.',
    type: AssociationResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Datos inválidos, propietario inactivo o imágenes no permitidas.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'Una de las imágenes supera el límite de 2 MB.',
  })
  @ApiConflictResponse({
    description: 'El NIT o el propietario ya están asociados a otro registro.',
  })
  @ApiNotFoundResponse({ description: 'El usuario propietario no existe.' })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createAssociationDto: CreateAssociationDto,
    @UploadedFiles()
    images:
      { logo?: UploadedImageFile[]; cover?: UploadedImageFile[] } | undefined,
  ): Promise<AssociationResponseDto> {
    const logo = images?.logo?.[0];
    const cover = images?.cover?.[0];

    if (!logo || !cover) {
      throw new BadRequestException(
        'El logo y la portada de la asociación son obligatorios.',
      );
    }

    return this.associationsService.create(
      createAssociationDto,
      logo,
      cover,
      request.auth.userId,
    );
  }

  @Get()
  @RequireRoles('SUPER_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Listar las asociaciones visibles para el usuario',
    description:
      'SUPER_ADMIN consulta todas las asociaciones; PLAYER consulta únicamente las asociaciones activas.',
  })
  @ApiOkResponse({
    description: 'Listado de asociaciones con propietario y métricas.',
    type: AssociationResponseDto,
    isArray: true,
  })
  findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<AssociationResponseDto[]> {
    return this.associationsService.findAll(request.auth.userId);
  }

  @Get('mine')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @ApiOperation({
    summary: 'Listar las asociaciones accesibles del usuario autenticado',
    description:
      'Devuelve asociaciones donde el usuario es propietario o tiene una asignación activa. Un SUPER_ADMIN obtiene únicamente sus asociaciones vinculadas; para consultar todas debe usar GET /associations.',
  })
  @ApiOkResponse({
    description: 'Asociaciones propias o asignadas, sin duplicados.',
    type: AssociationResponseDto,
    isArray: true,
  })
  findMine(
    @Req() request: AuthenticatedRequest,
  ): Promise<AssociationResponseDto[]> {
    return this.associationsService.findMine(request.auth.userId);
  }

  @Get('administered-by/:userId')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Listar las asociaciones administradas por un usuario',
  })
  @ApiParam({ name: 'userId', example: '12', type: String })
  @ApiOkResponse({
    description:
      'Asociaciones donde el usuario es propietario o administrador activo.',
    type: AssociationResponseDto,
    isArray: true,
  })
  findAdministeredBy(
    @Param('userId', ParseBigIntPipe) userId: bigint,
  ): Promise<AssociationResponseDto[]> {
    return this.associationsService.findAdministeredBy(userId);
  }

  @Get(':id/tournaments')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({
    summary: 'Listar los torneos disponibles de una asociación',
  })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiQuery({
    name: 'scope',
    required: false,
    enum: ['available', 'management'],
    description:
      'management muestra todos los estados y exige permiso para administrar torneos.',
  })
  @ApiOkResponse({
    description: 'Torneos activos disponibles, ordenados por fecha de inicio.',
    type: AssociationTournamentResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'La asociación no existe.' })
  findAvailableTournaments(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Query() query: ListAssociationTournamentsQueryDto,
  ): Promise<AssociationTournamentResponseDto[]> {
    return this.associationsService.findAvailableTournaments(
      id,
      request.auth.userId,
      query.scope,
    );
  }

  @Get(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN', 'PLAYER')
  @ApiOperation({ summary: 'Consultar una asociación por ID' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Asociación encontrada.',
    type: AssociationDetailResponseDto,
  })
  @ApiNotFoundResponse({ description: 'La asociación no existe.' })
  findOne(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
  ): Promise<AssociationDetailResponseDto> {
    return this.associationsService.findOne(id, request.auth.userId);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ],
      {
        limits: {
          fields: 9,
          files: 2,
          fileSize: MAX_IMAGE_SIZE_BYTES,
          parts: 12,
        },
        fileFilter: (_request, file, callback) => {
          if (
            !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(
              file.mimetype,
            )
          ) {
            callback(
              new BadRequestException(
                'El logo y la portada deben ser imágenes JPEG, PNG o WebP.',
              ),
              false,
            );
            return;
          }

          callback(null, true);
        },
      },
    ),
  )
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(UpdateAssociationDto) },
        {
          type: 'object',
          properties: {
            logo: {
              type: 'string',
              format: 'binary',
              description: 'Nuevo logo opcional, de máximo 2 MB.',
            },
            cover: {
              type: 'string',
              format: 'binary',
              description: 'Nueva portada opcional, de máximo 2 MB.',
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Actualizar una asociación' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Asociación actualizada correctamente.',
    type: AssociationDetailResponseDto,
  })
  @ApiNotFoundResponse({ description: 'La asociación no existe.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() updateAssociationDto: UpdateAssociationDto,
    @UploadedFiles()
    images:
      { logo?: UploadedImageFile[]; cover?: UploadedImageFile[] } | undefined,
  ): Promise<AssociationDetailResponseDto> {
    return this.associationsService.update(
      id,
      request.auth.userId,
      updateAssociationDto,
      { logo: images?.logo?.[0], cover: images?.cover?.[0] },
    );
  }

  @Delete(':id')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Eliminar una asociación' })
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOkResponse({
    description: 'Asociación eliminada correctamente.',
    type: AssociationResponseDto,
  })
  @ApiNotFoundResponse({ description: 'La asociación no existe.' })
  remove(
    @Param('id', ParseBigIntPipe) id: bigint,
  ): Promise<AssociationResponseDto> {
    return this.associationsService.remove(id);
  }
}
