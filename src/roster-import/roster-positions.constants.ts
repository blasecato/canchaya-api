/**
 * Posiciones aceptadas en la plantilla. Se guarda siempre la etiqueta
 * canónica, pero se reconocen los nombres que la gente usa en la cancha.
 */
export const ROSTER_POSITIONS = [
  'Arquero',
  'Defensa',
  'Lateral',
  'Mediocampista',
  'Extremo',
  'Delantero',
] as const;

export type RosterPosition = (typeof ROSTER_POSITIONS)[number];

const ALIASES: Record<string, RosterPosition> = {
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

/** Quita tildes y espacios de más para comparar como escribe la gente. */
const normalize = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ');

export const resolveRosterPosition = (
  value: string | null | undefined,
): RosterPosition | null => (value ? (ALIASES[normalize(value)] ?? null) : null);

export const ROSTER_POSITIONS_LABEL = ROSTER_POSITIONS.join(', ');
