-- Valor que cobra cada torneo por tarjeta y registro de lo que debe cada
-- jugador. El cargo se genera desde el acta del partido y se marca pagado
-- cuando el equipo cancela.

ALTER TABLE public.tournaments
  ADD COLUMN IF NOT EXISTS yellow_card_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS red_card_fee NUMERIC(14, 2) NOT NULL DEFAULT 0;

ALTER TABLE public.tournaments
  DROP CONSTRAINT IF EXISTS tournaments_card_fees_check;

ALTER TABLE public.tournaments
  ADD CONSTRAINT tournaments_card_fees_check
  CHECK (yellow_card_fee >= 0 AND red_card_fee >= 0);

CREATE TABLE public.tournament_card_charges (
  id BIGSERIAL PRIMARY KEY,
  tournament_id BIGINT NOT NULL,
  team_id BIGINT NOT NULL,
  player_id BIGINT NOT NULL,
  match_id BIGINT NOT NULL,
  card_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  -- Valor por tarjeta vigente cuando se registró: cambiar la tarifa del torneo
  -- no debe alterar lo que ya se cobró.
  unit_amount NUMERIC(14, 2) NOT NULL,
  total_amount NUMERIC(14, 2) NOT NULL,
  currency_code CHAR(3) NOT NULL DEFAULT 'COP',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ(6),
  paid_by BIGINT,
  notes TEXT,
  created_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tournament_card_charges_roster_fkey
    FOREIGN KEY (tournament_id, team_id, player_id)
    REFERENCES public.tournament_team_players(tournament_id, team_id, player_id)
    ON DELETE CASCADE,
  CONSTRAINT tournament_card_charges_match_fkey
    FOREIGN KEY (match_id, tournament_id)
    REFERENCES public.matches(id, tournament_id)
    ON DELETE CASCADE,
  CONSTRAINT tournament_card_charges_paid_by_fkey
    FOREIGN KEY (paid_by) REFERENCES public.users(id) ON DELETE SET NULL,
  CONSTRAINT tournament_card_charges_card_type_check
    CHECK (card_type IN ('yellow', 'red')),
  CONSTRAINT tournament_card_charges_quantity_check CHECK (quantity > 0),
  CONSTRAINT tournament_card_charges_amount_check
    CHECK (unit_amount >= 0 AND total_amount >= 0),
  CONSTRAINT tournament_card_charges_status_check
    CHECK (payment_status IN ('pending', 'paid')),
  CONSTRAINT tournament_card_charges_paid_fields_check
    CHECK (
      (payment_status = 'paid' AND paid_at IS NOT NULL)
      OR (payment_status = 'pending' AND paid_at IS NULL)
    )
);

-- Un único cargo por jugador, partido y tipo de tarjeta: al corregir el acta
-- se actualiza la cantidad en lugar de duplicar la deuda.
CREATE UNIQUE INDEX tournament_card_charges_entry_uk
  ON public.tournament_card_charges (match_id, player_id, card_type);

CREATE INDEX tournament_card_charges_pending_idx
  ON public.tournament_card_charges (tournament_id, team_id, payment_status);
