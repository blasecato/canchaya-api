export declare class TeamLineupSlotDto {
    slotKey: string;
    playerId?: string | null;
}
export declare class UpdateTeamLineupDto {
    formation: string;
    slots: TeamLineupSlotDto[];
}
