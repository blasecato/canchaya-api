ALTER TABLE public.users
  ADD COLUMN birth_city text,
  ADD COLUMN document_front_url text,
  ADD COLUMN document_back_url text,
  ADD COLUMN identity_verified_at timestamp with time zone;
