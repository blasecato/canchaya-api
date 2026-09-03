export declare const REFEREE_MATCH_KINDS: readonly ["past", "upcoming"];
export type RefereeMatchKind = (typeof REFEREE_MATCH_KINDS)[number];
export declare class ListRefereeMatchesQueryDto {
    kind: RefereeMatchKind;
    page: number;
    pageSize: number;
}
