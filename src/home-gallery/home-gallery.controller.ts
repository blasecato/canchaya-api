import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequireRoles } from '../auth/decorators/require-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from '../uploads/uploads.constants';
import { HomeGalleryService } from './home-gallery.service';

const galleryFieldNames = [
  'image1',
  'image2',
  'image3',
  'image4',
  'image5',
] as const;

type GalleryFieldName = (typeof galleryFieldNames)[number];
type GalleryFiles = Partial<Record<GalleryFieldName, UploadedImageFile[]>>;

const galleryUploadOptions = {
  limits: {
    files: 5,
    fileSize: MAX_IMAGE_SIZE_BYTES,
    fields: 0,
    parts: 5,
  },
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
          'La galería solamente admite imágenes JPEG, PNG o WebP.',
        ),
        false,
      );
      return;
    }
    callback(null, true);
  },
};

@ApiTags('Home gallery')
@Controller('home-gallery')
export class HomeGalleryController {
  constructor(private readonly homeGalleryService: HomeGalleryService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar las cinco imágenes de la galería' })
  @ApiOkResponse({ description: 'Galería pública de cinco posiciones.' })
  findAll() {
    return this.homeGalleryService.findAll();
  }

  @Patch()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  @UseInterceptors(
    FileFieldsInterceptor(
      galleryFieldNames.map((name) => ({ name, maxCount: 1 })),
      galleryUploadOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: Object.fromEntries(
        galleryFieldNames.map((name) => [
          name,
          { type: 'string', format: 'binary' },
        ]),
      ),
    },
  })
  @ApiOperation({
    summary: 'Reemplazar cualquier subconjunto de la galería',
    description:
      'Solo SUPER_ADMIN. Las posiciones omitidas permanecen sin cambios y nunca se eliminan slots.',
  })
  replace(@UploadedFiles() files: GalleryFiles | undefined) {
    const galleryFiles = files ?? {};
    const uploads = galleryFieldNames.flatMap((fieldName, index) => {
      const file = galleryFiles[fieldName]?.[0];
      return file ? [{ slot: index + 1, file }] : [];
    });

    if (uploads.length === 0) {
      throw new BadRequestException(
        'Selecciona al menos una imagen para actualizar la galería.',
      );
    }

    return this.homeGalleryService.replace(uploads);
  }
}
