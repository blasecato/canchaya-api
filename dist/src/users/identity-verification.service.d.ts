import { OnModuleDestroy } from '@nestjs/common';
import type { UploadedImageFile } from '../uploads/image-storage.types';
export declare class IdentityVerificationService implements OnModuleDestroy {
    private workerPromise;
    private queue;
    verify(front: UploadedImageFile, back: UploadedImageFile, idNumber: string, birthDate: string, declaredAge: number): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private performVerification;
    private getWorker;
    private normalizeOcrText;
    private buildBirthDatePatterns;
    private calculateAge;
}
