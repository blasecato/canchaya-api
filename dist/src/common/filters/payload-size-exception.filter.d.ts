import { ArgumentsHost, ExceptionFilter, PayloadTooLargeException } from '@nestjs/common';
export declare class PayloadSizeExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: PayloadTooLargeException, host: ArgumentsHost): void;
}
