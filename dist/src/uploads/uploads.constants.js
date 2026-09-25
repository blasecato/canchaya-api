"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_IMAGE_MIME_TYPES = exports.MAX_IMAGE_SIZE_BYTES = exports.CLOUDINARY_SPONSOR_LOGO_FOLDER = exports.CLOUDINARY_IDENTITY_DOCUMENT_BACK_FOLDER = exports.CLOUDINARY_IDENTITY_DOCUMENT_FRONT_FOLDER = exports.CLOUDINARY_USER_PHOTO_FOLDER = exports.CLOUDINARY_TEAM_PHOTO_FOLDER = exports.CLOUDINARY_TOURNAMENT_PHOTO_FOLDER = exports.CLOUDINARY_ASSOCIATION_ANNOUNCEMENT_FOLDER = exports.CLOUDINARY_ASSOCIATION_COVER_FOLDER = exports.CLOUDINARY_ASSOCIATION_LOGO_FOLDER = exports.CLOUDINARY_ROOT_FOLDER = exports.IDENTITY_DOCUMENT_DIRECTORY = exports.HOME_GALLERY_DIRECTORY = exports.USER_PHOTO_DIRECTORY = exports.TEAM_PHOTO_DIRECTORY = exports.TOURNAMENT_PHOTO_DIRECTORY = exports.ASSOCIATION_COVER_DIRECTORY = exports.ASSOCIATION_LOGO_DIRECTORY = exports.UPLOADS_PUBLIC_PREFIX = void 0;
exports.getUploadsRootDirectory = getUploadsRootDirectory;
exports.getPrivateUploadsRootDirectory = getPrivateUploadsRootDirectory;
const node_path_1 = require("node:path");
exports.UPLOADS_PUBLIC_PREFIX = '/uploads/';
exports.ASSOCIATION_LOGO_DIRECTORY = 'associations';
exports.ASSOCIATION_COVER_DIRECTORY = 'associations/covers';
exports.TOURNAMENT_PHOTO_DIRECTORY = 'tournaments';
exports.TEAM_PHOTO_DIRECTORY = 'teams';
exports.USER_PHOTO_DIRECTORY = 'users';
exports.HOME_GALLERY_DIRECTORY = 'home-gallery';
exports.IDENTITY_DOCUMENT_DIRECTORY = 'identity-documents';
exports.CLOUDINARY_ROOT_FOLDER = 'canchaya';
exports.CLOUDINARY_ASSOCIATION_LOGO_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/associations/logos`;
exports.CLOUDINARY_ASSOCIATION_COVER_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/associations/covers`;
exports.CLOUDINARY_ASSOCIATION_ANNOUNCEMENT_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/associations/announcements`;
exports.CLOUDINARY_TOURNAMENT_PHOTO_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/tournaments/photos`;
exports.CLOUDINARY_TEAM_PHOTO_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/teams/logos`;
exports.CLOUDINARY_USER_PHOTO_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/users/profiles`;
exports.CLOUDINARY_IDENTITY_DOCUMENT_FRONT_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/users/documents/front`;
exports.CLOUDINARY_IDENTITY_DOCUMENT_BACK_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/users/documents/back`;
exports.CLOUDINARY_SPONSOR_LOGO_FOLDER = `${exports.CLOUDINARY_ROOT_FOLDER}/sponsors/logos`;
exports.MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
exports.ALLOWED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];
function getUploadsRootDirectory() {
    const configuredDirectory = process.env.UPLOADS_DIRECTORY?.trim();
    return (0, node_path_1.resolve)(configuredDirectory || (0, node_path_1.resolve)(process.cwd(), 'uploads'));
}
function getPrivateUploadsRootDirectory() {
    const configuredDirectory = process.env.PRIVATE_UPLOADS_DIRECTORY?.trim();
    return (0, node_path_1.resolve)(configuredDirectory || (0, node_path_1.resolve)(process.cwd(), 'private-uploads'));
}
//# sourceMappingURL=uploads.constants.js.map