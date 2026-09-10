ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS event_code text,
  ADD COLUMN IF NOT EXISTS deduplication_key text,
  ADD COLUMN IF NOT EXISTS scheduled_for timestamp with time zone;

CREATE UNIQUE INDEX IF NOT EXISTS notifications_user_deduplication_uk
  ON public.notifications (user_id, deduplication_key);

CREATE INDEX IF NOT EXISTS notifications_event_schedule_idx
  ON public.notifications (event_code, scheduled_for);

CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id bigint PRIMARY KEY,
  match_scheduled_enabled boolean NOT NULL DEFAULT true,
  match_updates_enabled boolean NOT NULL DEFAULT true,
  match_reminders_enabled boolean NOT NULL DEFAULT true,
  reminder_hours_before integer NOT NULL DEFAULT 24,
  email_enabled boolean NOT NULL DEFAULT false,
  whatsapp_enabled boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT notification_preferences_user_fkey
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT notification_preferences_reminder_hours_check
    CHECK (reminder_hours_before BETWEEN 1 AND 168)
);

COMMENT ON COLUMN public.notification_preferences.email_enabled IS
  'Reservado para activar correo cuando exista un proveedor configurado.';

COMMENT ON COLUMN public.notification_preferences.whatsapp_enabled IS
  'Reservado para activar WhatsApp cuando exista autorización y proveedor.';
