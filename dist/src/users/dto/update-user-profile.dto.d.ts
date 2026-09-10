import { type UserGender } from '../user-gender.constants';
export declare class UpdateUserProfileDto {
    idNumber?: string;
    documentType?: string;
    fullName?: string;
    birthDate?: string;
    gender?: UserGender;
    email?: string;
    phone?: string | null;
    roles?: string[];
}
