export declare class AssociationOwnerResponseDto {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
}
export declare class AssociationResponseDto {
    id: string;
    name: string;
    description: string | null;
    city: string;
    address: string | null;
    taxId: string | null;
    email: string | null;
    phone: string | null;
    logoUrl: string | null;
    coverUrl: string;
    status: 'active' | 'inactive';
    owner: AssociationOwnerResponseDto;
    tournamentCount: number;
    teamCount: number;
    administratorCount: number;
    createdAt: string;
    updatedAt: string;
}
