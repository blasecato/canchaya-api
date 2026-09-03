import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import type { UploadedImageFile } from './image-storage.types';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  ASSOCIATION_COVER_DIRECTORY,
  ASSOCIATION_LOGO_DIRECTORY,
  HOME_GALLERY_DIRECTORY,
  type AllowedImageMimeType,
  getUploadsRootDirectory,
  getPrivateUploadsRootDirectory,
  IDENTITY_DOCUMENT_DIRECTORY,
  MAX_IMAGE_SIZE_BYTES,
  TOURNAMENT_PHOTO_DIRECTORY,
  TEAM_PHOTO_DIRECTORY,
  USER_PHOTO_DIRECTORY,
  UPLOADS_PUBLIC_PREFIX,
} from './uploads.constants';

const IMAGE_EXTENSION_BY_MIME_TYPE: Record<AllowedImageMimeType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

@Injectable()
export class LocalImageStorageService {
  private readonly logger = new Logger(LocalImageStorageService.name);
  private readonly uploadsRoot = getUploadsRootDirectory();
  private readonly privateUploadsRoot = getPrivateUploadsRootDirectory();

  async saveAssociationLogo(file: UploadedImageFile): Promise<string> {
    return this.saveImage(file, ASSOCIATION_LOGO_DIRECTORY, 'El logo');
  }

  async saveAssociationCover(file: UploadedImageFile): Promise<string> {
    return this.saveImage(file, ASSOCIATION_COVER_DIRECTORY, 'La portada');
  }

  async saveTournamentPhoto(file: UploadedImageFile): Promise<string> {
    return this.saveImage(
      file,
      TOURNAMENT_PHOTO_DIRECTORY,
      'La foto del torneo',
    );
  }

  async saveTeamPhoto(file: UploadedImageFile): Promise<string> {
    return this.saveImage(file, TEAM_PHOTO_DIRECTORY, 'El escudo del equipo');
  }

  async saveUserPhoto(file: UploadedImageFile): Promise<string> {
    return this.saveImage(file, USER_PHOTO_DIRECTORY, 'La foto de perfil');
  }

  validateHomeGalleryImage(file: UploadedImageFile, slot: number): void {
    this.assertHomeGallerySlot(slot);
    this.assertValidImage(file, `La imagen ${slot} de la galería`);
  }

  async findHomeGalleryImage(slot: number): Promise<string | null> {
    this.assertHomeGallerySlot(slot);
    const targetDirectory = resolve(this.uploadsRoot, HOME_GALLERY_DIRECTORY);
    const candidates = await Promise.all(
      Object.values(IMAGE_EXTENSION_BY_MIME_TYPE).map(async (extension) => {
        const fileName = `gallery-${slot}.${extension}`;
        try {
          const fileStats = await stat(resolve(targetDirectory, fileName));
          return { fileName, mtimeMs: fileStats.mtimeMs };
        } catch (error: unknown) {
          if (this.isFileNotFoundError(error)) return null;
          throw error;
        }
      }),
    );
    const current = candidates
      .filter((candidate) => candidate !== null)
      .sort((left, right) => right.mtimeMs - left.mtimeMs)[0];

    return current
      ? `${UPLOADS_PUBLIC_PREFIX}${HOME_GALLERY_DIRECTORY}/${current.fileName}?v=${Math.trunc(current.mtimeMs)}`
      : null;
  }

  async replaceHomeGalleryImage(
    slot: number,
    file: UploadedImageFile,
  ): Promise<string> {
    this.assertHomeGallerySlot(slot);
    const detectedMimeType = this.assertValidImage(
      file,
      `La imagen ${slot} de la galería`,
    );
    const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
    const targetDirectory = resolve(this.uploadsRoot, HOME_GALLERY_DIRECTORY);
    const fileName = `gallery-${slot}.${extension}`;
    const targetPath = resolve(targetDirectory, fileName);
    const temporaryPath = resolve(
      targetDirectory,
      `.gallery-${slot}-${randomUUID()}.tmp`,
    );

    await mkdir(targetDirectory, { recursive: true });
    await writeFile(temporaryPath, file.buffer, { flag: 'wx' });

    try {
      await rename(temporaryPath, targetPath);
      await Promise.all(
        Object.values(IMAGE_EXTENSION_BY_MIME_TYPE)
          .filter((candidateExtension) => candidateExtension !== extension)
          .map(async (candidateExtension) => {
            try {
              await unlink(
                resolve(
                  targetDirectory,
                  `gallery-${slot}.${candidateExtension}`,
                ),
              );
            } catch (error: unknown) {
              if (!this.isFileNotFoundError(error)) throw error;
            }
          }),
      );
    } catch (error: unknown) {
      try {
        await unlink(temporaryPath);
      } catch (cleanupError: unknown) {
        if (!this.isFileNotFoundError(cleanupError)) {
          this.logger.warn(
            `No fue posible limpiar el archivo temporal de la galería: ${temporaryPath}`,
          );
        }
      }
      throw error;
    }

    const fileStats = await stat(targetPath);
    return `${UPLOADS_PUBLIC_PREFIX}${HOME_GALLERY_DIRECTORY}/${fileName}?v=${Math.trunc(fileStats.mtimeMs)}`;
  }

