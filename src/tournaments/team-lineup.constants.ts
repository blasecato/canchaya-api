import { createHash } from 'node:crypto';

/**
 * Formaciones lógicas por modalidad de fútbol (arquero + líneas de campo).
 * Ninguna línea supera los 4 jugadores.
 */
export const FORMATIONS_BY_PLAYERS: Readonly<Record<number, readonly string[]>> =
  {
    5: ['2-2', '1-2-1', '2-1-1', '1-1-2', '3-1'],
    6: ['2-2-1', '2-1-2', '3-1-1', '1-3-1', '1-2-2'],
    7: ['2-3-1', '3-2-1', '2-2-2', '3-1-2', '1-3-2', '2-1-3'],
    8: ['3-3-1', '3-2-2', '2-3-2', '2-4-1', '4-2-1', '3-1-3'],
    9: ['3-3-2', '3-4-1', '4-3-1', '4-2-2', '2-4-2', '3-2-3'],
    10: ['4-3-2', '3-4-2', '4-4-1', '3-3-3', '4-2-3', '3-2-4'],
    11: [
      '4-4-2',
      '4-3-3',
      '4-2-3-1',
      '3-4-3',
      '4-1-3-2',
      '4-3-1-2',
      '3-4-1-2',
      '3-3-2-2',
    ],
  };

export function parsePlayersOnPitch(modality: string | null | undefined): number {
  if (!modality) return 11;
  const match = modality.match(/\b(5|6|7|8|9|10|11)\b/);
  if (!match) return 11;
  const parsed = Number(match[1]);
  return parsed >= 5 && parsed <= 11 ? parsed : 11;
}

export function getFormationsForModality(playersOnPitch: number): readonly string[] {
  return FORMATIONS_BY_PLAYERS[playersOnPitch] ?? FORMATIONS_BY_PLAYERS[11];
}

export function buildSlotKeysForFormation(formation: string): string[] {
  const lines = formation.split('-').map((n) => Number(n));
  const keys = ['gk'];
  lines.forEach((count, lineIdx) => {
    for (let i = 0; i < count; i++) {
      keys.push(`l${lineIdx}-${i}`);
    }
  });
  return keys;
}

export function extractFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return 'Jugador';
  return trimmed.split(/\s+/)[0];
}

/**
 * Asigna un dorsal disponible entre 1 y 99 de forma determinística (aleatoria
 * pero estable entre recargas) cuando el jugador no tiene dorsal registrado.
 */
export function assignFallbackJerseyNumber(
  seedKey: string,
  usedNumbers: Set<number>,
): number {
  const digest = createHash('sha256').update(seedKey).digest();
  const start = (digest.readUInt16BE(0) % 99) + 1;
  for (let offset = 0; offset < 99; offset++) {
    const candidate = ((start - 1 + offset) % 99) + 1;
    if (!usedNumbers.has(candidate)) {
      usedNumbers.add(candidate);
      return candidate;
    }
  }
  return 99;
}
