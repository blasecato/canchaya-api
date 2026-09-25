import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import {
  associationAnnouncementSelect,
  publicAssociationAnnouncementSelect,
  toAssociationAnnouncementResponse,
  toPublicAssociationAnnouncementResponse,
  type AssociationAnnouncementRecord,
} from './association-announcement.mapper';
import { AssociationsService } from './associations.service';
import type {
  AssociationAnnouncementResponseDto,
  AssociationAnnouncementScope,
  CreateAssociationAnnouncementDto,
  PublicAssociationAnnouncementResponseDto,
  UpdateAssociationAnnouncementDto,
} from './dto/association-announcement.dto';

@Injectable()
export class AssociationAnnouncementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly associationsService: AssociationsService,
    private readonly imageStorage: ImageStorageService,
  ) {}

  async findVisibleForHome(): Promise<
    PublicAssociationAnnouncementResponseDto[]
  > {
    const today = this.todayInColombia();
    const announcements = await this.prisma.association_announcements.findMany({
      where: {
        starts_on: { lte: today },
        ends_on: { gte: today },
        associations: { status: 'active' },
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      take: 5,
      select: publicAssociationAnnouncementSelect,
    });

    return announcements.map((announcement) =>
      toPublicAssociationAnnouncementResponse(announcement, today),
    );
  }

  async findAll(
    associationId: bigint,
    requestingUserId: bigint,
    scope: AssociationAnnouncementScope = 'visible',
  ): Promise<AssociationAnnouncementResponseDto[]> {
    if (scope === 'management') {
      await this.assertCanManage(associationId, requestingUserId);
    } else {
      await this.associationsService.getAssociationPermissions(
        this.prisma,
        associationId,
        requestingUserId,
      );
    }

    const today = this.todayInColombia();
    const announcements = await this.prisma.association_announcements.findMany({
      where: {
        association_id: associationId,
        ...(scope === 'visible'
          ? { starts_on: { lte: today }, ends_on: { gte: today } }
          : {}),
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      select: associationAnnouncementSelect,
    });

    return announcements.map((announcement) =>
      toAssociationAnnouncementResponse(announcement, today),
    );
  }

  async create(
    associationId: bigint,
    requestingUserId: bigint,
    dto: CreateAssociationAnnouncementDto,
    image: UploadedImageFile,
  ): Promise<AssociationAnnouncementResponseDto> {
    await this.assertCanManage(associationId, requestingUserId);
    const dates = this.parseDateRange(dto.startsOn, dto.endsOn);
    const uploaded = await this.imageStorage.saveAssociationAnnouncement(image);

    try {
      const announcement = await this.prisma.association_announcements.create({
        data: {
          association_id: associationId,
          title: dto.title,
          description: dto.description,
          contact_phone: dto.contactPhone ?? null,
          address: dto.address ?? null,
          registration_fee: dto.registrationFee ?? null,
          registration_starts_on: this.parseOptionalDate(
            dto.registrationStartsOn,
            'fecha de inicio de inscripciones',
          ),
          tournament_starts_on: this.parseOptionalDate(
            dto.tournamentStartsOn,
            'fecha de inicio del torneo',
          ),
          first_place_prize: dto.firstPlacePrize ?? null,
          second_place_prize: dto.secondPlacePrize ?? null,
          image_url: uploaded.url,
          image_public_id: uploaded.publicId,
          starts_on: dates.startsOn,
          ends_on: dates.endsOn,
          created_by: requestingUserId,
        },
        select: associationAnnouncementSelect,
      });
      return this.toResponse(announcement);
    } catch (error: unknown) {
      await this.imageStorage.deleteSafely(uploaded);
      throw error;
    }
  }

  async update(
    associationId: bigint,
    announcementId: bigint,
    requestingUserId: bigint,
    dto: UpdateAssociationAnnouncementDto,
    image?: UploadedImageFile,
  ): Promise<AssociationAnnouncementResponseDto> {
    await this.assertCanManage(associationId, requestingUserId);
    const current = await this.findRecord(associationId, announcementId);
    const currentStartsOn = this.toDateValue(current.starts_on);
    const currentEndsOn = this.toDateValue(current.ends_on);
    const dates = this.parseDateRange(
      dto.startsOn ?? currentStartsOn,
      dto.endsOn ?? currentEndsOn,
    );
    const uploaded = image
      ? await this.imageStorage.saveAssociationAnnouncement(image)
      : undefined;

    let updated: AssociationAnnouncementRecord;
    try {
      updated = await this.prisma.association_announcements.update({
        where: { id: announcementId },
        data: {
          title: dto.title,
          description: dto.description,
          contact_phone: dto.contactPhone,
          address: dto.address,
          registration_fee: dto.registrationFee,
          registration_starts_on:
            dto.registrationStartsOn === undefined
              ? undefined
              : this.parseOptionalDate(
                  dto.registrationStartsOn,
                  'fecha de inicio de inscripciones',
                ),
          tournament_starts_on:
            dto.tournamentStartsOn === undefined
              ? undefined
              : this.parseOptionalDate(
                  dto.tournamentStartsOn,
                  'fecha de inicio del torneo',
                ),
          first_place_prize: dto.firstPlacePrize,
          second_place_prize: dto.secondPlacePrize,
          starts_on: dates.startsOn,
          ends_on: dates.endsOn,
          image_url: uploaded?.url,
          image_public_id: uploaded?.publicId,
          updated_at: new Date(),
        },
        select: associationAnnouncementSelect,
      });
    } catch (error: unknown) {
      if (uploaded) await this.imageStorage.deleteSafely(uploaded);
      throw error;
    }

    if (uploaded) {
      await this.imageStorage.deleteSafely({
        url: current.image_url,
        publicId: current.image_public_id,
      });
    }
    return this.toResponse(updated);
  }

  async remove(
    associationId: bigint,
    announcementId: bigint,
    requestingUserId: bigint,
  ): Promise<AssociationAnnouncementResponseDto> {
    await this.assertCanManage(associationId, requestingUserId);
    const current = await this.findRecord(associationId, announcementId);
    await this.prisma.association_announcements.delete({
      where: { id: announcementId },
    });
    await this.imageStorage.deleteSafely({
      url: current.image_url,
      publicId: current.image_public_id,
    });
    return this.toResponse(current);
  }

  private async assertCanManage(
    associationId: bigint,
    requestingUserId: bigint,
  ): Promise<void> {
    const permissions =
      await this.associationsService.getAssociationPermissions(
        this.prisma,
        associationId,
        requestingUserId,
      );
    if (!permissions.canEdit) {
      throw new ForbiddenException(
        'No tienes permisos para administrar las publicaciones de esta asociación.',
      );
    }
  }

  private async findRecord(
    associationId: bigint,
    announcementId: bigint,
  ): Promise<AssociationAnnouncementRecord> {
    const announcement = await this.prisma.association_announcements.findFirst({
      where: { id: announcementId, association_id: associationId },
      select: associationAnnouncementSelect,
    });
    if (!announcement) {
      throw new NotFoundException('La publicación de la asociación no existe.');
    }
    return announcement;
  }

  private parseDateRange(startsOn: string, endsOn: string) {
    const parsedStartsOn = this.parseDate(startsOn, 'fecha inicial');
    const parsedEndsOn = this.parseDate(endsOn, 'fecha final');
    if (parsedEndsOn < parsedStartsOn) {
      throw new BadRequestException(
        'La fecha final debe ser igual o posterior a la fecha inicial.',
      );
    }
    return { startsOn: parsedStartsOn, endsOn: parsedEndsOn };
  }

  private parseOptionalDate(
    value: string | null | undefined,
    label: string,
  ): Date | null {
    if (value === null || value === undefined || value === '') return null;
    return this.parseDate(value, label);
  }

  private parseDate(value: string, label: string): Date {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime()) || this.toDateValue(date) !== value) {
      throw new BadRequestException(`La ${label} no es válida.`);
    }
    return date;
  }

  private todayInColombia(): Date {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
    const values = Object.fromEntries(
      parts
        .filter(({ type }) => ['year', 'month', 'day'].includes(type))
        .map(({ type, value }) => [type, Number(value)]),
    ) as Record<'year' | 'month' | 'day', number>;
    return new Date(Date.UTC(values.year, values.month - 1, values.day));
  }

  private toDateValue(value: Date): string {
    return value.toISOString().slice(0, 10);
  }

  private toResponse(
    announcement: AssociationAnnouncementRecord,
  ): AssociationAnnouncementResponseDto {
    return toAssociationAnnouncementResponse(
      announcement,
      this.todayInColombia(),
    );
  }
}
