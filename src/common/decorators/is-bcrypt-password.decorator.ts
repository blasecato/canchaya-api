import { truncates } from 'bcryptjs';
import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

export function IsBcryptPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isBcryptPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return typeof value === 'string' && !truncates(value);
        },
        defaultMessage(arguments_: ValidationArguments): string {
          return `${arguments_.property} no puede superar 72 bytes en UTF-8`;
        },
      },
    });
  };
}
