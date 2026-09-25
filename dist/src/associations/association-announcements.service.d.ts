import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { AssociationsService } from './associations.service';
import type { AssociationAnnouncementResponseDto, AssociationAnnouncementScope, CreateAssociationAnnouncementDto, PublicAssociationAnnouncementResponseDto, UpdateAssociationAnnouncementDto } from './dto/association-announcement.dto';
export declare class AssociationAnnouncementsService {
    private readonly prisma;
    private readonly associationsService;
    private readonly imageStorage;
    constructor(prisma: PrismaService, associationsService: AssociationsService, imageStorage: ImageStorageService);
    findVisibleForHome(): Promise<PublicAssociationAnnouncementResponseDto[]>;
    findAll(associationId: bigint, requestingUserId: bigint, scope?: AssociationAnnouncementScope): Promise<AssociationAnnouncementResponseDto[]>;
    create(associationId: bigint, requestingUserId: bigint, dto: CreateAssociationAnnouncementDto, image: UploadedImageFile): Promise<AssociationAnnouncementResponseDto>;
    update(associationId: bigint, announcementId: bigint, requestingUserId: bigint, dto: UpdateAssociationAnnouncementDto, image?: UploadedImageFile): Promise<AssociationAnnouncementResponseDto>;
    remove(associationId: bigint, announcementId: bigint, requestingUserId: bigint): Promise<AssociationAnnouncementResponseDto>;
    private assertCanManage;
    private findRecord;
    private parseDateRange;
    private parseOptionalDate;
    private parseDate;
    private todayInColombia;
    private toDateValue;
    private toResponse;
}
