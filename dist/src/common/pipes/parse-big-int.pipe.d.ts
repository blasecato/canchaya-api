import { PipeTransform } from '@nestjs/common';
export declare class ParseBigIntPipe implements PipeTransform<string, bigint> {
    transform(value: string): bigint;
}
