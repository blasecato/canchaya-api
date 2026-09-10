import { type UserGender } from '../user-gender.constants';
export declare class RegisterPlayerDto {
    idNumber: string;
    fullName: string;
    email: string;
    age: number;
    phone?: string;
    birthDate: string;
    birthCity: string;
    gender: UserGender;
    password: string;
}
