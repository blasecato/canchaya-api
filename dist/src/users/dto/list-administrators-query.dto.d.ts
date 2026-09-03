export declare class ListAdministratorsQueryDto {
    search?: string;
    role?: 'SUPER_ADMIN' | 'ASSOCIATION_ADMIN';
    status?: 'active' | 'blocked';
    page: number;
    pageSize: number;
}
