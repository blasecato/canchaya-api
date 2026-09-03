ALTER TABLE "associations"
  ADD COLUMN "logo_public_id" TEXT,
  ADD COLUMN "cover_public_id" TEXT;

ALTER TABLE "teams"
  ADD COLUMN "photo_public_id" TEXT;

ALTER TABLE "tournaments"
  ADD COLUMN "photo_public_id" TEXT;

ALTER TABLE "sponsors"
  ADD COLUMN "logo_public_id" TEXT;

ALTER TABLE "users"
  ADD COLUMN "photo_public_id" TEXT,
  ADD COLUMN "document_front_public_id" TEXT,
  ADD COLUMN "document_front_format" TEXT,
  ADD COLUMN "document_back_public_id" TEXT,
  ADD COLUMN "document_back_format" TEXT;
