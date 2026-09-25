import { ConfigService } from '@nestjs/config';
import { LocalImageStorageService } from './local-image-storage.service';
import type { IdentityDocumentSide, StoredImageAsset, StoredImageReference, UploadedImageFile } from './image-storage.types';
export declare class ImageStorageService {
    private readonly localStorage;
    private readonly logger;
    constructor(config: ConfigService, localStorage: LocalImageStorageService);
    saveAssociationLogo(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveAssociationCover(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveAssociationAnnouncement(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveTournamentPhoto(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveTeamPhoto(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveUserPhoto(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveSponsorLogo(file: UploadedImageFile): Promise<StoredImageAsset>;
    saveIdentityDocument(file: UploadedImageFile, side: IdentityDocumentSide): Promise<StoredImageAsset>;
    delete(reference: StoredImageReference): Promise<void>;
    deleteSafely(reference: StoredImageReference): Promise<void>;
    createIdentityDocumentDownloadUrl(publicId: string, format: string, expiresInSeconds?: number): string;
    private uploadPublic;
    private upload;
    private assertValidImage;
    private detectMimeType;
    private errorMessage;
}
