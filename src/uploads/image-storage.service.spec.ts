import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { ImageStorageService } from './image-storage.service';
import { LocalImageStorageService } from './local-image-storage.service';

jest.mock('cloudinary', () => {
  const uploadStream = jest.fn(
    (
      options: Record<string, unknown>,
      callback: (error: undefined, response: Record<string, unknown>) => void,
    ) => ({
      end: jest.fn(() =>
        callback(undefined, {
          secure_url: 'https://res.cloudinary.com/demo/image/upload/test.png',
          public_id: `${String(options.folder)}/test`,
          asset_id: 'asset-1',
          format: 'png',
        }),
      ),
    }),
  );
  return {
    v2: {
      config: jest.fn(),
      uploader: { upload_stream: uploadStream, destroy: jest.fn() },
      utils: { private_download_url: jest.fn(() => 'https://signed.test/doc') },
    },
  };
});

const validPng = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  Buffer.from([0x00, 0x00, 0x00, 0x00]),
  Buffer.from([
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
  ]),
]);

describe('ImageStorageService', () => {
  const service = new ImageStorageService(
    new ConfigService({
      CLOUDINARY_CLOUD_NAME: 'demo',
      CLOUDINARY_API_KEY: 'key',
      CLOUDINARY_API_SECRET: 'secret',
    }),
    new LocalImageStorageService(),
  );

  beforeEach(() => jest.clearAllMocks());

  it('carga fotos públicas en la carpeta de perfiles y devuelve metadatos', async () => {
    const result = await service.saveUserPhoto({
      buffer: validPng,
      mimetype: 'image/png',
    });

    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      expect.objectContaining({
        folder: 'canchaya/users/profiles',
        type: 'upload',
        resource_type: 'image',
      }),
      expect.any(Function),
    );
    expect(result.url).toContain('https://res.cloudinary.com/');
    expect(result.publicId).toBe('canchaya/users/profiles/test');
    expect(result.deliveryType).toBe('upload');
  });

  it('protege las cédulas como authenticated', async () => {
    const result = await service.saveIdentityDocument(
      { buffer: validPng, mimetype: 'image/png' },
      'front',
    );
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      expect.objectContaining({
        folder: 'canchaya/users/documents/front',
        type: 'authenticated',
      }),
      expect.any(Function),
    );
    expect(result.deliveryType).toBe('authenticated');
  });

  it('rechaza contenido cuyo tipo real no coincide con el declarado', async () => {
    await expect(
      service.saveTeamPhoto({
        buffer: Buffer.from('no es una imagen'),
        mimetype: 'image/png',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(cloudinary.uploader.upload_stream).not.toHaveBeenCalled();
  });

  it('elimina usando publicId y el tipo de entrega', async () => {
    await service.delete({
      publicId: 'canchaya/users/documents/front/test',
      deliveryType: 'authenticated',
    });
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      'canchaya/users/documents/front/test',
      expect.objectContaining({ type: 'authenticated', invalidate: true }),
    );
  });
});
