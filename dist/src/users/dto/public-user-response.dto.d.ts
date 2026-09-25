import { type UserGender } from '../user-gender.constants';
export declare class PublicUserResponseDto {
    id: string;
    idNumber: string;
    documentType: string;
    fullName: string;
    birthDate: string;
    birthCity: string | null;
    gender: UserGender | null;
    email: string;
    phone: string | null;
    photoUrl: string | null;
    hasIdentityDocuments: boolean;
    status: string;
    blockReason: string | null;
    blockedUntil: string | null;
    identityVerificationStatus: 'verified' | 'pending_review';
    roles: string[];
    createdAt: string;
    updatedAt: string;
}
