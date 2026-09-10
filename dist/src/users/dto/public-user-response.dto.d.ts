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
    status: string;
    blockReason: string | null;
    blockedUntil: string | null;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}
