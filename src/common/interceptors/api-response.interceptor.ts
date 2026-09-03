import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { map, Observable } from 'rxjs';

function camelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function serializeValue(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Prisma.Decimal.isDecimal(value)) {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (
    value !== null &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        camelCase(key),
        serializeValue(nestedValue),
      ]),
    );
  }

  return value;
}

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(map(serializeValue));
  }
}
