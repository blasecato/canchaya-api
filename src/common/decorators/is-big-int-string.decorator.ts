import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

export const POSTGRES_BIGINT_MAX = 9_223_372_036_854_775_807n;

export function IsBigIntString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isBigIntString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return (
            typeof value === 'string' &&
            value.length <= 19 &&
            /^[1-9]\d*$/.test(value) &&
            BigInt(value) <= POSTGRES_BIGINT_MAX
          );
        },
        defaultMessage(arguments_: ValidationArguments): string {
          return `${arguments_.property} debe ser un bigint positivo válido enviado como texto`;
        },
      },
    });
  };
}
