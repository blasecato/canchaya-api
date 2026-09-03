import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type tournament_registration_eventsModel = runtime.Types.Result.DefaultSelection<Prisma.$tournament_registration_eventsPayload>;
export type AggregateTournament_registration_events = {
    _count: Tournament_registration_eventsCountAggregateOutputType | null;
    _avg: Tournament_registration_eventsAvgAggregateOutputType | null;
    _sum: Tournament_registration_eventsSumAggregateOutputType | null;
    _min: Tournament_registration_eventsMinAggregateOutputType | null;
    _max: Tournament_registration_eventsMaxAggregateOutputType | null;
};
export type Tournament_registration_eventsAvgAggregateOutputType = {
    id: number | null;
    tournament_id: number | null;
    team_id: number | null;
    actor_user_id: number | null;
};
export type Tournament_registration_eventsSumAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    actor_user_id: bigint | null;
};
export type Tournament_registration_eventsMinAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Tournament_registration_eventsMaxAggregateOutputType = {
    id: bigint | null;
    tournament_id: bigint | null;
    team_id: bigint | null;
    actor_user_id: bigint | null;
    event_type: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Tournament_registration_eventsCountAggregateOutputType = {
    id: number;
    tournament_id: number;
    team_id: number;
    actor_user_id: number;
    event_type: number;
    message: number;
    created_at: number;
    _all: number;
};
export type Tournament_registration_eventsAvgAggregateInputType = {
    id?: true;
    tournament_id?: true;
    team_id?: true;
    actor_user_id?: true;
};
export type Tournament_registration_eventsSumAggregateInputType = {
    id?: true;
    tournament_id?: true;
    team_id?: true;
    actor_user_id?: true;
};
export type Tournament_registration_eventsMinAggregateInputType = {
    id?: true;
    tournament_id?: true;
    team_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    created_at?: true;
};
export type Tournament_registration_eventsMaxAggregateInputType = {
    id?: true;
    tournament_id?: true;
    team_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    created_at?: true;
};
export type Tournament_registration_eventsCountAggregateInputType = {
    id?: true;
    tournament_id?: true;
    team_id?: true;
    actor_user_id?: true;
    event_type?: true;
    message?: true;
    created_at?: true;
    _all?: true;
};
export type Tournament_registration_eventsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_registration_eventsWhereInput;
    orderBy?: Prisma.tournament_registration_eventsOrderByWithRelationInput | Prisma.tournament_registration_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_registration_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Tournament_registration_eventsCountAggregateInputType;
    _avg?: Tournament_registration_eventsAvgAggregateInputType;
    _sum?: Tournament_registration_eventsSumAggregateInputType;
    _min?: Tournament_registration_eventsMinAggregateInputType;
    _max?: Tournament_registration_eventsMaxAggregateInputType;
};
export type GetTournament_registration_eventsAggregateType<T extends Tournament_registration_eventsAggregateArgs> = {
    [P in keyof T & keyof AggregateTournament_registration_events]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTournament_registration_events[P]> : Prisma.GetScalarType<T[P], AggregateTournament_registration_events[P]>;
};
export type tournament_registration_eventsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_registration_eventsWhereInput;
    orderBy?: Prisma.tournament_registration_eventsOrderByWithAggregationInput | Prisma.tournament_registration_eventsOrderByWithAggregationInput[];
    by: Prisma.Tournament_registration_eventsScalarFieldEnum[] | Prisma.Tournament_registration_eventsScalarFieldEnum;
    having?: Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Tournament_registration_eventsCountAggregateInputType | true;
    _avg?: Tournament_registration_eventsAvgAggregateInputType;
    _sum?: Tournament_registration_eventsSumAggregateInputType;
    _min?: Tournament_registration_eventsMinAggregateInputType;
    _max?: Tournament_registration_eventsMaxAggregateInputType;
};
export type Tournament_registration_eventsGroupByOutputType = {
    id: bigint;
    tournament_id: bigint;
    team_id: bigint;
    actor_user_id: bigint;
    event_type: string;
    message: string | null;
    created_at: Date;
    _count: Tournament_registration_eventsCountAggregateOutputType | null;
    _avg: Tournament_registration_eventsAvgAggregateOutputType | null;
    _sum: Tournament_registration_eventsSumAggregateOutputType | null;
    _min: Tournament_registration_eventsMinAggregateOutputType | null;
    _max: Tournament_registration_eventsMaxAggregateOutputType | null;
};
export type GetTournament_registration_eventsGroupByPayload<T extends tournament_registration_eventsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Tournament_registration_eventsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Tournament_registration_eventsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Tournament_registration_eventsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Tournament_registration_eventsGroupByOutputType[P]>;
}>>;
export type tournament_registration_eventsWhereInput = {
    AND?: Prisma.tournament_registration_eventsWhereInput | Prisma.tournament_registration_eventsWhereInput[];
    OR?: Prisma.tournament_registration_eventsWhereInput[];
    NOT?: Prisma.tournament_registration_eventsWhereInput | Prisma.tournament_registration_eventsWhereInput[];
    id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"tournament_registration_events"> | string;
    message?: Prisma.StringNullableFilter<"tournament_registration_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_registration_events"> | Date | string;
    registration?: Prisma.XOR<Prisma.Tournament_team_registrationsScalarRelationFilter, Prisma.tournament_team_registrationsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type tournament_registration_eventsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    registration?: Prisma.tournament_team_registrationsOrderByWithRelationInput;
    actor?: Prisma.usersOrderByWithRelationInput;
};
export type tournament_registration_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number;
    AND?: Prisma.tournament_registration_eventsWhereInput | Prisma.tournament_registration_eventsWhereInput[];
    OR?: Prisma.tournament_registration_eventsWhereInput[];
    NOT?: Prisma.tournament_registration_eventsWhereInput | Prisma.tournament_registration_eventsWhereInput[];
    tournament_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"tournament_registration_events"> | string;
    message?: Prisma.StringNullableFilter<"tournament_registration_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_registration_events"> | Date | string;
    registration?: Prisma.XOR<Prisma.Tournament_team_registrationsScalarRelationFilter, Prisma.tournament_team_registrationsWhereInput>;
    actor?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type tournament_registration_eventsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    _count?: Prisma.tournament_registration_eventsCountOrderByAggregateInput;
    _avg?: Prisma.tournament_registration_eventsAvgOrderByAggregateInput;
    _max?: Prisma.tournament_registration_eventsMaxOrderByAggregateInput;
    _min?: Prisma.tournament_registration_eventsMinOrderByAggregateInput;
    _sum?: Prisma.tournament_registration_eventsSumOrderByAggregateInput;
};
export type tournament_registration_eventsScalarWhereWithAggregatesInput = {
    AND?: Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput | Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput[];
    OR?: Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput | Prisma.tournament_registration_eventsScalarWhereWithAggregatesInput[];
    id?: Prisma.BigIntWithAggregatesFilter<"tournament_registration_events"> | bigint | number;
    tournament_id?: Prisma.BigIntWithAggregatesFilter<"tournament_registration_events"> | bigint | number;
    team_id?: Prisma.BigIntWithAggregatesFilter<"tournament_registration_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntWithAggregatesFilter<"tournament_registration_events"> | bigint | number;
    event_type?: Prisma.StringWithAggregatesFilter<"tournament_registration_events"> | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"tournament_registration_events"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"tournament_registration_events"> | Date | string;
};
export type tournament_registration_eventsCreateInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
    registration: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_registration_eventsInput;
    actor: Prisma.usersCreateNestedOneWithoutTournament_registration_eventsInput;
};
export type tournament_registration_eventsUncheckedCreateInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    registration?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_registration_eventsNestedInput;
    actor?: Prisma.usersUpdateOneRequiredWithoutTournament_registration_eventsNestedInput;
};
export type tournament_registration_eventsUncheckedUpdateInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsCreateManyInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsUpdateManyMutationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsUncheckedUpdateManyInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type Tournament_registration_eventsListRelationFilter = {
    every?: Prisma.tournament_registration_eventsWhereInput;
    some?: Prisma.tournament_registration_eventsWhereInput;
    none?: Prisma.tournament_registration_eventsWhereInput;
};
export type tournament_registration_eventsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type tournament_registration_eventsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_registration_eventsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type tournament_registration_eventsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_registration_eventsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
    event_type?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type tournament_registration_eventsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tournament_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    actor_user_id?: Prisma.SortOrder;
};
export type tournament_registration_eventsCreateNestedManyWithoutRegistrationInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput> | Prisma.tournament_registration_eventsCreateWithoutRegistrationInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyRegistrationInputEnvelope;
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
};
export type tournament_registration_eventsUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput> | Prisma.tournament_registration_eventsCreateWithoutRegistrationInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyRegistrationInputEnvelope;
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
};
export type tournament_registration_eventsUpdateManyWithoutRegistrationNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput> | Prisma.tournament_registration_eventsCreateWithoutRegistrationInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput[];
    upsert?: Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutRegistrationInput | Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutRegistrationInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyRegistrationInputEnvelope;
    set?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    update?: Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutRegistrationInput | Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutRegistrationInput[];
    updateMany?: Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutRegistrationInput | Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutRegistrationInput[];
    deleteMany?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
};
export type tournament_registration_eventsUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput> | Prisma.tournament_registration_eventsCreateWithoutRegistrationInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutRegistrationInput[];
    upsert?: Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutRegistrationInput | Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutRegistrationInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyRegistrationInputEnvelope;
    set?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    update?: Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutRegistrationInput | Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutRegistrationInput[];
    updateMany?: Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutRegistrationInput | Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutRegistrationInput[];
    deleteMany?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
};
export type tournament_registration_eventsCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_registration_eventsCreateWithoutActorInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
};
export type tournament_registration_eventsUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_registration_eventsCreateWithoutActorInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyActorInputEnvelope;
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
};
export type tournament_registration_eventsUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_registration_eventsCreateWithoutActorInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyActorInputEnvelope;
    set?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    update?: Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutActorInput | Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
};
export type tournament_registration_eventsUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput> | Prisma.tournament_registration_eventsCreateWithoutActorInput[] | Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput | Prisma.tournament_registration_eventsCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutActorInput | Prisma.tournament_registration_eventsUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.tournament_registration_eventsCreateManyActorInputEnvelope;
    set?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    disconnect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    delete?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    connect?: Prisma.tournament_registration_eventsWhereUniqueInput | Prisma.tournament_registration_eventsWhereUniqueInput[];
    update?: Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutActorInput | Prisma.tournament_registration_eventsUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutActorInput | Prisma.tournament_registration_eventsUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
};
export type tournament_registration_eventsCreateWithoutRegistrationInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
    actor: Prisma.usersCreateNestedOneWithoutTournament_registration_eventsInput;
};
export type tournament_registration_eventsUncheckedCreateWithoutRegistrationInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsCreateOrConnectWithoutRegistrationInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput>;
};
export type tournament_registration_eventsCreateManyRegistrationInputEnvelope = {
    data: Prisma.tournament_registration_eventsCreateManyRegistrationInput | Prisma.tournament_registration_eventsCreateManyRegistrationInput[];
    skipDuplicates?: boolean;
};
export type tournament_registration_eventsUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_registration_eventsUpdateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedUpdateWithoutRegistrationInput>;
    create: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutRegistrationInput>;
};
export type tournament_registration_eventsUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateWithoutRegistrationInput, Prisma.tournament_registration_eventsUncheckedUpdateWithoutRegistrationInput>;
};
export type tournament_registration_eventsUpdateManyWithWhereWithoutRegistrationInput = {
    where: Prisma.tournament_registration_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateManyMutationInput, Prisma.tournament_registration_eventsUncheckedUpdateManyWithoutRegistrationInput>;
};
export type tournament_registration_eventsScalarWhereInput = {
    AND?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
    OR?: Prisma.tournament_registration_eventsScalarWhereInput[];
    NOT?: Prisma.tournament_registration_eventsScalarWhereInput | Prisma.tournament_registration_eventsScalarWhereInput[];
    id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    tournament_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    team_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    actor_user_id?: Prisma.BigIntFilter<"tournament_registration_events"> | bigint | number;
    event_type?: Prisma.StringFilter<"tournament_registration_events"> | string;
    message?: Prisma.StringNullableFilter<"tournament_registration_events"> | string | null;
    created_at?: Prisma.DateTimeFilter<"tournament_registration_events"> | Date | string;
};
export type tournament_registration_eventsCreateWithoutActorInput = {
    id?: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
    registration: Prisma.tournament_team_registrationsCreateNestedOneWithoutTournament_registration_eventsInput;
};
export type tournament_registration_eventsUncheckedCreateWithoutActorInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsCreateOrConnectWithoutActorInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput>;
};
export type tournament_registration_eventsCreateManyActorInputEnvelope = {
    data: Prisma.tournament_registration_eventsCreateManyActorInput | Prisma.tournament_registration_eventsCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type tournament_registration_eventsUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    update: Prisma.XOR<Prisma.tournament_registration_eventsUpdateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.tournament_registration_eventsCreateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedCreateWithoutActorInput>;
};
export type tournament_registration_eventsUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateWithoutActorInput, Prisma.tournament_registration_eventsUncheckedUpdateWithoutActorInput>;
};
export type tournament_registration_eventsUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.tournament_registration_eventsScalarWhereInput;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateManyMutationInput, Prisma.tournament_registration_eventsUncheckedUpdateManyWithoutActorInput>;
};
export type tournament_registration_eventsCreateManyRegistrationInput = {
    id?: bigint | number;
    actor_user_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsUpdateWithoutRegistrationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.usersUpdateOneRequiredWithoutTournament_registration_eventsNestedInput;
};
export type tournament_registration_eventsUncheckedUpdateWithoutRegistrationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsUncheckedUpdateManyWithoutRegistrationInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    actor_user_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsCreateManyActorInput = {
    id?: bigint | number;
    tournament_id: bigint | number;
    team_id: bigint | number;
    event_type: string;
    message?: string | null;
    created_at?: Date | string;
};
export type tournament_registration_eventsUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    registration?: Prisma.tournament_team_registrationsUpdateOneRequiredWithoutTournament_registration_eventsNestedInput;
};
export type tournament_registration_eventsUncheckedUpdateWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    tournament_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    team_id?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    event_type?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type tournament_registration_eventsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    created_at?: boolean;
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_registration_events"]>;
export type tournament_registration_eventsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    created_at?: boolean;
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_registration_events"]>;
export type tournament_registration_eventsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    created_at?: boolean;
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tournament_registration_events"]>;
export type tournament_registration_eventsSelectScalar = {
    id?: boolean;
    tournament_id?: boolean;
    team_id?: boolean;
    actor_user_id?: boolean;
    event_type?: boolean;
    message?: boolean;
    created_at?: boolean;
};
export type tournament_registration_eventsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tournament_id" | "team_id" | "actor_user_id" | "event_type" | "message" | "created_at", ExtArgs["result"]["tournament_registration_events"]>;
export type tournament_registration_eventsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_registration_eventsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type tournament_registration_eventsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    registration?: boolean | Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $tournament_registration_eventsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "tournament_registration_events";
    objects: {
        registration: Prisma.$tournament_team_registrationsPayload<ExtArgs>;
        actor: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: bigint;
        tournament_id: bigint;
        team_id: bigint;
        actor_user_id: bigint;
        event_type: string;
        message: string | null;
        created_at: Date;
    }, ExtArgs["result"]["tournament_registration_events"]>;
    composites: {};
};
export type tournament_registration_eventsGetPayload<S extends boolean | null | undefined | tournament_registration_eventsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload, S>;
export type tournament_registration_eventsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<tournament_registration_eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Tournament_registration_eventsCountAggregateInputType | true;
};
export interface tournament_registration_eventsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['tournament_registration_events'];
        meta: {
            name: 'tournament_registration_events';
        };
    };
    findUnique<T extends tournament_registration_eventsFindUniqueArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends tournament_registration_eventsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends tournament_registration_eventsFindFirstArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsFindFirstArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends tournament_registration_eventsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends tournament_registration_eventsFindManyArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends tournament_registration_eventsCreateArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsCreateArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends tournament_registration_eventsCreateManyArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends tournament_registration_eventsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends tournament_registration_eventsDeleteArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsDeleteArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends tournament_registration_eventsUpdateArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsUpdateArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends tournament_registration_eventsDeleteManyArgs>(args?: Prisma.SelectSubset<T, tournament_registration_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends tournament_registration_eventsUpdateManyArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends tournament_registration_eventsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends tournament_registration_eventsUpsertArgs>(args: Prisma.SelectSubset<T, tournament_registration_eventsUpsertArgs<ExtArgs>>): Prisma.Prisma__tournament_registration_eventsClient<runtime.Types.Result.GetResult<Prisma.$tournament_registration_eventsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends tournament_registration_eventsCountArgs>(args?: Prisma.Subset<T, tournament_registration_eventsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Tournament_registration_eventsCountAggregateOutputType> : number>;
    aggregate<T extends Tournament_registration_eventsAggregateArgs>(args: Prisma.Subset<T, Tournament_registration_eventsAggregateArgs>): Prisma.PrismaPromise<GetTournament_registration_eventsAggregateType<T>>;
    groupBy<T extends tournament_registration_eventsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: tournament_registration_eventsGroupByArgs['orderBy'];
    } : {
        orderBy?: tournament_registration_eventsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, tournament_registration_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournament_registration_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: tournament_registration_eventsFieldRefs;
}
export interface Prisma__tournament_registration_eventsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    registration<T extends Prisma.tournament_team_registrationsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.tournament_team_registrationsDefaultArgs<ExtArgs>>): Prisma.Prisma__tournament_team_registrationsClient<runtime.Types.Result.GetResult<Prisma.$tournament_team_registrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface tournament_registration_eventsFieldRefs {
    readonly id: Prisma.FieldRef<"tournament_registration_events", 'BigInt'>;
    readonly tournament_id: Prisma.FieldRef<"tournament_registration_events", 'BigInt'>;
    readonly team_id: Prisma.FieldRef<"tournament_registration_events", 'BigInt'>;
    readonly actor_user_id: Prisma.FieldRef<"tournament_registration_events", 'BigInt'>;
    readonly event_type: Prisma.FieldRef<"tournament_registration_events", 'String'>;
    readonly message: Prisma.FieldRef<"tournament_registration_events", 'String'>;
    readonly created_at: Prisma.FieldRef<"tournament_registration_events", 'DateTime'>;
}
export type tournament_registration_eventsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
};
export type tournament_registration_eventsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
};
export type tournament_registration_eventsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_registration_eventsWhereInput;
    orderBy?: Prisma.tournament_registration_eventsOrderByWithRelationInput | Prisma.tournament_registration_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_registration_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_registration_eventsScalarFieldEnum | Prisma.Tournament_registration_eventsScalarFieldEnum[];
};
export type tournament_registration_eventsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_registration_eventsWhereInput;
    orderBy?: Prisma.tournament_registration_eventsOrderByWithRelationInput | Prisma.tournament_registration_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_registration_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_registration_eventsScalarFieldEnum | Prisma.Tournament_registration_eventsScalarFieldEnum[];
};
export type tournament_registration_eventsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where?: Prisma.tournament_registration_eventsWhereInput;
    orderBy?: Prisma.tournament_registration_eventsOrderByWithRelationInput | Prisma.tournament_registration_eventsOrderByWithRelationInput[];
    cursor?: Prisma.tournament_registration_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Tournament_registration_eventsScalarFieldEnum | Prisma.Tournament_registration_eventsScalarFieldEnum[];
};
export type tournament_registration_eventsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_registration_eventsCreateInput, Prisma.tournament_registration_eventsUncheckedCreateInput>;
};
export type tournament_registration_eventsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.tournament_registration_eventsCreateManyInput | Prisma.tournament_registration_eventsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type tournament_registration_eventsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    data: Prisma.tournament_registration_eventsCreateManyInput | Prisma.tournament_registration_eventsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.tournament_registration_eventsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type tournament_registration_eventsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateInput, Prisma.tournament_registration_eventsUncheckedUpdateInput>;
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
};
export type tournament_registration_eventsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateManyMutationInput, Prisma.tournament_registration_eventsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_registration_eventsWhereInput;
    limit?: number;
};
export type tournament_registration_eventsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.tournament_registration_eventsUpdateManyMutationInput, Prisma.tournament_registration_eventsUncheckedUpdateManyInput>;
    where?: Prisma.tournament_registration_eventsWhereInput;
    limit?: number;
    include?: Prisma.tournament_registration_eventsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type tournament_registration_eventsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
    create: Prisma.XOR<Prisma.tournament_registration_eventsCreateInput, Prisma.tournament_registration_eventsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.tournament_registration_eventsUpdateInput, Prisma.tournament_registration_eventsUncheckedUpdateInput>;
};
export type tournament_registration_eventsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
    where: Prisma.tournament_registration_eventsWhereUniqueInput;
};
export type tournament_registration_eventsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.tournament_registration_eventsWhereInput;
    limit?: number;
};
export type tournament_registration_eventsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.tournament_registration_eventsSelect<ExtArgs> | null;
    omit?: Prisma.tournament_registration_eventsOmit<ExtArgs> | null;
    include?: Prisma.tournament_registration_eventsInclude<ExtArgs> | null;
};
