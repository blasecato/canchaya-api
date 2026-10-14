/**
 * Clave temporal de los jugadores cargados en bloque. Se puede cambiar con
 * BULK_PLAYER_TEMPORARY_PASSWORD sin tocar el código; el jugador debería
 * cambiarla desde su perfil apenas entre.
 */
const DEFAULT_TEMPORARY_PASSWORD = 'Asprofutpi2026*';

export function getTemporaryPlayerPassword(): string {
  const configured = process.env.BULK_PLAYER_TEMPORARY_PASSWORD?.trim();
  return configured && configured.length >= 8
    ? configured
    : DEFAULT_TEMPORARY_PASSWORD;
}
