import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
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
import { BlockPlayerDto } from './dto/block-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { ListPlayersQueryDto } from './dto/list-players-query.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';

const playerPhotoUploadOptions = {
  limits: { files: 1, fileSize: MAX_IMAGE_SIZE_BYTES, fields: 10, parts: 12 },
  fileFilter: (
    _request: unknown,
    file: { mimetype: string },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(file.mimetype)
    ) {
      callback(
        new BadRequestException(
          'La foto de perfil debe ser una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

const photoProperty = {
  type: 'string',
  format: 'binary',
  description: 'Foto de perfil opcional JPEG, PNG o WebP de máximo 2 MB.',
} as const;

@ApiTags('Player administration')
@ApiBearerAuth('access-token')
@ApiExtraModels(CreatePlayerDto, UpdatePlayerDto)
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('filters')
  @ApiOperation({
    summary: 'Consultar equipos y torneos para filtrar jugadores',
  })
  findFilters() {
    return this.playersService.findFilters();
  }

  @Get()
  @ApiOperation({
    summary: 'Listar jugadores con métricas, filtros y paginación',
  })
  findAll(
    @Query() query: ListPlayersQueryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.playersService.findAll(query, request.auth.userId);
  }

  @Post()
  @RequireRoles('SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('photo', playerPhotoUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreatePlayerDto) },
        { type: 'object', properties: { photo: photoProperty } },
      ],
    },
  })
  @ApiOperation({ summary: 'Registrar un usuario con rol de jugador' })
  create(
    @Body() dto: CreatePlayerDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.playersService.create(dto, photo);
  }

  @Patch(':id/block')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Bloquear temporalmente un jugador y revocar sus sesiones',
  })
  block(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Req() request: AuthenticatedRequest,
    @Body() dto: BlockPlayerDto,
  ) {
    return this.playersService.block(id, request.auth.userId, dto);
  }

  @Patch(':id/unblock')
  @RequireRoles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Levantar el bloqueo de un jugador' })
  unblock(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.playersService.unblock(id);
  }

  @Patch(':id')
  @RequireRoles('SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('photo', playerPhotoUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(UpdatePlayerDto) },
        { type: 'object', properties: { photo: photoProperty } },
      ],
    },
  })
  @ApiOperation({ summary: 'Actualizar la información de un jugador' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: UpdatePlayerDto,
    @UploadedFile() photo?: UploadedImageFile,
  ) {
    return this.playersService.update(id, dto, photo);
  }
}
