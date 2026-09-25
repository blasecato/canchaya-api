import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { randomUUID } from 'node:crypto';
import { LocalImageStorageService } from './local-image-storage.service';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  CLOUDINARY_ASSOCIATION_ANNOUNCEMENT_FOLDER,
  CLOUDINARY_ASSOCIATION_COVER_FOLDER,
  CLOUDINARY_ASSOCIATION_LOGO_FOLDER,
  CLOUDINARY_IDENTITY_DOCUMENT_BACK_FOLDER,
  CLOUDINARY_IDENTITY_DOCUMENT_FRONT_FOLDER,
  CLOUDINARY_SPONSOR_LOGO_FOLDER,
  CLOUDINARY_TEAM_PHOTO_FOLDER,
  CLOUDINARY_TOURNAMENT_PHOTO_FOLDER,
  CLOUDINARY_USER_PHOTO_FOLDER,
  MAX_IMAGE_SIZE_BYTES,
  UPLOADS_PUBLIC_PREFIX,
  type AllowedImageMimeType,
} from './uploads.constants';
import type {
  CloudinaryDeliveryType,
  IdentityDocumentSide,
  StoredImageAsset,
  StoredImageReference,
  UploadedImageFile,
} from './image-storage.types';

@Injectable()
export class ImageStorageService {
  private readonly logger = new Logger(ImageStorageService.name);

  constructor(
    config: ConfigService,
    private readonly localStorage: LocalImageStorageService,
  ) {
    const cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME')?.trim();
    const apiKey = config.get<string>('CLOUDINARY_API_KEY')?.trim();
    const apiSecret = config.get<string>('CLOUDINARY_API_SECRET')?.trim();

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error(
        'Faltan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY o CLOUDINARY_API_SECRET.',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  saveAssociationLogo(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_ASSOCIATION_LOGO_FOLDER,
      'El logo',
    );
  }

  saveAssociationCover(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_ASSOCIATION_COVER_FOLDER,
      'La portada',
    );
  }

