-- Catálogo completo de tipos de torneo/fase componibles para producción (idempotente)

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
  'Liga',
  'Todos los equipos juegan todos contra todos en una tabla única de puntos.',
  1,
  25,
  'Puede usarse como torneo completo o como fase inicial o intermedia antes de grupos, cruces directos o eliminación.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "public"."tournament_types" WHERE LOWER("name") = LOWER('Liga')
);

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
  'Fase de grupos',
  'Equipos divididos en dos o más grupos independientes con partidos todos contra todos dentro de cada grupo.',
  1,
  25,
  'Cada grupo debe tener al menos 3 equipos. Los clasificados pasan con puntos reiniciados a la siguiente fase.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "public"."tournament_types" WHERE LOWER("name") = LOWER('Fase de grupos')
);

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
  'Cruces directos (Bloques A vs B)',
  'Ronda de cruces a partido único dividiendo los clasificados en dos bloques iguales (A1 vs B1, A2 vs B2...), con opción de mejores perdedores para completar el siguiente cuadro.',
  1,
  25,
  'Requiere una cantidad par de equipos (mínimo 4). Permite sumar mejores perdedores para llegar a 2, 4, 8, 16 o 32 equipos.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "public"."tournament_types" WHERE LOWER("name") = LOWER('Cruces directos (Bloques A vs B)')
);

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
  'Eliminación directa',
  'Llaves eliminatorias a partido único (cuartos, semifinales, final y tercer puesto opcional) hasta definir al campeón.',
  1,
  25,
  'La eliminación directa requiere exactamente 2, 4, 8, 16 o 32 equipos.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "public"."tournament_types" WHERE LOWER("name") = LOWER('Eliminación directa')
);

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
  'Multi-etapa personalizado',
  'Formato libre por fases encadenables: combina y repite Liga, Fase de grupos, Cruces directos y Eliminación directa según las reglas de tu torneo.',
  1,
  25,
  'Define el número de fases al organizar el torneo o construye cada fase sobre la marcha al terminar la anterior.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (
  SELECT 1 FROM "public"."tournament_types" WHERE LOWER("name") = LOWER('Multi-etapa personalizado')
);
