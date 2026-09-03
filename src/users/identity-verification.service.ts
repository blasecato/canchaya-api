import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { dirname, join } from 'node:path';
import { createWorker, OEM, type Worker } from 'tesseract.js';
import type { UploadedImageFile } from '../uploads/image-storage.types';

const SPANISH_LANGUAGE_PATH = join(
  dirname(require.resolve('@tesseract.js-data/spa')),
  '4.0.0_best_int',
);

const SPANISH_MONTHS = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE',
] as const;

@Injectable()
export class IdentityVerificationService implements OnModuleDestroy {
  private workerPromise: Promise<Worker> | null = null;
  private queue: Promise<void> = Promise.resolve();

  verify(
    front: UploadedImageFile,
    back: UploadedImageFile,
    idNumber: string,
    birthDate: string,
    declaredAge: number,
  ): Promise<void> {
    const verification = this.queue.then(() =>
      this.performVerification(front, back, idNumber, birthDate, declaredAge),
    );
    this.queue = verification.then(
      () => undefined,
      () => undefined,
    );
    return verification;
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.workerPromise) return;
    const worker = await this.workerPromise.catch(() => null);
    await worker?.terminate();
  }

  private async performVerification(
    front: UploadedImageFile,
    back: UploadedImageFile,
    idNumber: string,
    birthDate: string,
    declaredAge: number,
  ): Promise<void> {
    const expectedAge = this.calculateAge(birthDate);
    if (expectedAge !== declaredAge) {
      throw new BadRequestException(
        `La edad indicada no coincide con la fecha de nacimiento. Para esa fecha la edad actual es ${expectedAge} años.`,
      );
    }

    let recognizedText: string;
    try {
      const worker = await this.getWorker();
      const frontResult = await worker.recognize(front.buffer);
      const backResult = await worker.recognize(back.buffer);
      recognizedText = `${frontResult.data.text}\n${backResult.data.text}`;
    } catch {
      throw new ServiceUnavailableException(
        'No fue posible analizar las imágenes del documento. Intenta nuevamente con fotografías más claras.',
      );
    }

    const normalizedText = this.normalizeOcrText(recognizedText);
    const normalizedId = idNumber.replace(/\D/g, '');
    if (normalizedId.length < 5 || !normalizedText.includes(normalizedId)) {
      throw new BadRequestException(
        'El número de identidad escrito no coincide con el documento fotografiado.',
      );
    }

    const expectedDatePatterns = this.buildBirthDatePatterns(birthDate);
    if (
      !expectedDatePatterns.some((pattern) => normalizedText.includes(pattern))
    ) {
      throw new BadRequestException(
        'La fecha de nacimiento escrita no coincide con la información reconocida en el documento.',
      );
    }
  }

  private getWorker(): Promise<Worker> {
    if (!this.workerPromise) {
      this.workerPromise = createWorker('spa', OEM.LSTM_ONLY, {
        langPath: SPANISH_LANGUAGE_PATH,
      }).catch((error: unknown) => {
        this.workerPromise = null;
        throw error;
      });
    }
    return this.workerPromise;
  }

  private normalizeOcrText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[OQD]/g, '0')
      .replace(/[IL|]/g, '1')
      .replace(/[^A-Z0-9]/g, '');
  }

  private buildBirthDatePatterns(value: string): string[] {
    const [year, month, day] = value.split('-');
    const monthName = SPANISH_MONTHS[Number(month) - 1];
    return [
      `${day}${month}${year}`,
      `${year}${month}${day}`,
      `${day}${monthName}${year}`,
      `${day}${monthName.slice(0, 3)}${year}`,
    ].map((pattern) => this.normalizeOcrText(pattern));
  }

  private calculateAge(value: string): number {
    const [year, month, day] = value.split('-').map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;
    if (
      today.getMonth() + 1 < month ||
      (today.getMonth() + 1 === month && today.getDate() < day)
    ) {
      age -= 1;
    }
    return age;
  }
}
