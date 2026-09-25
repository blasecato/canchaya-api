"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortOrder = exports.UsersScalarFieldEnum = exports.User_rolesScalarFieldEnum = exports.TournamentsScalarFieldEnum = exports.Tournament_typesScalarFieldEnum = exports.Tournament_lifecycle_eventsScalarFieldEnum = exports.Tournament_registration_eventsScalarFieldEnum = exports.Notification_preferencesScalarFieldEnum = exports.NotificationsScalarFieldEnum = exports.Tournament_team_registrationsScalarFieldEnum = exports.Tournament_team_playersScalarFieldEnum = exports.Tournament_sponsorsScalarFieldEnum = exports.Tournament_refereesScalarFieldEnum = exports.Tournament_administratorsScalarFieldEnum = exports.TeamsScalarFieldEnum = exports.Team_membersScalarFieldEnum = exports.Disciplinary_eventsScalarFieldEnum = exports.Disciplinary_appealsScalarFieldEnum = exports.SuspensionsScalarFieldEnum = exports.SponsorsScalarFieldEnum = exports.RolesScalarFieldEnum = exports.Player_match_statsScalarFieldEnum = exports.Referee_assignment_eventsScalarFieldEnum = exports.Referee_availabilityScalarFieldEnum = exports.MatchesScalarFieldEnum = exports.Match_refereesScalarFieldEnum = exports.FinesScalarFieldEnum = exports.Disciplinary_actionsScalarFieldEnum = exports.AssociationsScalarFieldEnum = exports.Association_administratorsScalarFieldEnum = exports.Auth_sessionsScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    auth_sessions: 'auth_sessions',
    association_administrators: 'association_administrators',
    associations: 'associations',
    disciplinary_actions: 'disciplinary_actions',
    fines: 'fines',
    match_referees: 'match_referees',
    matches: 'matches',
    referee_availability: 'referee_availability',
    referee_assignment_events: 'referee_assignment_events',
    player_match_stats: 'player_match_stats',
    roles: 'roles',
    sponsors: 'sponsors',
    suspensions: 'suspensions',
    disciplinary_appeals: 'disciplinary_appeals',
    disciplinary_events: 'disciplinary_events',
    team_members: 'team_members',
    teams: 'teams',
    tournament_administrators: 'tournament_administrators',
    tournament_referees: 'tournament_referees',
    tournament_sponsors: 'tournament_sponsors',
    tournament_team_players: 'tournament_team_players',
    tournament_team_registrations: 'tournament_team_registrations',
    notifications: 'notifications',
    notification_preferences: 'notification_preferences',
    tournament_registration_events: 'tournament_registration_events',
    tournament_lifecycle_events: 'tournament_lifecycle_events',
    tournament_types: 'tournament_types',
    tournaments: 'tournaments',
    user_roles: 'user_roles',
    users: 'users'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Auth_sessionsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    jti_hash: 'jti_hash',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at',
    created_at: 'created_at'
};
exports.Association_administratorsScalarFieldEnum = {
    association_id: 'association_id',
    user_id: 'user_id',
    permission_level: 'permission_level',
    status: 'status',
    created_at: 'created_at'
};
exports.AssociationsScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    city: 'city',
    address: 'address',
    tax_id: 'tax_id',
    email: 'email',
    phone: 'phone',
    logo_url: 'logo_url',
    logo_public_id: 'logo_public_id',
    cover_url: 'cover_url',
    cover_public_id: 'cover_public_id',
    owner_user_id: 'owner_user_id',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Disciplinary_actionsScalarFieldEnum = {
    id: 'id',
    tournament_id: 'tournament_id',
    match_id: 'match_id',
    team_id: 'team_id',
    player_id: 'player_id',
    card_type: 'card_type',
    reason: 'reason',
    occurred_at: 'occurred_at',
    reported_by: 'reported_by',
    decision_status: 'decision_status',
    review_started_by: 'review_started_by',
    review_started_at: 'review_started_at',
    decided_by: 'decided_by',
    decided_at: 'decided_at',
    decision_notes: 'decision_notes',
    appeal_deadline: 'appeal_deadline',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.FinesScalarFieldEnum = {
    id: 'id',
    disciplinary_action_id: 'disciplinary_action_id',
    amount: 'amount',
    currency_code: 'currency_code',
    due_date: 'due_date',
    payment_status: 'payment_status',
    paid_at: 'paid_at',
    payment_reference: 'payment_reference',
    notes: 'notes',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Match_refereesScalarFieldEnum = {
    match_id: 'match_id',
    tournament_id: 'tournament_id',
    referee_id: 'referee_id',
    referee_role: 'referee_role',
    assignment_status: 'assignment_status',
    assigned_by: 'assigned_by',
    responded_at: 'responded_at',
    response_notes: 'response_notes',
    replaced_referee_id: 'replaced_referee_id',
    replacement_reason: 'replacement_reason',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.MatchesScalarFieldEnum = {
    id: 'id',
    tournament_id: 'tournament_id',
    competition_key: 'competition_key',
    home_penalties: 'home_penalties',
    away_penalties: 'away_penalties',
    home_team_id: 'home_team_id',
    away_team_id: 'away_team_id',
    match_date: 'match_date',
    venue: 'venue',
    stage: 'stage',
    round_number: 'round_number',
    home_score: 'home_score',
    away_score: 'away_score',
    status: 'status',
    duration_minutes: 'duration_minutes',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Referee_availabilityScalarFieldEnum = {
    id: 'id',
    referee_id: 'referee_id',
    starts_at: 'starts_at',
    ends_at: 'ends_at',
    notes: 'notes',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Referee_assignment_eventsScalarFieldEnum = {
    id: 'id',
    match_id: 'match_id',
    referee_id: 'referee_id',
    actor_user_id: 'actor_user_id',
    event_type: 'event_type',
    previous_status: 'previous_status',
    new_status: 'new_status',
    reason: 'reason',
    created_at: 'created_at'
};
exports.Player_match_statsScalarFieldEnum = {
    id: 'id',
    match_id: 'match_id',
    tournament_id: 'tournament_id',
    team_id: 'team_id',
    player_id: 'player_id',
    goals: 'goals',
    assists: 'assists',
    yellow_cards: 'yellow_cards',
    red_cards: 'red_cards',
    minutes_played: 'minutes_played',
    created_at: 'created_at'
};
exports.RolesScalarFieldEnum = {
    code: 'code',
    name: 'name',
    description: 'description',
    created_at: 'created_at'
};
exports.SponsorsScalarFieldEnum = {
    id: 'id',
    name: 'name',
    tax_id: 'tax_id',
    contact_name: 'contact_name',
    email: 'email',
    phone: 'phone',
    website_url: 'website_url',
    logo_url: 'logo_url',
    logo_public_id: 'logo_public_id',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.SuspensionsScalarFieldEnum = {
    id: 'id',
    disciplinary_action_id: 'disciplinary_action_id',
    matches_count: 'matches_count',
    start_date: 'start_date',
    end_date: 'end_date',
    reason: 'reason',
    status: 'status',
    served_matches: 'served_matches',
    completed_at: 'completed_at',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Disciplinary_appealsScalarFieldEnum = {
    id: 'id',
    disciplinary_action_id: 'disciplinary_action_id',
    player_id: 'player_id',
    message: 'message',
    status: 'status',
    reviewed_by: 'reviewed_by',
    reviewed_at: 'reviewed_at',
    resolution_notes: 'resolution_notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Disciplinary_eventsScalarFieldEnum = {
    id: 'id',
    disciplinary_action_id: 'disciplinary_action_id',
    actor_user_id: 'actor_user_id',
    event_type: 'event_type',
    message: 'message',
    metadata: 'metadata',
    created_at: 'created_at'
};
exports.Team_membersScalarFieldEnum = {
    team_id: 'team_id',
    user_id: 'user_id',
    member_role: 'member_role',
    status: 'status',
    created_at: 'created_at'
};
exports.TeamsScalarFieldEnum = {
    id: 'id',
    name: 'name',
    sport_type: 'sport_type',
    modality: 'modality',
    primary_color: 'primary_color',
    secondary_color: 'secondary_color',
    captain_user_id: 'captain_user_id',
    created_by: 'created_by',
    photo_url: 'photo_url',
    photo_public_id: 'photo_public_id',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Tournament_administratorsScalarFieldEnum = {
    tournament_id: 'tournament_id',
    user_id: 'user_id',
    permission_level: 'permission_level',
    status: 'status',
    created_at: 'created_at'
};
exports.Tournament_refereesScalarFieldEnum = {
    tournament_id: 'tournament_id',
    user_id: 'user_id',
    certification_number: 'certification_number',
    category: 'category',
    status: 'status',
    created_at: 'created_at'
};
exports.Tournament_sponsorsScalarFieldEnum = {
    tournament_id: 'tournament_id',
    sponsor_id: 'sponsor_id',
    sponsorship_level: 'sponsorship_level',
    contribution_type: 'contribution_type',
    contribution_amount: 'contribution_amount',
    currency_code: 'currency_code',
    contribution_description: 'contribution_description',
    agreement_start_date: 'agreement_start_date',
    agreement_end_date: 'agreement_end_date',
    status: 'status',
    created_at: 'created_at'
};
exports.Tournament_team_playersScalarFieldEnum = {
    tournament_id: 'tournament_id',
    team_id: 'team_id',
    player_id: 'player_id',
    jersey_number: 'jersey_number',
    position: 'position',
    is_captain: 'is_captain',
    registration_status: 'registration_status',
    created_at: 'created_at'
};
exports.Tournament_team_registrationsScalarFieldEnum = {
    tournament_id: 'tournament_id',
    association_id: 'association_id',
    team_id: 'team_id',
    requested_by: 'requested_by',
    request_status: 'request_status',
    reviewed_by: 'reviewed_by',
    review_notes: 'review_notes',
    reviewed_at: 'reviewed_at',
    payment_status: 'payment_status',
    amount_paid: 'amount_paid',
    payment_notes: 'payment_notes',
    payment_updated_by: 'payment_updated_by',
    payment_updated_at: 'payment_updated_at',
    group_name: 'group_name',
    seed: 'seed',
    points: 'points',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.NotificationsScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    type: 'type',
    event_code: 'event_code',
    deduplication_key: 'deduplication_key',
    title: 'title',
    message: 'message',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    metadata: 'metadata',
    scheduled_for: 'scheduled_for',
    read_at: 'read_at',
    created_at: 'created_at'
};
exports.Notification_preferencesScalarFieldEnum = {
    user_id: 'user_id',
    match_scheduled_enabled: 'match_scheduled_enabled',
    match_updates_enabled: 'match_updates_enabled',
    match_reminders_enabled: 'match_reminders_enabled',
    reminder_hours_before: 'reminder_hours_before',
    email_enabled: 'email_enabled',
    whatsapp_enabled: 'whatsapp_enabled',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.Tournament_registration_eventsScalarFieldEnum = {
    id: 'id',
    tournament_id: 'tournament_id',
    team_id: 'team_id',
    actor_user_id: 'actor_user_id',
    event_type: 'event_type',
    message: 'message',
    created_at: 'created_at'
};
exports.Tournament_lifecycle_eventsScalarFieldEnum = {
    id: 'id',
    tournament_id: 'tournament_id',
    actor_user_id: 'actor_user_id',
    from_phase: 'from_phase',
    to_phase: 'to_phase',
    reason: 'reason',
    created_at: 'created_at'
};
exports.Tournament_typesScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    min_players_per_team: 'min_players_per_team',
    max_players_per_team: 'max_players_per_team',
    instructions: 'instructions',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.TournamentsScalarFieldEnum = {
    id: 'id',
    association_id: 'association_id',
    name: 'name',
    competition_plan: 'competition_plan',
    description: 'description',
    tournament_type_id: 'tournament_type_id',
    sport_type: 'sport_type',
    modality: 'modality',
    category_name: 'category_name',
    category_min_age: 'category_min_age',
    category_max_age: 'category_max_age',
    category_gender: 'category_gender',
    start_date: 'start_date',
    end_date: 'end_date',
    registration_start_date: 'registration_start_date',
    registration_end_date: 'registration_end_date',
    registration_fee: 'registration_fee',
    currency_code: 'currency_code',
    grand_prize: 'grand_prize',
    second_prize: 'second_prize',
    third_prize: 'third_prize',
    max_teams: 'max_teams',
    min_players_per_team: 'min_players_per_team',
    max_players_per_team: 'max_players_per_team',
    location_name: 'location_name',
    location_address: 'location_address',
    rules_url: 'rules_url',
    rules_content: 'rules_content',
    photo_url: 'photo_url',
    photo_public_id: 'photo_public_id',
    phase: 'phase',
    status: 'status',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.User_rolesScalarFieldEnum = {
    user_id: 'user_id',
    role_code: 'role_code',
    created_at: 'created_at'
};
exports.UsersScalarFieldEnum = {
    id: 'id',
    id_number: 'id_number',
    document_type: 'document_type',
    full_name: 'full_name',
    birth_date: 'birth_date',
    birth_city: 'birth_city',
    gender: 'gender',
    email: 'email',
    phone: 'phone',
    photo_url: 'photo_url',
    photo_public_id: 'photo_public_id',
    document_front_url: 'document_front_url',
    document_front_public_id: 'document_front_public_id',
    document_front_format: 'document_front_format',
    document_back_url: 'document_back_url',
    document_back_public_id: 'document_back_public_id',
    document_back_format: 'document_back_format',
    identity_verified_at: 'identity_verified_at',
    identity_verification_status: 'identity_verification_status',
    identity_verification_details: 'identity_verification_details',
    identity_verification_checked_at: 'identity_verification_checked_at',
    password_hash: 'password_hash',
    status: 'status',
    blocked_until: 'blocked_until',
    block_reason: 'block_reason',
    blocked_by: 'blocked_by',
    block_source_action_id: 'block_source_action_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map