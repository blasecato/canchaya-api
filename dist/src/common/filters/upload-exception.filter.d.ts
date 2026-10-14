import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MulterError } from 'multer';
export declare class UploadExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: MulterError, host: ArgumentsHost): void;
    private toHttpException;
}
