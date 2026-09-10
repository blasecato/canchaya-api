import { type UserGender } from '../../users/user-gender.constants';
export declare class CreatePlayerDto {
    idNumber: string;
    documentType: string;
    fullName: string;
    birthDate: string;
    gender: UserGender;
    email: string;
    phone?: string | null;
    password: string;
}
