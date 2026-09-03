"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocalImageStorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalImageStorageService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const uploads_constants_1 = require("./uploads.constants");
const IMAGE_EXTENSION_BY_MIME_TYPE = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};
let LocalImageStorageService = LocalImageStorageService_1 = class LocalImageStorageService {
    logger = new common_1.Logger(LocalImageStorageService_1.name);
    uploadsRoot = (0, uploads_constants_1.getUploadsRootDirectory)();
    privateUploadsRoot = (0, uploads_constants_1.getPrivateUploadsRootDirectory)();
    async saveAssociationLogo(file) {
        return this.saveImage(file, uploads_constants_1.ASSOCIATION_LOGO_DIRECTORY, 'El logo');
    }
    async saveAssociationCover(file) {
        return this.saveImage(file, uploads_constants_1.ASSOCIATION_COVER_DIRECTORY, 'La portada');
    }
    async saveTournamentPhoto(file) {
        return this.saveImage(file, uploads_constants_1.TOURNAMENT_PHOTO_DIRECTORY, 'La foto del torneo');
    }
    async saveTeamPhoto(file) {
        return this.saveImage(file, uploads_constants_1.TEAM_PHOTO_DIRECTORY, 'El escudo del equipo');
    }
    async saveUserPhoto(file) {
        return this.saveImage(file, uploads_constants_1.USER_PHOTO_DIRECTORY, 'La foto de perfil');
    }
    validateHomeGalleryImage(file, slot) {
        this.assertHomeGallerySlot(slot);
        this.assertValidImage(file, `La imagen ${slot} de la galería`);
    }
    async findHomeGalleryImage(slot) {
        this.assertHomeGallerySlot(slot);
        const targetDirectory = (0, node_path_1.resolve)(this.uploadsRoot, uploads_constants_1.HOME_GALLERY_DIRECTORY);
        const candidates = await Promise.all(Object.values(IMAGE_EXTENSION_BY_MIME_TYPE).map(async (extension) => {
            const fileName = `gallery-${slot}.${extension}`;
            try {
                const fileStats = await (0, promises_1.stat)((0, node_path_1.resolve)(targetDirectory, fileName));
                return { fileName, mtimeMs: fileStats.mtimeMs };
            }
            catch (error) {
                if (this.isFileNotFoundError(error))
                    return null;
                throw error;
            }
        }));
        const current = candidates
            .filter((candidate) => candidate !== null)
            .sort((left, right) => right.mtimeMs - left.mtimeMs)[0];
        return current
            ? `${uploads_constants_1.UPLOADS_PUBLIC_PREFIX}${uploads_constants_1.HOME_GALLERY_DIRECTORY}/${current.fileName}?v=${Math.trunc(current.mtimeMs)}`
            : null;
    }
    async replaceHomeGalleryImage(slot, file) {
        this.assertHomeGallerySlot(slot);
        const detectedMimeType = this.assertValidImage(file, `La imagen ${slot} de la galería`);
        const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
        const targetDirectory = (0, node_path_1.resolve)(this.uploadsRoot, uploads_constants_1.HOME_GALLERY_DIRECTORY);
        const fileName = `gallery-${slot}.${extension}`;
        const targetPath = (0, node_path_1.resolve)(targetDirectory, fileName);
        const temporaryPath = (0, node_path_1.resolve)(targetDirectory, `.gallery-${slot}-${(0, node_crypto_1.randomUUID)()}.tmp`);
        await (0, promises_1.mkdir)(targetDirectory, { recursive: true });
        await (0, promises_1.writeFile)(temporaryPath, file.buffer, { flag: 'wx' });
        try {
            await (0, promises_1.rename)(temporaryPath, targetPath);
            await Promise.all(Object.values(IMAGE_EXTENSION_BY_MIME_TYPE)
                .filter((candidateExtension) => candidateExtension !== extension)
                .map(async (candidateExtension) => {
                try {
                    await (0, promises_1.unlink)((0, node_path_1.resolve)(targetDirectory, `gallery-${slot}.${candidateExtension}`));
                }
                catch (error) {
                    if (!this.isFileNotFoundError(error))
                        throw error;
                }
            }));
        }
        catch (error) {
            try {
                await (0, promises_1.unlink)(temporaryPath);
            }
            catch (cleanupError) {
                if (!this.isFileNotFoundError(cleanupError)) {
                    this.logger.warn(`No fue posible limpiar el archivo temporal de la galería: ${temporaryPath}`);
                }
            }
            throw error;
        }
        const fileStats = await (0, promises_1.stat)(targetPath);
        return `${uploads_constants_1.UPLOADS_PUBLIC_PREFIX}${uploads_constants_1.HOME_GALLERY_DIRECTORY}/${fileName}?v=${Math.trunc(fileStats.mtimeMs)}`;
    }
    async saveIdentityDocument(file) {
        const detectedMimeType = this.assertValidImage(file, 'El documento');
        const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
        const fileName = `${(0, node_crypto_1.randomUUID)()}.${extension}`;
        const relativePath = `${uploads_constants_1.IDENTITY_DOCUMENT_DIRECTORY}/${fileName}`;
        const targetDirectory = (0, node_path_1.resolve)(this.privateUploadsRoot, uploads_constants_1.IDENTITY_DOCUMENT_DIRECTORY);
        await (0, promises_1.mkdir)(targetDirectory, { recursive: true });
        await (0, promises_1.writeFile)((0, node_path_1.resolve)(targetDirectory, fileName), file.buffer, {
            flag: 'wx',
        });
        return relativePath;
    }
    async saveImage(file, directory, fieldLabel) {
        const detectedMimeType = this.assertValidImage(file, fieldLabel);
        const extension = IMAGE_EXTENSION_BY_MIME_TYPE[detectedMimeType];
        const fileName = `${(0, node_crypto_1.randomUUID)()}.${extension}`;
        const relativePath = `${directory}/${fileName}`;
        const targetDirectory = (0, node_path_1.resolve)(this.uploadsRoot, directory);
        await (0, promises_1.mkdir)(targetDirectory, { recursive: true });
        await (0, promises_1.writeFile)((0, node_path_1.resolve)(targetDirectory, fileName), file.buffer, {
            flag: 'wx',
        });
        return `${uploads_constants_1.UPLOADS_PUBLIC_PREFIX}${relativePath}`;
    }
    async deleteByPublicUrl(publicUrl) {
        if (!publicUrl?.startsWith(uploads_constants_1.UPLOADS_PUBLIC_PREFIX)) {
            return;
        }
        const relativePath = publicUrl.slice(uploads_constants_1.UPLOADS_PUBLIC_PREFIX.length);
        const absolutePath = (0, node_path_1.resolve)(this.uploadsRoot, relativePath);
        const safeRootPrefix = `${this.uploadsRoot}${node_path_1.sep}`;
        if (!absolutePath.startsWith(safeRootPrefix)) {
            this.logger.warn(`Se ignoró una ruta de archivo insegura: ${publicUrl}`);
            return;
        }
        try {
            await (0, promises_1.unlink)(absolutePath);
        }
        catch (error) {
            if (this.isFileNotFoundError(error)) {
                return;
            }
            throw error;
        }
    }
    async deletePrivateDocument(relativePath) {
        if (!relativePath)
            return;
        const absolutePath = (0, node_path_1.resolve)(this.privateUploadsRoot, relativePath);
        const safeRootPrefix = `${this.privateUploadsRoot}${node_path_1.sep}`;
        if (!absolutePath.startsWith(safeRootPrefix)) {
            this.logger.warn(`Se ignoró una ruta privada insegura: ${relativePath}`);
            return;
        }
        try {
            await (0, promises_1.unlink)(absolutePath);
        }
        catch (error) {
            if (!this.isFileNotFoundError(error))
                throw error;
        }
    }
    assertValidImage(file, fieldLabel) {
        const detectedMimeType = this.detectMimeType(file.buffer);
        if (file.buffer.length > uploads_constants_1.MAX_IMAGE_SIZE_BYTES ||
            !this.isAllowedMimeType(file.mimetype) ||
            detectedMimeType !== file.mimetype) {
            throw new common_1.BadRequestException(`${fieldLabel} debe ser una imagen JPEG, PNG o WebP válida de máximo 2 MB.`);
        }
        return detectedMimeType;
    }
    detectMimeType(buffer) {
        if (buffer.length >= 4 &&
            buffer[0] === 0xff &&
            buffer[1] === 0xd8 &&
            buffer[2] === 0xff &&
            buffer[buffer.length - 2] === 0xff &&
            buffer[buffer.length - 1] === 0xd9) {
            return 'image/jpeg';
        }
        const pngSignature = Buffer.from([
            0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
        ]);
        const pngEndSignature = Buffer.from([
            0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
        ]);
        if (buffer.length >= pngSignature.length + pngEndSignature.length &&
            buffer.subarray(0, pngSignature.length).equals(pngSignature) &&
            buffer.subarray(-pngEndSignature.length).equals(pngEndSignature)) {
            return 'image/png';
        }
        const webpChunkType = buffer.subarray(12, 16).toString('ascii');
        const isSupportedWebpChunk = ['VP8 ', 'VP8L', 'VP8X'].includes(webpChunkType);
        if (buffer.length >= 16 &&
            buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
            buffer.subarray(8, 12).toString('ascii') === 'WEBP' &&
            buffer.readUInt32LE(4) + 8 === buffer.length &&
            isSupportedWebpChunk) {
            return 'image/webp';
        }
        return null;
    }
    isAllowedMimeType(mimeType) {
        return uploads_constants_1.ALLOWED_IMAGE_MIME_TYPES.includes(mimeType);
    }
    assertHomeGallerySlot(slot) {
        if (!Number.isInteger(slot) || slot < 1 || slot > 5) {
            throw new common_1.BadRequestException('La galería solamente admite las posiciones del 1 al 5.');
        }
    }
    isFileNotFoundError(error) {
        return (error instanceof Error &&
            'code' in error &&
            error.code === 'ENOENT');
    }
};
exports.LocalImageStorageService = LocalImageStorageService;
exports.LocalImageStorageService = LocalImageStorageService = LocalImageStorageService_1 = __decorate([
    (0, common_1.Injectable)()
], LocalImageStorageService);
//# sourceMappingURL=local-image-storage.service.js.map