ALTER TABLE public.association_announcements
  ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(30),
  ADD COLUMN IF NOT EXISTS address VARCHAR(180),
  ADD COLUMN IF NOT EXISTS registration_fee NUMERIC(14, 2),
  ADD COLUMN IF NOT EXISTS registration_starts_on DATE,
  ADD COLUMN IF NOT EXISTS tournament_starts_on DATE,
  ADD COLUMN IF NOT EXISTS first_place_prize NUMERIC(14, 2),
  ADD COLUMN IF NOT EXISTS second_place_prize NUMERIC(14, 2);

ALTER TABLE public.association_announcements
  DROP CONSTRAINT IF EXISTS association_announcements_contact_phone_check;

ALTER TABLE public.association_announcements
  ADD CONSTRAINT association_announcements_contact_phone_check
  CHECK (
    contact_phone IS NULL
    OR char_length(btrim(contact_phone)) BETWEEN 7 AND 30
  );

ALTER TABLE public.association_announcements
  DROP CONSTRAINT IF EXISTS association_announcements_address_check;

ALTER TABLE public.association_announcements
  ADD CONSTRAINT association_announcements_address_check
  CHECK (
    address IS NULL
    OR char_length(btrim(address)) BETWEEN 1 AND 180
  );

ALTER TABLE public.association_announcements
  DROP CONSTRAINT IF EXISTS association_announcements_amounts_check;

ALTER TABLE public.association_announcements
  ADD CONSTRAINT association_announcements_amounts_check
  CHECK (
    (registration_fee IS NULL OR registration_fee >= 0)
    AND (first_place_prize IS NULL OR first_place_prize >= 0)
    AND (second_place_prize IS NULL OR second_place_prize >= 0)
  );
