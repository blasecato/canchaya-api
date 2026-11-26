-- Plantillas reutilizables de formato de competencia por organización (o globales)
CREATE TABLE "competition_templates" (
    "id" BIGSERIAL NOT NULL,
    "association_id" BIGINT,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "mode" TEXT NOT NULL DEFAULT 'planned',
    "blueprints" JSONB NOT NULL,
    "created_by" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competition_templates_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "competition_templates_mode_ck" CHECK ("mode" IN ('planned', 'on_the_fly'))
);

CREATE INDEX "competition_templates_association_idx"
    ON "competition_templates"("association_id", "created_at" DESC);

CREATE INDEX "competition_templates_created_by_idx"
    ON "competition_templates"("created_by");

ALTER TABLE "competition_templates"
    ADD CONSTRAINT "competition_templates_association_fkey"
    FOREIGN KEY ("association_id") REFERENCES "associations"("id")
    ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "competition_templates"
    ADD CONSTRAINT "competition_templates_created_by_fkey"
    FOREIGN KEY ("created_by") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE NO ACTION;
