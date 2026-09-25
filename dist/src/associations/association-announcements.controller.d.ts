import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { AssociationAnnouncementsService } from './association-announcements.service';
import { AssociationAnnouncementResponseDto, CreateAssociationAnnouncementDto, ListAssociationAnnouncementsQueryDto, UpdateAssociationAnnouncementDto } from './dto/association-announcement.dto';
export declare class AssociationAnnouncementsController {
    private readonly announcementsService;
    constructor(announcementsService: AssociationAnnouncementsService);
    findAll(associationId: bigint, request: AuthenticatedRequest, query: ListAssociationAnnouncementsQueryDto): Promise<AssociationAnnouncementResponseDto[]>;
    create(associationId: bigint, request: AuthenticatedRequest, dto: CreateAssociationAnnouncementDto, image?: UploadedImageFile): Promise<AssociationAnnouncementResponseDto>;
    update(associationId: bigint, announcementId: bigint, request: AuthenticatedRequest, dto: UpdateAssociationAnnouncementDto, image?: UploadedImageFile): Promise<AssociationAnnouncementResponseDto>;
    remove(associationId: bigint, announcementId: bigint, request: AuthenticatedRequest): Promise<AssociationAnnouncementResponseDto>;
}
