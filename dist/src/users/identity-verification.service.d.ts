import { OnModuleDestroy } from '@nestjs/common';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import type { IdentityVerificationResult } from './identity-verification.types';
export declare class IdentityVerificationService implements OnModuleDestroy {
    private readonly logger;
    private workerPromise;
    private queue;
    verify(front: UploadedImageFile, back: UploadedImageFile, idNumber: string, birthDate: string): Promise<IdentityVerificationResult>;
    onModuleDestroy(): Promise<void>;
    private performVerification;
    private buildResult;
    private readDocument;
    private recognizeDigitsOnly;
    private normalizeForOcr;
    private applyRotation;
    private getWorker;
    private matchIdNumber;
    private matchBirthDate;
    private canonicalizeAlphanumeric;
    private canonicalizeDigits;
    private containsWithinDistance;
    private levenshtein;
    private buildBirthDatePatterns;
}
