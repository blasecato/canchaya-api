import { type UserGender } from '../../users/user-gender.constants';
export declare const MAX_BULK_PLAYERS = 500;
export declare class BulkPlayerRowDto {
    row: number;
    idNumber: string;
    documentType: string;
    fullName: string;
    birthDate: string;
    gender: UserGender;
    email: string;
    phone?: string | null;
}
export declare class BulkCreatePlayersDto {
    players: BulkPlayerRowDto[];
}
export declare class BulkPlayerSkippedDto {
    row: number;
    idNumber: string;
    fullName: string;
    reason: 'duplicate_document' | 'duplicate_email' | 'duplicate_in_file';
    detail: string;
}
export declare class BulkCreatePlayersResponseDto {
    received: number;
    created: number;
    skipped: BulkPlayerSkippedDto[];
    temporaryPassword: string;
}
