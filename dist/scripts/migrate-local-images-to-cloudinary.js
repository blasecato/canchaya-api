"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("@nestjs/config");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const pg_1 = require("pg");
const image_storage_service_1 = require("../src/uploads/image-storage.service");
const local_image_storage_service_1 = require("../src/uploads/local-image-storage.service");
const uploads_constants_1 = require("../src/uploads/uploads.constants");
const publicTargets = [
    {
        table: 'associations',
        urlColumn: 'logo_url',
        publicIdColumn: 'logo_public_id',
        kind: 'associationLogo',
    },
    {
        table: 'associations',
        urlColumn: 'cover_url',
        publicIdColumn: 'cover_public_id',
        kind: 'associationCover',
    },
    {
        table: 'teams',
        urlColumn: 'photo_url',
        publicIdColumn: 'photo_public_id',
        kind: 'teamPhoto',
    },
    {
        table: 'tournaments',
        urlColumn: 'photo_url',
        publicIdColumn: 'photo_public_id',
        kind: 'tournamentPhoto',
    },
    {
        table: 'sponsors',
        urlColumn: 'logo_url',
        publicIdColumn: 'logo_public_id',
        kind: 'sponsorLogo',
    },
    {
        table: 'users',
        urlColumn: 'photo_url',
        publicIdColumn: 'photo_public_id',
        kind: 'userPhoto',
    },
];
const mimeTypeByExtension = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
};
async function loadImage(path) {
    const mimetype = mimeTypeByExtension[(0, node_path_1.extname)(path).toLowerCase()];
    if (!mimetype)
        throw new Error(`Extensión no admitida: ${path}`);
    return { buffer: await (0, promises_1.readFile)(path), mimetype };
}
async function uploadPublic(storage, kind, file) {
    switch (kind) {
        case 'associationLogo':
            return storage.saveAssociationLogo(file);
        case 'associationCover':
            return storage.saveAssociationCover(file);
        case 'teamPhoto':
            return storage.saveTeamPhoto(file);
        case 'tournamentPhoto':
            return storage.saveTournamentPhoto(file);
        case 'sponsorLogo':
            return storage.saveSponsorLogo(file);
        case 'userPhoto':
            return storage.saveUserPhoto(file);
    }
}
async function migratePublicAssets(pool, storage) {
    let migrated = 0;
    const uploadsRoot = (0, uploads_constants_1.getUploadsRootDirectory)();
    for (const target of publicTargets) {
        const rows = await pool.query(`SELECT id::text, ${target.urlColumn} AS source_url
       FROM ${target.table}
       WHERE ${target.publicIdColumn} IS NULL
         AND ${target.urlColumn} LIKE '/uploads/%'`);
        for (const row of rows.rows) {
            const relativePath = row.source_url.slice(uploads_constants_1.UPLOADS_PUBLIC_PREFIX.length);
            const asset = await uploadPublic(storage, target.kind, await loadImage((0, node_path_1.resolve)(uploadsRoot, relativePath)));
            try {
                await pool.query(`UPDATE ${target.table}
           SET ${target.urlColumn} = $1, ${target.publicIdColumn} = $2
           WHERE id = $3`, [asset.url, asset.publicId, row.id]);
                migrated += 1;
            }
            catch (error) {
                await storage.delete(asset);
                throw error;
            }
        }
    }
    return migrated;
}
async function migrateIdentityDocuments(pool, storage) {
    let migrated = 0;
    const privateRoot = (0, uploads_constants_1.getPrivateUploadsRootDirectory)();
    const documents = [
        {
            side: 'front',
            urlColumn: 'document_front_url',
            publicIdColumn: 'document_front_public_id',
            formatColumn: 'document_front_format',
        },
        {
            side: 'back',
            urlColumn: 'document_back_url',
            publicIdColumn: 'document_back_public_id',
            formatColumn: 'document_back_format',
        },
    ];
    for (const document of documents) {
        const rows = await pool.query(`SELECT id::text, ${document.urlColumn} AS source_url
       FROM users
       WHERE ${document.publicIdColumn} IS NULL
         AND ${document.urlColumn} IS NOT NULL
         AND ${document.urlColumn} NOT LIKE 'http%'`);
        for (const row of rows.rows) {
            const asset = await storage.saveIdentityDocument(await loadImage((0, node_path_1.resolve)(privateRoot, row.source_url)), document.side);
            try {
                await pool.query(`UPDATE users
           SET ${document.urlColumn} = $1,
               ${document.publicIdColumn} = $2,
               ${document.formatColumn} = $3
           WHERE id = $4`, [asset.url, asset.publicId, asset.format, row.id]);
                migrated += 1;
            }
            catch (error) {
                await storage.delete(asset);
                throw error;
            }
        }
    }
    return migrated;
}
async function main() {
    if (!process.env.DATABASE_URL)
        throw new Error('Falta DATABASE_URL.');
    const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    const storage = new image_storage_service_1.ImageStorageService(new config_1.ConfigService(process.env), new local_image_storage_service_1.LocalImageStorageService());
    try {
        const publicCount = await migratePublicAssets(pool, storage);
        const privateCount = await migrateIdentityDocuments(pool, storage);
        process.stdout.write(`Migración completada: ${publicCount} imágenes públicas y ${privateCount} documentos protegidos.\n`);
    }
    finally {
        await pool.end();
    }
}
void main().catch((error) => {
    process.stderr.write(`Falló la migración de imágenes: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
});
//# sourceMappingURL=migrate-local-images-to-cloudinary.js.map