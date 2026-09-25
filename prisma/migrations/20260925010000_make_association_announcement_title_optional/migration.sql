ALTER TABLE public.association_announcements
  DROP CONSTRAINT IF EXISTS association_announcements_title_check;

ALTER TABLE public.association_announcements
  ALTER COLUMN title DROP NOT NULL;

ALTER TABLE public.association_announcements
  ADD CONSTRAINT association_announcements_title_check
  CHECK (
    title IS NULL
    OR char_length(btrim(title)) BETWEEN 1 AND 160
  );
