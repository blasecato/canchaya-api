import { Injectable } from '@nestjs/common';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { LocalImageStorageService } from '../uploads/local-image-storage.service';

const DEFAULT_GALLERY_ITEMS = [
  {
    slot: 1,
    label: 'Partido nocturno de fútbol',
    imageUrl: '/images/cancha1.png',
  },
  {
    slot: 2,
    label: 'Equipo antes del partido',
    imageUrl: '/images/cancha2.png',
  },
  {
    slot: 3,
    label: 'Jugadores en competencia',
    imageUrl: '/images/cancha3.png',
  },
  {
    slot: 4,
    label: 'Celebración de equipo',
    imageUrl: '/images/cancha4.png',
  },
  {
    slot: 5,
    label: 'Premiación del torneo',
    imageUrl: '/images/cancha5.png',
  },
] as const;

export type HomeGalleryUpload = {
  slot: number;
  file: UploadedImageFile;
};

@Injectable()
export class HomeGalleryService {
  constructor(private readonly localStorage: LocalImageStorageService) {}

  async findAll() {
    return Promise.all(
      DEFAULT_GALLERY_ITEMS.map(async (item) => ({
        ...item,
        imageUrl:
          (await this.localStorage.findHomeGalleryImage(item.slot)) ??
          item.imageUrl,
      })),
    );
  }

  async replace(uploads: HomeGalleryUpload[]) {
    uploads.forEach(({ file, slot }) =>
      this.localStorage.validateHomeGalleryImage(file, slot),
    );

    await Promise.all(
      uploads.map(({ file, slot }) =>
        this.localStorage.replaceHomeGalleryImage(slot, file),
      ),
    );

    return this.findAll();
  }
}
