import type { UploadedImageFile } from './image-storage.types';
export declare class LocalImageStorageService {
    private readonly logger;
    private readonly uploadsRoot;
    private readonly privateUploadsRoot;
    saveAssociationLogo(file: UploadedImageFile): Promise<string>;
    saveAssociationCover(file: UploadedImageFile): Promise<string>;
    saveTournamentPhoto(file: UploadedImageFile): Promise<string>;
    saveTeamPhoto(file: UploadedImageFile): Promise<string>;
    saveUserPhoto(file: UploadedImageFile): Promise<string>;
    validateHomeGalleryImage(file: UploadedImageFile, slot: number): void;
    findHomeGalleryImage(slot: number): Promise<string | null>;
    replaceHomeGalleryImage(slot: number, file: UploadedImageFile): Promise<string>;
    saveIdentityDocument(file: UploadedImageFile): Promise<string>;
    private saveImage;
    deleteByPublicUrl(publicUrl: string | null): Promise<void>;
    deletePrivateDocument(relativePath: string | null): Promise<void>;
    private assertValidImage;
    private detectMimeType;
    private isAllowedMimeType;
    private assertHomeGallerySlot;
    private isFileNotFoundError;
}
