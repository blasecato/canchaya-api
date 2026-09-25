CREATE TABLE public.association_announcements (
  id BIGSERIAL PRIMARY KEY,
  association_id BIGINT NOT NULL,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_public_id TEXT,
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL,
  created_by BIGINT NOT NULL,
  created_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT association_announcements_association_fkey
    FOREIGN KEY (association_id)
    REFERENCES public.associations(id)
    ON DELETE CASCADE,
  CONSTRAINT association_announcements_created_by_fkey
    FOREIGN KEY (created_by)
    REFERENCES public.users(id)
    ON DELETE RESTRICT,
  CONSTRAINT association_announcements_title_check
    CHECK (char_length(btrim(title)) BETWEEN 1 AND 160),
  CONSTRAINT association_announcements_date_range_check
    CHECK (ends_on >= starts_on)
);

CREATE INDEX association_announcements_recent_idx
  ON public.association_announcements (association_id, created_at DESC);

CREATE INDEX association_announcements_visibility_idx
  ON public.association_announcements (association_id, starts_on, ends_on);
