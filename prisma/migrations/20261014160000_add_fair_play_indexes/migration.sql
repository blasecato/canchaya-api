-- Conteo de tarjetas por equipo (premio al juego limpio).
-- Las tarjetas ya se guardan por jugador y partido; lo que faltaba era poder
-- agruparlas por torneo y equipo sin recorrer la tabla completa.
CREATE INDEX IF NOT EXISTS player_match_stats_tournament_team_idx
  ON player_match_stats (tournament_id, team_id);

CREATE INDEX IF NOT EXISTS disciplinary_actions_tournament_team_idx
  ON disciplinary_actions (tournament_id, team_id);
