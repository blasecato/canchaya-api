ALTER TABLE "tournaments"
  DROP CONSTRAINT IF EXISTS "tournaments_phase_check";

ALTER TABLE "tournaments"
  ADD CONSTRAINT "tournaments_phase_check"
  CHECK (
    "phase" IN (
      'draft',
      'registration',
      'validation',
      'scheduled',
      'in_progress',
      'finished',
      'archived',
      'cancelled'
    )
  );

CREATE TABLE "tournament_lifecycle_events" (
  "id" BIGSERIAL NOT NULL,
  "tournament_id" BIGINT NOT NULL,
  "actor_user_id" BIGINT NOT NULL,
  "from_phase" TEXT,
  "to_phase" TEXT NOT NULL,
  "reason" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "tournament_lifecycle_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "tournament_lifecycle_events_from_phase_check"
    CHECK (
      "from_phase" IS NULL OR "from_phase" IN (
        'draft', 'registration', 'validation', 'scheduled',
        'in_progress', 'finished', 'archived', 'cancelled'
      )
    ),
  CONSTRAINT "tournament_lifecycle_events_to_phase_check"
    CHECK (
      "to_phase" IN (
        'draft', 'registration', 'validation', 'scheduled',
        'in_progress', 'finished', 'archived', 'cancelled'
      )
    ),
  CONSTRAINT "tournament_lifecycle_events_tournament_fkey"
    FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "tournament_lifecycle_events_actor_fkey"
    FOREIGN KEY ("actor_user_id") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE NO ACTION
);

CREATE INDEX "tournament_lifecycle_events_tournament_idx"
  ON "tournament_lifecycle_events"("tournament_id", "created_at");

CREATE INDEX "tournament_lifecycle_events_actor_idx"
  ON "tournament_lifecycle_events"("actor_user_id");

INSERT INTO "tournament_lifecycle_events" (
  "tournament_id",
  "actor_user_id",
  "from_phase",
  "to_phase",
  "reason",
  "created_at"
)
SELECT
  "id",
  "created_by",
  NULL,
  "phase",
  'Estado inicial registrado al habilitar el ciclo de vida controlado.',
  "created_at"
FROM "tournaments";
