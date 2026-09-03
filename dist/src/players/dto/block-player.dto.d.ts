export declare const PLAYER_BLOCK_DURATIONS: readonly ["one_week", "one_month", "three_months", "six_months", "nine_months", "one_year"];
export type PlayerBlockDuration = (typeof PLAYER_BLOCK_DURATIONS)[number];
export declare class BlockPlayerDto {
    duration: PlayerBlockDuration;
    reason: string;
}
