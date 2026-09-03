import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import { AssociationsService } from './associations.service';
import { AssociationResponseDto } from './dto/association-response.dto';
import { AssociationDetailResponseDto } from './dto/association-detail-response.dto';
import { AssociationTournamentResponseDto } from './dto/association-tournament-response.dto';
import { CreateAssociationDto } from './dto/create-association.dto';
import { ListAssociationTournamentsQueryDto } from './dto/list-association-tournaments-query.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
export declare class AssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    create(request: AuthenticatedRequest, createAssociationDto: CreateAssociationDto, images: {
        logo?: UploadedImageFile[];
        cover?: UploadedImageFile[];
    } | undefined): Promise<AssociationResponseDto>;
    findAll(request: AuthenticatedRequest): Promise<AssociationResponseDto[]>;
    findMine(request: AuthenticatedRequest): Promise<AssociationResponseDto[]>;
    findAdministeredBy(userId: bigint): Promise<AssociationResponseDto[]>;
    findAvailableTournaments(id: bigint, request: AuthenticatedRequest, query: ListAssociationTournamentsQueryDto): Promise<AssociationTournamentResponseDto[]>;
    findOne(id: bigint, request: AuthenticatedRequest): Promise<AssociationDetailResponseDto>;
    update(id: bigint, request: AuthenticatedRequest, updateAssociationDto: UpdateAssociationDto, images: {
        logo?: UploadedImageFile[];
        cover?: UploadedImageFile[];
    } | undefined): Promise<AssociationDetailResponseDto>;
    remove(id: bigint): Promise<AssociationResponseDto>;
}
