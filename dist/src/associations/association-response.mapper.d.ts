import { Prisma } from '../../generated/prisma/client';
import { AssociationResponseDto } from './dto/association-response.dto';
export declare const associationResponseSelect: {
    id: true;
    name: true;
    description: true;
    city: true;
    address: true;
    tax_id: true;
    email: true;
    phone: true;
    logo_url: true;
    logo_public_id: true;
    cover_url: true;
    cover_public_id: true;
    owner_user_id: true;
    status: true;
    created_at: true;
    updated_at: true;
    users: {
        select: {
            id: true;
            full_name: true;
            email: true;
            phone: true;
        };
    };
    association_administrators: {
        where: {
            status: string;
        };
        select: {
            user_id: true;
            permission_level: true;
        };
    };
    _count: {
        select: {
            tournaments: true;
        };
    };
};
export type AssociationResponseRecord = Prisma.associationsGetPayload<{
    select: typeof associationResponseSelect;
}>;
export declare function toAssociationResponse(association: AssociationResponseRecord, teamCount: number): AssociationResponseDto;
