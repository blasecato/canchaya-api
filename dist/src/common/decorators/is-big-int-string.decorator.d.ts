import { type ValidationOptions } from 'class-validator';
export declare const POSTGRES_BIGINT_MAX = 9223372036854775807n;
export declare function IsBigIntString(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
