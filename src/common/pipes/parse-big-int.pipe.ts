import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { POSTGRES_BIGINT_MAX } from '../decorators/is-big-int-string.decorator';

@Injectable()
export class ParseBigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string): bigint {
    if (
      value.length > 19 ||
      !/^[1-9]\d*$/.test(value) ||
      BigInt(value) > POSTGRES_BIGINT_MAX
    ) {
      throw new BadRequestException(
        'El identificador debe ser un entero válido.',
      );
    }

    return BigInt(value);
  }
}
