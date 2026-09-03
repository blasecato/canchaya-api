export declare class CreateTeamDto {
    name: string;
    sportType: string;
    modality: string;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    captainUserId?: string;
    memberUserIds?: string[];
    status?: string;
}
