import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async create(createSponsorDto: CreateSponsorDto, logo?: UploadedImageFile) {
    const uploadedLogo = logo
      ? await this.imageStorage.saveSponsorLogo(logo)
      : undefined;
    try {
      return await this.prisma.sponsors.create({
        data: {
          name: createSponsorDto.name,
          tax_id: createSponsorDto.taxId,
          contact_name: createSponsorDto.contactName,
          email: createSponsorDto.email,
          phone: createSponsorDto.phone,
          website_url: createSponsorDto.websiteUrl,
          logo_url: uploadedLogo?.url,
          logo_public_id: uploadedLogo?.publicId,
          status: createSponsorDto.status,
        },
      });
    } catch (error) {
      if (uploadedLogo) await this.imageStorage.deleteSafely(uploadedLogo);
      throw error;
    }
  }

  findAll() {
    return this.prisma.sponsors.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: bigint) {
    const sponsor = await this.prisma.sponsors.findUnique({ where: { id } });

    if (!sponsor) {
      throw new NotFoundException(
        `No se encontró el patrocinador con ID ${id}.`,
      );
    }

    return sponsor;
  }

  async update(
    id: bigint,
    updateSponsorDto: UpdateSponsorDto,
    logo?: UploadedImageFile,
  ) {
    const current = await this.findOne(id);
    const uploadedLogo = logo
      ? await this.imageStorage.saveSponsorLogo(logo)
      : undefined;
    try {
      const updated = await this.prisma.sponsors.update({
        where: { id },
        data: {
          name: updateSponsorDto.name,
          tax_id: updateSponsorDto.taxId,
          contact_name: updateSponsorDto.contactName,
          email: updateSponsorDto.email,
          phone: updateSponsorDto.phone,
          website_url: updateSponsorDto.websiteUrl,
          logo_url: uploadedLogo?.url,
          logo_public_id: uploadedLogo?.publicId,
          status: updateSponsorDto.status,
        },
      });
      if (uploadedLogo && current.logo_url) {
        await this.imageStorage.deleteSafely({
          url: current.logo_url,
          publicId: current.logo_public_id,
        });
      }
      return updated;
    } catch (error) {
      if (uploadedLogo) await this.imageStorage.deleteSafely(uploadedLogo);
      throw error;
    }
  }

  async remove(id: bigint) {
    const current = await this.findOne(id);
    const removed = await this.prisma.sponsors.delete({ where: { id } });
    if (current.logo_url) {
      await this.imageStorage.deleteSafely({
        url: current.logo_url,
        publicId: current.logo_public_id,
      });
    }
    return removed;
  }
}
