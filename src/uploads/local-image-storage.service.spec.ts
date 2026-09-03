import { BadRequestException } from '@nestjs/common';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { LocalImageStorageService } from './local-image-storage.service';
import { MAX_IMAGE_SIZE_BYTES } from './uploads.constants';

describe('LocalImageStorageService', () => {
  const originalUploadsDirectory = process.env.UPLOADS_DIRECTORY;
  let temporaryDirectory: string;
  let service: LocalImageStorageService;

  beforeEach(async () => {
    temporaryDirectory = await mkdtemp(join(tmpdir(), 'canchaya-uploads-'));
    process.env.UPLOADS_DIRECTORY = temporaryDirectory;
    service = new LocalImageStorageService();
  });

  afterEach(async () => {
    await rm(temporaryDirectory, { force: true, recursive: true });

    if (originalUploadsDirectory === undefined) {
      delete process.env.UPLOADS_DIRECTORY;
    } else {
      process.env.UPLOADS_DIRECTORY = originalUploadsDirectory;
    }
  });

  it('guarda un PNG válido con un nombre aleatorio y luego lo elimina', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );

    const publicUrl = await service.saveAssociationLogo({
      buffer: png,
      mimetype: 'image/png',
    });

    expect(publicUrl).toMatch(/^\/uploads\/associations\/[0-9a-f-]{36}\.png$/);
    await expect(
      readFile(join(temporaryDirectory, publicUrl.replace('/uploads/', ''))),
    ).resolves.toEqual(png);

    await service.deleteByPublicUrl(publicUrl);
    await expect(
      readFile(join(temporaryDirectory, publicUrl.replace('/uploads/', ''))),
    ).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('guarda las portadas en el subdirectorio separado de asociaciones', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );

    const publicUrl = await service.saveAssociationCover({
      buffer: png,
      mimetype: 'image/png',
    });

    expect(publicUrl).toMatch(
      /^\/uploads\/associations\/covers\/[0-9a-f-]{36}\.png$/,
    );
    await expect(
      readFile(join(temporaryDirectory, publicUrl.replace('/uploads/', ''))),
    ).resolves.toEqual(png);
  });

  it('guarda las fotos de torneo en su propio directorio', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );

    const publicUrl = await service.saveTournamentPhoto({
      buffer: png,
      mimetype: 'image/png',
    });

    expect(publicUrl).toMatch(/^\/uploads\/tournaments\/[0-9a-f-]{36}\.png$/);
    await expect(
      readFile(join(temporaryDirectory, publicUrl.replace('/uploads/', ''))),
    ).resolves.toEqual(png);
  });

  it('rechaza contenido cuya firma no coincide con el MIME declarado', async () => {
    await expect(
      service.saveAssociationLogo({
        buffer: Buffer.from('no es una imagen'),
        mimetype: 'image/png',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('rechaza imágenes que superan 2 MB', async () => {
    const oversizedJpeg = Buffer.alloc(MAX_IMAGE_SIZE_BYTES + 1, 0);
    oversizedJpeg.set([0xff, 0xd8, 0xff], 0);
    oversizedJpeg.set([0xff, 0xd9], oversizedJpeg.length - 2);

    await expect(
      service.saveAssociationLogo({
        buffer: oversizedJpeg,
        mimetype: 'image/jpeg',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
