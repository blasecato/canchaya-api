export interface UploadedImageFile {
  buffer: Buffer;
  mimetype: string;
}

export type CloudinaryDeliveryType = 'upload' | 'authenticated';

export interface StoredImageAsset {
  url: string;
  publicId: string;
  assetId: string;
  format: string;
  deliveryType: CloudinaryDeliveryType;
}

export interface StoredImageReference {
  url?: string | null;
  publicId?: string | null;
  deliveryType?: CloudinaryDeliveryType;
}

export type IdentityDocumentSide = 'front' | 'back';
