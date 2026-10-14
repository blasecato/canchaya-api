"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROSTER_POSITIONS_LABEL = exports.resolveRosterPosition = exports.ROSTER_POSITIONS = void 0;
exports.ROSTER_POSITIONS = [
    'Arquero',
    'Defensa',
    'Lateral',
    'Mediocampista',
    'Extremo',
    'Delantero',
];
const ALIASES = {
    arquero: 'Arquero',
    portero: 'Arquero',
    golero: 'Arquero',
    guardameta: 'Arquero',
    arq: 'Arquero',
    gk: 'Arquero',
    defensa: 'Defensa',
    defensor: 'Defensa',
    central: 'Defensa',
    'defensa central': 'Defensa',
    zaguero: 'Defensa',
    def: 'Defensa',
    lateral: 'Lateral',
    'lateral derecho': 'Lateral',
    'lateral izquierdo': 'Lateral',
    carrilero: 'Lateral',
    mediocampista: 'Mediocampista',
    medio: 'Mediocampista',
    mediocentro: 'Mediocampista',
    centrocampista: 'Mediocampista',
    volante: 'Mediocampista',
    'volante de marca': 'Mediocampista',
    'volante de creacion': 'Mediocampista',
    pivote: 'Mediocampista',
    extremo: 'Extremo',
    'extremo derecho': 'Extremo',
    'extremo izquierdo': 'Extremo',
    puntero: 'Extremo',
    wing: 'Extremo',
    delantero: 'Delantero',
    atacante: 'Delantero',
    punta: 'Delantero',
    'centro delantero': 'Delantero',
    goleador: 'Delantero',
};
const normalize = (value) => value
    .trim()
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ');
const resolveRosterPosition = (value) => (value ? (ALIASES[normalize(value)] ?? null) : null);
exports.resolveRosterPosition = resolveRosterPosition;
exports.ROSTER_POSITIONS_LABEL = exports.ROSTER_POSITIONS.join(', ');
//# sourceMappingURL=roster-positions.constants.js.map