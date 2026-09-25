import { Prisma } from '../../generated/prisma/client';
import { PublicUserResponseDto } from './dto/public-user-response.dto';
export declare const publicUserSelect: {
    id: true;
    id_number: true;
    document_type: true;
    full_name: true;
    birth_date: true;
    birth_city: true;
    gender: true;
    email: true;
    phone: true;
    photo_url: true;
    photo_public_id: true;
    document_front_public_id: true;
    document_back_public_id: true;
    status: true;
    identity_verification_status: true;
    blocked_until: true;
    block_reason: true;
    created_at: true;
    updated_at: true;
    user_roles: {
        orderBy: {
            role_code: "asc";
        };
        select: {
            role_code: true;
        };
    };
};
type PublicUserRecord = Prisma.usersGetPayload<{
    select: typeof publicUserSelect;
}>;
export declare function toPublicUserResponse(user: PublicUserRecord): PublicUserResponseDto;
export {};
