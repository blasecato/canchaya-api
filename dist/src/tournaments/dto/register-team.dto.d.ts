export declare class RegisterTeamDto {
    teamId: string;
}
export declare class CaptainTeamOptionResponseDto {
    id: string;
    name: string;
    photoUrl: string | null;
    memberCount: number;
    registrationStatus: string | null;
    eligible: boolean;
    eligibilityMessage: string | null;
}
export declare class TeamRegistrationResponseDto {
    tournamentId: string;
    teamId: string;
    status: string;
}
