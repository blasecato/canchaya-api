import { resolve } from 'node:path';

export const UPLOADS_PUBLIC_PREFIX = '/uploads/';
export const ASSOCIATION_LOGO_DIRECTORY = 'associations';
export const ASSOCIATION_COVER_DIRECTORY = 'associations/covers';
export const TOURNAMENT_PHOTO_DIRECTORY = 'tournaments';
export const TEAM_PHOTO_DIRECTORY = 'teams';
export const USER_PHOTO_DIRECTORY = 'users';
export const HOME_GALLERY_DIRECTORY = 'home-gallery';
export const IDENTITY_DOCUMENT_DIRECTORY = 'identity-documents';
export const CLOUDINARY_ROOT_FOLDER = 'canchaya';
export const CLOUDINARY_ASSOCIATION_LOGO_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/associations/logos`;
export const CLOUDINARY_ASSOCIATION_COVER_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/associations/covers`;
export const CLOUDINARY_ASSOCIATION_ANNOUNCEMENT_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/associations/announcements`;
export const CLOUDINARY_TOURNAMENT_PHOTO_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/tournaments/photos`;
export const CLOUDINARY_TEAM_PHOTO_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/teams/logos`;
export const CLOUDINARY_USER_PHOTO_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/users/profiles`;
export const CLOUDINARY_IDENTITY_DOCUMENT_FRONT_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/users/documents/front`;
export const CLOUDINARY_IDENTITY_DOCUMENT_BACK_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/users/documents/back`;
export const CLOUDINARY_SPONSOR_LOGO_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/sponsors/logos`;
export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedImageMimeType = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];

export function getUploadsRootDirectory(): string {
  const configuredDirectory = process.env.UPLOADS_DIRECTORY?.trim();

  return resolve(configuredDirectory || resolve(process.cwd(), 'uploads'));
}

export function getPrivateUploadsRootDirectory(): string {
  const configuredDirectory = process.env.PRIVATE_UPLOADS_DIRECTORY?.trim();

  return resolve(
    configuredDirectory || resolve(process.cwd(), 'private-uploads'),
  );
}
