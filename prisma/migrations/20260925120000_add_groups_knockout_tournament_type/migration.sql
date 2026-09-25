INSERT INTO "public"."tournament_types" (
  "name",
  "description",
  "min_players_per_team",
  "max_players_per_team",
  "instructions",
  "created_at",
  "updated_at"
)
SELECT
  'Fase de grupos + eliminación directa',
  'Grupos de igual tamaño con partidos todos contra todos, seguidos por un cuadro de eliminación directa con final y partido por el tercer puesto.',
  1,
  25,
  'El número de equipos por grupo y los clasificados por grupo deben producir 2, 4, 8, 16 o 32 equipos para la fase eliminatoria.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1
  FROM "public"."tournament_types"
  WHERE LOWER("name") = LOWER('Fase de grupos + eliminación directa')
);
