ALTER TABLE "public"."users"
ADD COLUMN "blocked_until" TIMESTAMPTZ,
ADD COLUMN "block_reason" TEXT,
ADD COLUMN "blocked_by" BIGINT;

CREATE INDEX "users_blocked_until_idx"
ON "public"."users" ("blocked_until");

ALTER TABLE "public"."users"
ADD CONSTRAINT "users_blocked_by_fkey"
FOREIGN KEY ("blocked_by") REFERENCES "public"."users"("id")
ON DELETE SET NULL ON UPDATE NO ACTION;
