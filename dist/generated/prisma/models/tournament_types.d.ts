import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_typesModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_typesPayload>;
export type AggregateTournament_types = {
    _count: Tournament_typesCountAggregateOutputType | null;
    _avg: Tournament_typesAvgAggregateOutputType | null;
    _sum: Tournament_typesSumAggregateOutputType | null;
    _min: Tournament_typesMinAggregateOutputType | null;
    _max: Tournament_typesMaxAggregateOutputType | null;
};
export type Tournament_typesAvgAggregateOutputType = {
    id: number | null;
    min_players_per_team: number | null;
    max_players_per_team: number | null;
};
export type Tournament_typesSumAggregateOutputType = {
    id: bigint | null;
    min_players_per_team: number | null;
    max_players_per_team: number | null;
};
export type Tournament_typesMinAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    min_players_per_team: number | null;
    max_players_per_team: number | null;
    instructions: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Tournament_typesMaxAggregateOutputType = {
    id: bigint | null;
    name: string | null;
    description: string | null;
    min_players_per_team: number | null;
    max_players_per_team: number | null;
    instructions: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Tournament_typesCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    min_players_per_team: number;
    max_players_per_team: number;
    instructions: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Tournament_typesAvgAggregateInputType = {
    id?: true;
    min_players_per_team?: true;
    max_players_per_team?: true;
};
export type Tournament_typesSumAggregateInputType = {
    id?: true;
    min_players_per_team?: true;
    max_players_per_team?: true;
};
export type Tournament_typesMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    min_players_per_team?: true;
    max_players_per_team?: true;
    instructions?: true;
    created_at?: true;
    updated_at?: true;
};
export type Tournament_typesMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    min_players_per_team?: true;
    max_players_per_team?: true;
    instructions?: true;
    created_at?: true;
    updated_at?: true;
};
export type Tournament_typesCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    min_players_per_team?: true;
    max_players_per_team?: true;
    instructions?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Tournament_typesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_typesWhereInput;
    orderBy?: Prisma.tournament_typesOrderByWithRelationInput | Prisma.tournament_typesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_typesCountAggregateInputType;
    _avg?: Tournament_typesAvgAggregateInputType;
    _sum?: Tournament_typesSumAggregateInputType;
    _min?: Tournament_typesMinAggregateInputType;
    _max?: Tournament_typesMaxAggregateInputType;
};
export type GetTournament_typesAggregateType<T extends Tournament_typesAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_types]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_types[P]> : Prisma.GetScalarType<T[P], AggregateTournament_types[P]>;
};
export type tournament_typesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_typesWhereInput;
    orderBy?: Prisma.tournament_typesOrderByWithAggregationInput | Prisma.tournament_typesOrderByWithAggregationInput[];
    by: Prisma.Tournament_typesScalarFieldEnum[] | Prisma.Tournament_typesScalarFieldEnum;
    having?: Prisma.tournament_typesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_typesCountAggregateInputType | true;
    _avg?: Tournament_typesAvgAggregateInputType;
    _sum?: Tournament_typesSumAggregateInputType;
    _min?: Tournament_typesMinAggregateInputType;
    _max?: Tournament_typesMaxAggregateInputType;
};
export type Tournament_typesGroupByOutputType = {
    id: bigint;
    name: string;
    description: string | null;
    min_players_per_team: number;
    max_players_per_team: number;
    instructions: string | null;
    created_at: Date;
    updated_at: Date;
    _count: Tournament_typesCountAggregateOutputType | null;
    _avg: Tournament_typesAvgAggregateOutputType | null;
    _sum: Tournament_typesSumAggregateOutputType | null;
    _min: Tournament_typesMinAggregateOutputType | null;
    _max: Tournament_typesMaxAggregateOutputType | null;
};
export type GetTournament_typesGroupByPayload<T extends tournament_typesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_typesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_typesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_typesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_typesGroupByOutputType[P]>;
}>>;
export type tournament_typesWhereInput = {
    AND?: Prisma.tournament_typesWhereInput | Prisma.tournament_typesWhereInput[];
    OR?: Prisma.tournament_typesWhereInput[];
    NOT?: Prisma.tournament_typesWhereInput | Prisma.tournament_typesWhereInput[];
    id?: Prisma.BigIntFilter<"tournament_types"> | bigint | number;
    name?: Prisma.StringFilter<"tournament_types"> | string;
    description?: Prisma.StringNullableFilter<"tournament_types"> | string | null;
    min_players_per_team?: Prisma.IntFilter<"tournament_types"> | number;
    max_players_per_team?: Prisma.IntFilter<"tournament_types"> | number;
    instructions?: Prisma.StringNullableFilter<"tournament_types"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_types"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"tournament_types"> | Date | string;
    tournaments?: Prisma.TournamentsListRelationFilter;
};
export type tournament_typesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
    instructions?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    tournaments?: Prisma.tournamentsOrderByRelationAggregateInput;
};
export type tournament_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    name?: string;
    AND?: Prisma.tournament_typesWhereInput | Prisma.tournament_typesWhereInput[];
    OR?: Prisma.tournament_typesWhereInput[];
    NOT?: Prisma.tournament_typesWhereInput | Prisma.tournament_typesWhereInput[];
    description?: Prisma.StringNullableFilter<"tournament_types"> | string | null;
    min_players_per_team?: Prisma.IntFilter<"tournament_types"> | number;
    max_players_per_team?: Prisma.IntFilter<"tournament_types"> | number;
    instructions?: Prisma.StringNullableFilter<"tournament_types"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_types"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"tournament_types"> | Date | string;
    tournaments?: Prisma.TournamentsListRelationFilter;
}, "id" | "name">;
export type tournament_typesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
    instructions?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_typesCountOrderByAggregateInput;
    _avg?: Prisma.tournament_typesAvgOrderByAggregateInput;
    _max?: Prisma.tournament_typesMaxOrderByAggregateInput;
    _min?: Prisma.tournament_typesMinOrderByAggregateInput;
    _sum?: Prisma.tournament_typesSumOrderByAggregateInput;
};
export type tournament_typesScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_typesScalarWhereWithAggregatesInput | Prisma.tournament_typesScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_typesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_typesScalarWhereWithAggregatesInput | Prisma.tournament_typesScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"tournament_types"> | bigint | number;
    name?: Prisma.StringWithAggregatesFilter<"tournament_types"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"tournament_types"> | string | null;
    min_players_per_team?: Prisma.IntWithAggregatesFilter<"tournament_types"> | number;
    max_players_per_team?: Prisma.IntWithAggregatesFilter<"tournament_types"> | number;
    instructions?: Prisma.StringNullableWithAggregatesFilter<"tournament_types"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_types"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_types"> | Date | string;
};
export type tournament_typesCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    min_players_per_team?: number;
    max_players_per_team?: number;
    instructions?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournaments?: Prisma.tournamentsCreateNestedManyWithoutTournament_typesInput;
};
export type tournament_typesUncheckedCreateInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    min_players_per_team?: number;
    max_players_per_team?: number;
    instructions?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    tournaments?: Prisma.tournamentsUncheckedCreateNestedManyWithoutTournament_typesInput;
};
export type tournament_typesUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUpdateManyWithoutTournament_typesNestedInput;
};
export type tournament_typesUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tournaments?: Prisma.tournamentsUncheckedUpdateManyWithoutTournament_typesNestedInput;
};
export type tournament_typesCreateManyInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    min_players_per_team?: number;
    max_players_per_team?: number;
    instructions?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type tournament_typesUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_typesUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_typesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type tournament_typesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
};
export type tournament_typesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type tournament_typesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type tournament_typesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    min_players_per_team?: Prisma.SortOrder;
    max_players_per_team?: Prisma.SortOrder;
};
export type Tournament_typesScalarRelationFilter = {
    is?: Prisma.tournament_typesWhereInput;
    isNot?: Prisma.tournament_typesWhereInput;
};
export type tournament_typesCreateNestedOneWithoutTournamentsInput = {
    create?: Prisma.XOR<Prisma.tournament_typesCreateWithoutTournamentsInput, Prisma.tournament_typesUncheckedCreateWithoutTournamentsInput>;
    connectOrCreate?: Prisma.tournament_typesCreateOrConnectWithoutTournamentsInput;
    connect?: Prisma.tournament_typesWhereUniqueInput;
};
export type tournament_typesUpdateOneRequiredWithoutTournamentsNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_typesCreateWithoutTournamentsInput, Prisma.tournament_typesUncheckedCreateWithoutTournamentsInput>;
    connectOrCreate?: Prisma.tournament_typesCreateOrConnectWithoutTournamentsInput;
    upsert?: Prisma.tournament_typesUpsertWithoutTournamentsInput;
    connect?: Prisma.tournament_typesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.tournament_typesUpdateToOneWithWhereWithoutTournamentsInput, Prisma.tournament_typesUpdateWithoutTournamentsInput>, Prisma.tournament_typesUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_typesCreateWithoutTournamentsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    min_players_per_team?: number;
    max_players_per_team?: number;
    instructions?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type tournament_typesUncheckedCreateWithoutTournamentsInput = {
    id?: bigint | number;
    name: string;
    description?: string | null;
    min_players_per_team?: number;
    max_players_per_team?: number;
    instructions?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type tournament_typesCreateOrConnectWithoutTournamentsInput = {
    where: Prisma.tournament_typesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_typesCreateWithoutTournamentsInput, Prisma.tournament_typesUncheckedCreateWithoutTournamentsInput>;
};
export type tournament_typesUpsertWithoutTournamentsInput = {
    update: Prisma.XOR<Prisma.tournament_typesUpdateWithoutTournamentsInput, Prisma.tournament_typesUncheckedUpdateWithoutTournamentsInput>;
    create: Prisma.XOR<Prisma.tournament_typesCreateWithoutTournamentsInput, Prisma.tournament_typesUncheckedCreateWithoutTournamentsInput>;
    where?: Prisma.tournament_typesWhereInput;
};
export type tournament_typesUpdateToOneWithWhereWithoutTournamentsInput = {
    where?: Prisma.tournament_typesWhereInput;
    data: Prisma.XOR<Prisma.tournament_typesUpdateWithoutTournamentsInput, Prisma.tournament_typesUncheckedUpdateWithoutTournamentsInput>;
};
export type tournament_typesUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_typesUncheckedUpdateWithoutTournamentsInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    min_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    max_players_per_team?: Prisma.IntFieldUpdateOperationsInput | number;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_typesCountOutputType = {
    tournaments: number;
};
export type Tournament_typesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Tournament_typesCountOutputTypeCountTournamentsArgs;
};
export type Tournament_typesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Tournament_typesCountOutputTypeSelect<ExtArgs> | null;
};
export type Tournament_typesCountOutputTypeCountTournamentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournamentsWhereInput;
};
export type tournament_typesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    min_players_per_team?: boolean;
    max_players_per_team?: boolean;
    instructions?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    tournaments?: boolean | Prisma.tournament_types$tournamentsArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_typesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_types"]>;