  saveAssociationAnnouncement(
    file: UploadedImageFile,
  ): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_ASSOCIATION_ANNOUNCEMENT_FOLDER,
      'La imagen de la publicación',
    );
  }

  saveTournamentPhoto(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_TOURNAMENT_PHOTO_FOLDER,
      'La foto del torneo',
    );
  }

  saveTeamPhoto(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_TEAM_PHOTO_FOLDER,
      'El escudo del equipo',
    );
  }

  saveUserPhoto(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_USER_PHOTO_FOLDER,
      'La foto de perfil',
    );
  }

  saveSponsorLogo(file: UploadedImageFile): Promise<StoredImageAsset> {
    return this.uploadPublic(
      file,
      CLOUDINARY_SPONSOR_LOGO_FOLDER,
      'El logo del sponsor',
    );
  }

  saveIdentityDocument(
    file: UploadedImageFile,
    side: IdentityDocumentSide,
  ): Promise<StoredImageAsset> {
    return this.upload(
      file,
      side === 'front'
        ? CLOUDINARY_IDENTITY_DOCUMENT_FRONT_FOLDER
        : CLOUDINARY_IDENTITY_DOCUMENT_BACK_FOLDER,
      'El documento',
      'authenticated',
    );
  }

  async delete(reference: StoredImageReference): Promise<void> {
    if (reference.publicId) {
      try {
        await cloudinary.uploader.destroy(reference.publicId, {
          resource_type: 'image',
          type: reference.deliveryType ?? 'upload',
          invalidate: true,
        });
      } catch (error: unknown) {
        this.logger.error(
          `No fue posible eliminar el recurso ${reference.publicId}: ${this.errorMessage(error)}`,
        );
        throw new ServiceUnavailableException(
          'No fue posible eliminar la imagen del almacenamiento.',
        );
      }
      return;
    }

    if (reference.url?.startsWith(UPLOADS_PUBLIC_PREFIX)) {
      await this.localStorage.deleteByPublicUrl(reference.url);
      return;
    }

    // Los documentos locales históricos guardaban una ruta relativa privada.
    if (reference.deliveryType === 'authenticated' && reference.url) {
      await this.localStorage.deletePrivateDocument(reference.url);
    }
  }

  async deleteSafely(reference: StoredImageReference): Promise<void> {
    try {
      await this.delete(reference);
    } catch {
      // delete() ya registró el error. La limpieza posterior no debe convertir
      // una transacción confirmada en una respuesta fallida para el cliente.
    }
  }

  createIdentityDocumentDownloadUrl(
    publicId: string,
    format: string,
    expiresInSeconds = 300,
  ): string {
    return cloudinary.utils.private_download_url(publicId, format, {
      resource_type: 'image',
      type: 'authenticated',
      expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds,
      attachment: false,
    });
  }

  private uploadPublic(
    file: UploadedImageFile,
    folder: string,
    fieldLabel: string,
  ): Promise<StoredImageAsset> {
    return this.upload(file, folder, fieldLabel, 'upload');
  }

  private async upload(
    file: UploadedImageFile,
    folder: string,
    fieldLabel: string,
    deliveryType: CloudinaryDeliveryType,
  ): Promise<StoredImageAsset> {
    this.assertValidImage(file, fieldLabel);
    const options: UploadApiOptions = {
      resource_type: 'image',
      type: deliveryType,
      folder,
      public_id: randomUUID(),
      overwrite: false,
      unique_filename: false,
      use_filename: false,
    };

    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          options,
          (
            error: UploadApiErrorResponse | undefined,
            response: UploadApiResponse | undefined,
          ) => {
            if (error || !response) {
              reject(
                new Error(
                  error
                    ? this.errorMessage(error)
                    : 'Cloudinary no devolvió una respuesta.',
                ),
              );
              return;
            }
            resolve(response);
          },
        );
        stream.end(file.buffer);
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        assetId:
          typeof result.asset_id === 'string'
            ? result.asset_id
            : result.public_id,
        format: typeof result.format === 'string' ? result.format : 'jpg',
        deliveryType,
      };
    } catch (error: unknown) {
      this.logger.error(
        `Falló una carga a Cloudinary: ${this.errorMessage(error)}`,
      );
      throw new ServiceUnavailableException(
        'No fue posible cargar la imagen. Intenta nuevamente.',
      );
    }
  }

  private assertValidImage(file: UploadedImageFile, fieldLabel: string): void {
    const detectedMimeType = this.detectMimeType(file.buffer);
    if (
      file.buffer.length > MAX_IMAGE_SIZE_BYTES ||
      !(ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(
        file.mimetype,
      ) ||
      detectedMimeType !== file.mimetype
    ) {
      throw new BadRequestException(
        `${fieldLabel} debe ser una imagen JPEG, PNG o WebP válida de máximo 2 MB.`,
      );
    }
  }

  private detectMimeType(buffer: Buffer): AllowedImageMimeType | null {
    if (
      buffer.length >= 4 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff &&
      buffer[buffer.length - 2] === 0xff &&
      buffer[buffer.length - 1] === 0xd9
    )
      return 'image/jpeg';

    const pngStart = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    const pngEnd = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);
    if (
      buffer.length >= pngStart.length + pngEnd.length &&
      buffer.subarray(0, pngStart.length).equals(pngStart) &&
      buffer.subarray(-pngEnd.length).equals(pngEnd)
    )
      return 'image/png';

    if (
      buffer.length >= 16 &&
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP' &&
      buffer.readUInt32LE(4) + 8 === buffer.length &&
      ['VP8 ', 'VP8L', 'VP8X'].includes(
        buffer.subarray(12, 16).toString('ascii'),
      )
    )
      return 'image/webp';

    return null;
  }

  private errorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      return error.message;
    }
    return String(error);
  }
}
