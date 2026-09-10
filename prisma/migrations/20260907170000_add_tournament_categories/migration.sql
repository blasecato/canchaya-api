ALTER TABLE "tournaments"
  ADD COLUMN "category_name" TEXT NOT NULL DEFAULT 'Libre',
  ADD COLUMN "category_min_age" INTEGER,
  ADD COLUMN "category_max_age" INTEGER,
  ADD COLUMN "category_gender" TEXT NOT NULL DEFAULT 'open';

ALTER TABLE "tournaments"
  ADD CONSTRAINT "tournaments_category_name_check"
    CHECK (length(btrim("category_name")) BETWEEN 1 AND 120),
  ADD CONSTRAINT "tournaments_category_min_age_check"
    CHECK ("category_min_age" IS NULL OR "category_min_age" BETWEEN 1 AND 120),
  ADD CONSTRAINT "tournaments_category_max_age_check"
    CHECK ("category_max_age" IS NULL OR "category_max_age" BETWEEN 1 AND 120),
  ADD CONSTRAINT "tournaments_category_age_range_check"
    CHECK (
      "category_min_age" IS NULL
      OR "category_max_age" IS NULL
      OR "category_min_age" <= "category_max_age"
    ),
  ADD CONSTRAINT "tournaments_category_gender_check"
    CHECK ("category_gender" IN ('open', 'male', 'female', 'mixed'));

CREATE INDEX "tournaments_category_idx"
  ON "tournaments" ("category_name", "category_gender", "status", "phase");

ALTER TABLE "users"
  ADD COLUMN "gender" TEXT;

ALTER TABLE "users"
  ADD CONSTRAINT "users_gender_check"
    CHECK (
      "gender" IS NULL
      OR "gender" IN ('male', 'female', 'non_binary', 'prefer_not_to_say')
    );
