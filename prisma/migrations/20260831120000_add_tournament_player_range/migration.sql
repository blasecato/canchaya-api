ALTER TABLE "public"."tournaments"
ADD COLUMN "min_players_per_team" INTEGER;

UPDATE "public"."tournaments" AS tournament
SET "min_players_per_team" = LEAST(
  tournament_type."min_players_per_team",
  tournament."max_players_per_team"
)
FROM "public"."tournament_types" AS tournament_type
WHERE tournament_type."id" = tournament."tournament_type_id";

UPDATE "public"."tournaments"
SET "min_players_per_team" = 1
WHERE "min_players_per_team" IS NULL;

ALTER TABLE "public"."tournaments"
ALTER COLUMN "min_players_per_team" SET DEFAULT 1,
ALTER COLUMN "min_players_per_team" SET NOT NULL;

ALTER TABLE "public"."tournaments"
ADD CONSTRAINT "tournaments_players_range_check"
CHECK (
  "min_players_per_team" >= 1
  AND "max_players_per_team" >= "min_players_per_team"
  AND "max_players_per_team" <= 100
);
