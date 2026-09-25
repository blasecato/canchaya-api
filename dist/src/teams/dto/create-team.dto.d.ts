import { FOOTBALL_SPORT_TYPE, type FootballModality } from '../../common/constants/football.constants';
export declare class CreateTeamDto {
    name: string;
    sportType: typeof FOOTBALL_SPORT_TYPE;
    modality?: FootballModality | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    captainUserId?: string;
    memberUserIds?: string[];
    status?: string;
}