  async saveIdentityDocument(file: UploadedImageFile): Promise<string> {
    const detectedMimeType = this.assertValidImage(file, 'El documento');
    const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
    const fileName = `${randomUUID()}.${extension}`;
    const relativePath = `${IDENTITY_DOCUMENT_DIRECTORY}/${fileName}`;
    const targetDirectory = resolve(
      this.privateUploadsRoot,
      IDENTITY_DOCUMENT_DIRECTORY,
    );

    await mkdir(targetDirectory, { recursive: true });
    await writeFile(resolve(targetDirectory, fileName), file.buffer, {
      flag: 'wx',
    });

    return relativePath;
  }

  private async saveImage(
    file: UploadedImageFile,
    directory: string,
    fieldLabel: string,
  ): Promise<string> {
    const detectedMimeType = this.assertValidImage(file, fieldLabel);

    const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
    const fileName = `${randomUUID()}.${extension}`;
    const relativePath = `${directory}/${fileName}`;
    const targetDirectory = resolve(this.uploadsRoot, directory);

    await mkdir(targetDirectory, { recursive: true });
    await writeFile(resolve(targetDirectory, fileName), file.buffer, {
      flag: 'wx',
    });

    return `${UPLOADS_PUBLIC_PREFIX}${relativePath}`;
  }

  async deleteByPublicUrl(publicUrl: string | null): Promise<void> {
    if (!publicUrl?.startsWith(UPLOADS_PUBLIC_PREFIX)) {
      return;
    }

    const relativePath = publicUrl.slice(UPLOADS_PUBLIC_PREFIX.length);
    const absolutePath = resolve(this.uploadsRoot, relativePath);
    const safeRootPrefix = `${this.uploadsRoot}${sep}`;

    if (!absolutePath.startsWith(safeRootPrefix)) {
      this.logger.warn(`Se ignoró una ruta de archivo insegura: ${publicUrl}`);
      return;
    }

    try {
      await unlink(absolutePath);
    } catch (error: unknown) {
      if (this.isFileNotFoundError(error)) {
        return;
      }

      throw error;
    }
  }

  async deletePrivateDocument(relativePath: string | null): Promise<void> {
    if (!relativePath) return;

    const absolutePath = resolve(this.privateUploadsRoot, relativePath);
    const safeRootPrefix = `${this.privateUploadsRoot}${sep}`;
    if (!absolutePath.startsWith(safeRootPrefix)) {
      this.logger.warn(`Se ignoró una ruta privada insegura: ${relativePath}`);
      return;
    }

    try {
      await unlink(absolutePath);
    } catch (error: unknown) {
      if (!this.isFileNotFoundError(error)) throw error;
    }
  }

  private assertValidImage(
    file: UploadedImageFile,
    fieldLabel: string,
  ): AllowedImageMimeType {
    const detectedMimeType = this.detectMimeType(file.buffer);
    if (
      file.buffer.length > MAX_IMAGE_SIZE_BYTES ||
      !this.isAllowedMimeType(file.mimetype) ||
      detectedMimeType !== file.mimetype
    ) {
      throw new BadRequestException(
        `${fieldLabel} debe ser una imagen JPEG, PNG o WebP válida de máximo 2 MB.`,
      );
    }

    return detectedMimeType;
  }

  private detectMimeType(buffer: Buffer): AllowedImageMimeType | null {
    if (
      buffer.length >= 4 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff &&
      buffer[buffer.length - 2] === 0xff &&
      buffer[buffer.length - 1] === 0xd9
    ) {
      return 'image/jpeg';
    }

    const pngSignature = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);

    const pngEndSignature = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    if (
      buffer.length >= pngSignature.length + pngEndSignature.length &&
      buffer.subarray(0, pngSignature.length).equals(pngSignature) &&
      buffer.subarray(-pngEndSignature.length).equals(pngEndSignature)
    ) {
      return 'image/png';
    }

    const webpChunkType = buffer.subarray(12, 16).toString('ascii');
    const isSupportedWebpChunk = ['VP8 ', 'VP8L', 'VP8X'].includes(
      webpChunkType,
    );

    if (
      buffer.length >= 16 &&
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP' &&
      buffer.readUInt32LE(4) + 8 === buffer.length &&
      isSupportedWebpChunk
    ) {
      return 'image/webp';
    }

    return null;
  }

  private isAllowedMimeType(
    mimeType: string,
  ): mimeType is AllowedImageMimeType {
    return (ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(mimeType);
  }

  private assertHomeGallerySlot(slot: number): void {
    if (!Number.isInteger(slot) || slot < 1 || slot > 5) {
      throw new BadRequestException(
        'La galería solamente admite las posiciones del 1 al 5.',
      );
    }
  }

  private isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
    return (
      error instanceof Error &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    );
  }
}
