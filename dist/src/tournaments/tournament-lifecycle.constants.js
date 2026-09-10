"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOURNAMENT_TERMINAL_PHASES = exports.TOURNAMENT_CANCELLABLE_PHASES = exports.TOURNAMENT_FORWARD_TRANSITIONS = exports.TOURNAMENT_PHASE_LABELS = exports.ACTIVE_TOURNAMENT_PHASES = exports.PUBLIC_TOURNAMENT_PHASES = exports.TOURNAMENT_PHASES = void 0;
exports.isTournamentPhase = isTournamentPhase;
exports.TOURNAMENT_PHASES = [
    'draft',
    'registration',
    'validation',
    'scheduled',
    'in_progress',
    'finished',
    'archived',
    'cancelled',
];
exports.PUBLIC_TOURNAMENT_PHASES = [
    'registration',
    'validation',
    'scheduled',
    'in_progress',
    'finished',
];
exports.ACTIVE_TOURNAMENT_PHASES = [
    'registration',
    'in_progress',
];
exports.TOURNAMENT_PHASE_LABELS = {
    draft: 'Borrador',
    registration: 'Inscripciones',
    validation: 'Validación',
    scheduled: 'Programado',
    in_progress: 'En curso',
    finished: 'Finalizado',
    archived: 'Archivado',
    cancelled: 'Cancelado',
};
exports.TOURNAMENT_FORWARD_TRANSITIONS = {
    draft: 'registration',
    registration: 'validation',
    validation: 'scheduled',
    scheduled: 'in_progress',
    in_progress: 'finished',
    finished: 'archived',
};
exports.TOURNAMENT_CANCELLABLE_PHASES = [
    'draft',
    'registration',
    'validation',
    'scheduled',
    'in_progress',
];
exports.TOURNAMENT_TERMINAL_PHASES = [
    'finished',
    'archived',
    'cancelled',
];
function isTournamentPhase(value) {
    return exports.TOURNAMENT_PHASES.includes(value);
}
//# sourceMappingURL=tournament-lifecycle.constants.js.map