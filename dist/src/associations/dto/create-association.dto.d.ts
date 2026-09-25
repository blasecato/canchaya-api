export declare class CreateAssociationDto {
    name: string;
    description: string;
    city: string;
    address: string;
    taxId?: string | null;
    email?: string | null;
    phone: string;
    ownerUserId: string;
    status: 'active' | 'inactive';
}