export type tournament_typesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    min_players_per_team?: boolean;
    max_players_per_team?: boolean;
    instructions?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["tournament_types"]>;
export type tournament_typesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    min_players_per_team?: boolean;
    max_players_per_team?: boolean;
    instructions?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["tournament_types"]>;
export type tournament_typesSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    min_players_per_team?: boolean;
    max_players_per_team?: boolean;
    instructions?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type tournament_typesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "min_players_per_team" | "max_players_per_team" | "instructions" | "created_at" | "updated_at", ExtArgs["result"]["tournament_types"]>;
export type tournament_typesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tournaments?: boolean | Prisma.tournament_types$tournamentsArgs<ExtArgs>;
    _count?: boolean | Prisma.Tournament_typesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type tournament_typesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type tournament_typesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $tournament_typesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_types";
    objects: {
        tournaments: Prisma.$tournamentsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        name: string;
        description: string | null;
        min_players_per_team: number;
        max_players_per_team: number;
        instructions: string | null;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["tournament_types"]>;
    composites: {};
};
export type tournament_typesGetPayload<S extends boolean | null | undefined | tournament_typesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload, S>;
export type tournament_typesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_typesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_typesCountAggregateInputType | true;
};
export interface tournament_typesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_types'];
        meta: {
            name: 'tournament_types';
        };
    };
    findUnique<T extends tournament_typesFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_typesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_typesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_typesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_typesFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_typesFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_typesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_typesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_typesFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_typesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_typesCreateArgs>(args: Prisma.SelectSubset<T, tournament_typesCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_typesCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_typesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_typesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_typesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_typesDeleteArgs>(args: Prisma.SelectSubset<T, tournament_typesDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_typesUpdateArgs>(args: Prisma.SelectSubset<T, tournament_typesUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_typesDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_typesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_typesUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_typesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_typesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_typesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_typesUpsertArgs>(args: Prisma.SelectSubset<T, tournament_typesUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_typesClient<runtime.Types.Result.GetResult<Prisma.$tournament_typesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_typesCountArgs>(args?: Prisma.Subset<T, tournament_typesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_typesCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_typesAggregateArgs>(args: Prisma.Subset<T, Tournament_typesAggregateArgs>): Prisma.PrismaPromise<GetTournament_typesAggregateType<T>>;
    groupBy<T extends tournament_typesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_typesGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_typesGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_typesFieldRefs;
}
export interface Prisma__tournament_typesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tournaments<T extends Prisma.tournament_types$tournamentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_types$tournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournamentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_typesFieldRefs {
    readonly id: Prisma.FieldRef<"tournament_types", 'BigInt'>;
    readonly name: Prisma.FieldRef<"tournament_types", 'String'>;
    readonly description: Prisma.FieldRef<"tournament_types", 'String'>;
    readonly min_players_per_team: Prisma.FieldRef<"tournament_types", 'Int'>;
    readonly max_players_per_team: Prisma.FieldRef<"tournament_types", 'Int'>;
    readonly instructions: Prisma.FieldRef<"tournament_types", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_types", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"tournament_types", 'DateTime'>;
}
export type tournament_typesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where: Prisma.tournament_typesWhereUniqueInput;
};
export type tournament_typesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where: Prisma.tournament_typesWhereUniqueInput;
};
export type tournament_typesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where?: Prisma.tournament_typesWhereInput;
    orderBy?: Prisma.tournament_typesOrderByWithRelationInput | Prisma.tournament_typesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_typesScalarFieldEnum | Prisma.Tournament_typesScalarFieldEnum[];
};
export type tournament_typesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where?: Prisma.tournament_typesWhereInput;
    orderBy?: Prisma.tournament_typesOrderByWithRelationInput | Prisma.tournament_typesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_typesScalarFieldEnum | Prisma.Tournament_typesScalarFieldEnum[];
};
export type tournament_typesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where?: Prisma.tournament_typesWhereInput;
    orderBy?: Prisma.tournament_typesOrderByWithRelationInput | Prisma.tournament_typesOrderByWithRelationInput[];
    cursor?: Prisma.tournament_typesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_typesScalarFieldEnum | Prisma.Tournament_typesScalarFieldEnum[];
};
export type tournament_typesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_typesCreateInput, Prisma.tournament_typesUncheckedCreateInput>;
};
export type tournament_typesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_typesCreateManyInput | Prisma.tournament_typesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_typesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    data: Prisma.tournament_typesCreateManyInput | Prisma.tournament_typesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_typesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_typesUpdateInput, Prisma.tournament_typesUncheckedUpdateInput>;
    where: Prisma.tournament_typesWhereUniqueInput;
};
export type tournament_typesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_typesUpdateManyMutationInput, Prisma.tournament_typesUncheckedUpdateManyInput>;
    where?: Prisma.tournament_typesWhereInput;
    limit?: number;
};
export type tournament_typesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_typesUpdateManyMutationInput, Prisma.tournament_typesUncheckedUpdateManyInput>;
    where?: Prisma.tournament_typesWhereInput;
    limit?: number;
};
export type tournament_typesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where: Prisma.tournament_typesWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_typesCreateInput, Prisma.tournament_typesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_typesUpdateInput, Prisma.tournament_typesUncheckedUpdateInput>;
};
export type tournament_typesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
    where: Prisma.tournament_typesWhereUniqueInput;
};
export type tournament_typesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_typesWhereInput;
    limit?: number;
};
export type tournament_types$tournamentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournamentsSelect<ExtArgs> | null;
    omit?: Prisma.tournamentsOmit<ExtArgs> | null;
    include?: Prisma.tournamentsInclude<ExtArgs> | null;
    where?: Prisma.tournamentsWhereInput;
    orderBy?: Prisma.tournamentsOrderByWithRelationInput | Prisma.tournamentsOrderByWithRelationInput[];
    cursor?: Prisma.tournamentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TournamentsScalarFieldEnum | Prisma.TournamentsScalarFieldEnum[];
};
export type tournament_typesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_typesSelect<ExtArgs> | null;
    omit?: Prisma.tournament_typesOmit<ExtArgs> | null;
    include?: Prisma.tournament_typesInclude<ExtArgs> | null;
};
