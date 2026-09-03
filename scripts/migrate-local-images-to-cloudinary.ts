import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { Pool } from 'pg';
import { ImageStorageService } from '../src/uploads/image-storage.service';
import type {
  IdentityDocumentSide,
  StoredImageAsset,
  UploadedImageFile,
} from '../src/uploads/image-storage.types';
import { LocalImageStorageService } from '../src/uploads/local-image-storage.service';
import {
  getPrivateUploadsRootDirectory,
  getUploadsRootDirectory,
  UPLOADS_PUBLIC_PREFIX,
} from '../src/uploads/uploads.constants';

type PublicAssetKind =
  | 'associationLogo'
  | 'associationCover'
  | 'teamPhoto'
  | 'tournamentPhoto'
  | 'sponsorLogo'
  | 'userPhoto';

type MigrationTarget = {
  table: string;
  urlColumn: string;
  publicIdColumn: string;
  kind: PublicAssetKind;
};

const publicTargets: MigrationTarget[] = [
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

const mimeTypeByExtension: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

async function loadImage(path: string): Promise<UploadedImageFile> {
  const mimetype = mimeTypeByExtension[extname(path).toLowerCase()];
  if (!mimetype) throw new Error(`Extensión no admitida: ${path}`);
  return { buffer: await readFile(path), mimetype };
}

async function uploadPublic(
  storage: ImageStorageService,
  kind: PublicAssetKind,
  file: UploadedImageFile,
): Promise<StoredImageAsset> {
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

async function migratePublicAssets(
  pool: Pool,
  storage: ImageStorageService,
): Promise<number> {
  let migrated = 0;
  const uploadsRoot = getUploadsRootDirectory();

  for (const target of publicTargets) {
    const rows = await pool.query<{ id: string; source_url: string }>(
      `SELECT id::text, ${target.urlColumn} AS source_url
       FROM ${target.table}
       WHERE ${target.publicIdColumn} IS NULL
         AND ${target.urlColumn} LIKE '/uploads/%'`,
    );

    for (const row of rows.rows) {
      const relativePath = row.source_url.slice(UPLOADS_PUBLIC_PREFIX.length);
      const asset = await uploadPublic(
        storage,
        target.kind,
        await loadImage(resolve(uploadsRoot, relativePath)),
      );
      try {
        await pool.query(
          `UPDATE ${target.table}
           SET ${target.urlColumn} = $1, ${target.publicIdColumn} = $2
           WHERE id = $3`,
          [asset.url, asset.publicId, row.id],
        );
        migrated += 1;
      } catch (error) {
        await storage.delete(asset);
        throw error;
      }
    }
  }
  return migrated;
}

async function migrateIdentityDocuments(
  pool: Pool,
  storage: ImageStorageService,
): Promise<number> {
  let migrated = 0;
  const privateRoot = getPrivateUploadsRootDirectory();
  const documents: Array<{
    side: IdentityDocumentSide;
    urlColumn: string;
    publicIdColumn: string;
    formatColumn: string;
  }> = [
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
    const rows = await pool.query<{ id: string; source_url: string }>(
      `SELECT id::text, ${document.urlColumn} AS source_url
       FROM users
       WHERE ${document.publicIdColumn} IS NULL
         AND ${document.urlColumn} IS NOT NULL
         AND ${document.urlColumn} NOT LIKE 'http%'`,
    );
    for (const row of rows.rows) {
      const asset = await storage.saveIdentityDocument(
        await loadImage(resolve(privateRoot, row.source_url)),
        document.side,
      );
      try {
        await pool.query(
          `UPDATE users
           SET ${document.urlColumn} = $1,
               ${document.publicIdColumn} = $2,
               ${document.formatColumn} = $3
           WHERE id = $4`,
          [asset.url, asset.publicId, asset.format, row.id],
        );
        migrated += 1;
      } catch (error) {
        await storage.delete(asset);
        throw error;
      }
    }
  }
  return migrated;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL.');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const storage = new ImageStorageService(
    new ConfigService(process.env),
    new LocalImageStorageService(),
  );

  try {
    const publicCount = await migratePublicAssets(pool, storage);
    const privateCount = await migrateIdentityDocuments(pool, storage);
    process.stdout.write(
      `Migración completada: ${publicCount} imágenes públicas y ${privateCount} documentos protegidos.\n`,
    );
  } finally {
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  process.stderr.write(
    `Falló la migración de imágenes: ${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
});
