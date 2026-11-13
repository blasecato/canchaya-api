import { AssociationsService } from './associations.service';
import { PublicAssociationResponseDto } from './dto/public-association-response.dto';
export declare class PublicAssociationsController {
    private readonly associationsService;
    constructor(associationsService: AssociationsService);
    findAll(): Promise<PublicAssociationResponseDto[]>;
}
