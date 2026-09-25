import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageStorageService } from '../uploads/image-storage.service';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { AssociationResponseDto } from './dto/association-response.dto';
import { AssociationDetailResponseDto, AssociationPermissionsResponseDto } from './dto/association-detail-response.dto';
import { AssociationTournamentResponseDto } from './dto/association-tournament-response.dto';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import type { AssociationTournamentScope } from './dto/list-association-tournaments-query.dto';
export declare class AssociationsService {
    private readonly prisma;
    private readonly imageStorage;
    private readonly logger;
    constructor(prisma: PrismaService, imageStorage: ImageStorageService);
    create(createAssociationDto: CreateAssociationDto, logo: UploadedImageFile, cover: UploadedImageFile, requestingUserId: bigint): Promise<AssociationResponseDto>;
    findAll(requestingUserId?: bigint): Promise<AssociationResponseDto[]>;
    private hasRole;
    private pinFeaturedAssociation;
    findMine(requestingUserId: bigint): Promise<AssociationResponseDto[]>;
    findAdministeredBy(userId: bigint): Promise<AssociationResponseDto[]>;
    private findAdministeredAssociations;
    private toAssociationResponsesWithTeamCounts;
    findOne(id: bigint, requestingUserId: bigint): Promise<AssociationDetailResponseDto>;
    findAvailableTournaments(associationId: bigint, requestingUserId: bigint, scope?: AssociationTournamentScope): Promise<AssociationTournamentResponseDto[]>;
    update(id: bigint, requestingUserId: bigint, updateAssociationDto: UpdateAssociationDto, images?: {
        logo?: UploadedImageFile;
        cover?: UploadedImageFile;
    }): Promise<AssociationDetailResponseDto>;
    remove(id: bigint): Promise<AssociationResponseDto>;
    private countApprovedTeams;
    private ensureActiveOwner;
    private ensureAssociationAdminRole;
    private notifyAssociationAssignmentSafely;
    private assertCanCreateAssociation;
    getAssociationPermissions(client: Prisma.TransactionClient, associationId: bigint, requestingUserId: bigint): Promise<AssociationPermissionsResponseDto>;
    private deleteImagesWithoutMaskingError;
    private deleteImageWithoutMaskingError;
}
