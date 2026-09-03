import { ValidateIf, type ValidationOptions } from 'class-validator';

/**
 * Makes a property optional when it is omitted, but still validates `null`.
 * Use this for optional API fields backed by NOT NULL database columns.
 */
export function IsOptionalNonNullable(validationOptions?: ValidationOptions) {
  return ValidateIf(
    (_object: object, value: unknown) => value !== undefined,
    validationOptions,
  );
}
