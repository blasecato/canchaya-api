export type IdentityVerificationOutcome =
  /** El documento se leyó y coincide con los datos escritos. */
  | 'verified'
  /** El documento se leyó, pero los datos escritos no coinciden. */
  | 'mismatch'
  /** No fue posible leer texto útil del documento. */
  | 'unreadable';

export type IdentityMatchQuality = 'exact' | 'fuzzy' | 'none';

export interface IdentityVerificationDetails {
  /** Calidad del cruce del número de identidad. */
  idNumberMatch: IdentityMatchQuality;
  /** Calidad del cruce de la fecha de nacimiento. */
  birthDateMatch: IdentityMatchQuality;
  /** Rotación (en grados) con la que el documento resultó legible. */
  rotationDegrees: number | null;
  /** Confianza media reportada por el OCR para la mejor lectura. */
  ocrConfidence: number | null;
  /** Cantidad de caracteres reconocidos en la mejor lectura. */
  recognizedCharacters: number;
  /** Motivo por el que el OCR no pudo completarse, si aplica. */
  failureReason?: string;
}

export interface IdentityVerificationResult {
  outcome: IdentityVerificationOutcome;
  /** Verdadero solo cuando el documento respalda los datos escritos. */
  verified: boolean;
  /** Verdadero cuando un humano debería revisar el documento. */
  requiresManualReview: boolean;
  details: IdentityVerificationDetails;
}
