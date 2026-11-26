import { type UserGender } from '../user-gender.constants';
export declare class RegisterPlayerDto {
    idNumber: string;
    fullName: string;
    phone: string;
    email?: string;
    age?: number;
    birthDate: string;
    birthCity?: string;
    gender: UserGender;
    password: string;
}
