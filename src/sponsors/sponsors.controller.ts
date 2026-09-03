import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ParseBigIntPipe } from '../common/pipes/parse-big-int.pipe';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { SponsorsService } from './sponsors.service';

const sponsorLogoUploadOptions = {
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
          'El logo debe ser una imagen JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

@ApiTags('Sponsors')
@ApiExtraModels(CreateSponsorDto, UpdateSponsorDto)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles('SUPER_ADMIN', 'ASSOCIATION_ADMIN')
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', sponsorLogoUploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateSponsorDto) },
        {
          type: 'object',
          properties: { logo: { type: 'string', format: 'binary' } },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Registrar un patrocinador' })
  @ApiCreatedResponse({ description: 'Patrocinador registrado correctamente.' })
  create(
    @Body() createSponsorDto: CreateSponsorDto,
    @UploadedFile() logo?: UploadedImageFile,
  ) {
    return this.sponsorsService.create(createSponsorDto, logo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los patrocinadores' })
  @ApiOkResponse({ description: 'Listado de patrocinadores.' })
  findAll() {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Consultar un patrocinador por ID' })
  @ApiOkResponse({ description: 'Patrocinador encontrado.' })
  @ApiNotFoundResponse({ description: 'Patrocinador no encontrado.' })
  findOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.sponsorsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo', sponsorLogoUploadOptions))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Actualizar un patrocinador' })
  @ApiOkResponse({ description: 'Patrocinador actualizado correctamente.' })
  @ApiNotFoundResponse({ description: 'Patrocinador no encontrado.' })
  update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateSponsorDto: UpdateSponsorDto,
    @UploadedFile() logo?: UploadedImageFile,
  ) {
    return this.sponsorsService.update(id, updateSponsorDto, logo);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '1', type: String })
  @ApiOperation({ summary: 'Eliminar un patrocinador' })
  @ApiOkResponse({ description: 'Patrocinador eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'Patrocinador no encontrado.' })
  remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.sponsorsService.remove(id);
  }
}
