ALTER TABLE "public"."tournament_types"
ADD COLUMN "min_players_per_team" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "max_players_per_team" INTEGER NOT NULL DEFAULT 25,
ADD COLUMN "instructions" TEXT,
ADD COLUMN "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "public"."tournament_types"
ADD CONSTRAINT "tournament_types_players_range_check"
CHECK (
  "min_players_per_team" >= 1
  AND "max_players_per_team" >= "min_players_per_team"
  AND "max_players_per_team" <= 100
);
