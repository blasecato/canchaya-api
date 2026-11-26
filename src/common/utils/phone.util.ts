/**
 * Normaliza un número celular colombiano:
 * - Quita espacios, guiones, paréntesis y el prefijo +57 o 57 inicial.
 * - Devuelve únicamente los 10 dígitos (ej. "3001234567").
 */
export function normalizeColombianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('57')) {
    return digits.slice(2);
  }
  return digits;
}

export function isValidColombianMobile(normalized: string): boolean {
  return /^3\d{9}$/.test(normalized);
}
