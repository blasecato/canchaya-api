CREATE TABLE public.home_hero_slides (
  slug TEXT PRIMARY KEY,
  position INTEGER NOT NULL,
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  accent_title TEXT NOT NULL,
  description TEXT NOT NULL,
  cta_label TEXT NOT NULL,
  cta_to TEXT NOT NULL,
  thumbnail_title TEXT NOT NULL,
  image_url TEXT,
  image_public_id TEXT,
  updated_by BIGINT,
  created_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT home_hero_slides_updated_by_fkey
    FOREIGN KEY (updated_by)
    REFERENCES public.users(id)
    ON DELETE SET NULL,
  CONSTRAINT home_hero_slides_position_check CHECK (position > 0),
  CONSTRAINT home_hero_slides_cta_to_check CHECK (cta_to LIKE '/%')
);

CREATE UNIQUE INDEX home_hero_slides_position_uk
  ON public.home_hero_slides (position);
