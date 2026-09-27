import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { createWorker, OEM, type Worker } from 'tesseract.js';
import type { UploadedImageFile } from '../uploads/image-storage.types';
import type {
  IdentityMatchQuality,
  IdentityVerificationDetails,
  IdentityVerificationResult,
} from './identity-verification.types';

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

/** Se prueban las cuatro orientaciones para leer ambas caras completas. */
const ROTATIONS_TO_TRY = [0, 180, 90, 270] as const;

/** Tesseract necesita ~300 DPI; escalamos el lado largo hasta este tamaño. */
const OCR_TARGET_LONG_EDGE = 1800;

/** Por debajo de esto damos la lectura por inservible (foto borrosa u oscura). */
const MIN_RECOGNIZED_CHARACTERS = 12;

interface DocumentReading {
  sides?: string[];
  /** Texto crudo concatenado de todas las lecturas aprovechables. */
  text: string;
  rotationDegrees: number | null;
  confidence: number | null;
  characters: number;
}

@Injectable()
export class IdentityVerificationService implements OnModuleDestroy {
  private readonly logger = new Logger(IdentityVerificationService.name);
  private workerPromise: Promise<Worker> | null = null;
  private queue: Promise<void> = Promise.resolve();

  /**
   * Analiza ambas caras del documento y reporta si respaldan los datos
   * escritos. El registro debe rechazar cualquier resultado no verificado.
   */
  verify(
    front: UploadedImageFile,
    back: UploadedImageFile,
    idNumber: string,
    birthDate: string,
    fullName = '',
  ): Promise<IdentityVerificationResult> {
    const verification = this.queue.then(() =>
      this.performVerification(front, back, idNumber, birthDate, fullName),
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
    fullName: string,
  ): Promise<IdentityVerificationResult> {
    const expectedId = idNumber.replace(/\D/g, '');

    let reading: DocumentReading;
    try {
      reading = await this.readDocument([front, back]);
    } catch (error) {
      this.logger.warn(
        `No fue posible ejecutar el OCR del documento: ${String(error)}`,
      );
      return this.buildResult('unreadable', {
        idNumberMatch: 'none',
        birthDateMatch: 'none',
        rotationDegrees: null,
        ocrConfidence: null,
        recognizedCharacters: 0,
        failureReason: 'ocr_error',
      });
    }

    if (
      reading.characters < MIN_RECOGNIZED_CHARACTERS ||
      !reading.sides ||
      reading.sides.some(
        (text) => text.replace(/\s/g, '').length < MIN_RECOGNIZED_CHARACTERS,
      )
    ) {
      return this.buildResult('unreadable', {
        idNumberMatch: 'none',
        birthDateMatch: 'none',
        rotationDegrees: reading.rotationDegrees,
        ocrConfidence: reading.confidence,
        recognizedCharacters: reading.characters,
        failureReason: 'insufficient_text',
      });
    }

    const idNumberMatch = this.matchIdNumber(reading.text, expectedId);
    const birthDateMatch = this.matchBirthDate(reading.text, birthDate);
    const details: IdentityVerificationDetails = {
      idNumberMatch,
      birthDateMatch,
      rotationDegrees: reading.rotationDegrees,
      ocrConfidence: reading.confidence,
      recognizedCharacters: reading.characters,
    };
    const normalized = this.canonicalizeAlphanumeric(reading.text);
    const documentMarkers = ['REPUBLICADECOLOMBIA', 'CEDULADECIUDADANIA'];
    const sideMarkers = [
      'APELLIDOS',
      'NOMBRES',
      'NACIMIENTO',
      'EXPEDICION',
      'REGISTRADOR',
      'IDENTIFICACION',
      'CEDULA',
      'COLOMBIA',
    ];
    if (
      !documentMarkers.some((marker) => normalized.includes(marker)) ||
      reading.sides.some(
        (text) =>
          !sideMarkers.some((marker) =>
            this.canonicalizeAlphanumeric(text).includes(marker),
          ),
      )
    ) {
      return this.buildResult('unreadable', {
        ...details,
        failureReason: 'document_not_recognized',
      });
    }
    const words = new Set(
      reading.text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toUpperCase()
        .match(/[A-Z]+/g) ?? [],
    );
    const nameWords =
      fullName
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toUpperCase()
        .match(/[A-Z]+/g) ?? [];
    const nameMatches =
      nameWords.length >= 2 && nameWords.every((word) => words.has(word));
    if (
      idNumberMatch === 'exact' &&
      birthDateMatch === 'exact' &&
      nameMatches
    ) {
      return this.buildResult('verified', details);
    }
    return this.buildResult('mismatch', {
      ...details,
      failureReason: 'data_not_confirmed',
    });
  }

  private buildResult(
    outcome: IdentityVerificationResult['outcome'],
    details: IdentityVerificationDetails,
  ): IdentityVerificationResult {
    return {
      outcome,
      verified: outcome === 'verified',
      requiresManualReview: outcome !== 'verified',
      details,
    };
  }

  /** Conserva únicamente las lecturas con confianza suficiente de cada cara. */
  private async readDocument(
    files: UploadedImageFile[],
  ): Promise<DocumentReading> {
    const worker = await this.getWorker();
    const normalizedFiles = await Promise.all(
      files.map((file) => this.normalizeForOcr(file.buffer)),
    );

    const sides = normalizedFiles.map(() => '');
    let best: { rotation: number; confidence: number; characters: number } = {
      rotation: 0,
      confidence: 0,
      characters: 0,
    };

    for (const rotation of ROTATIONS_TO_TRY) {
      let rotationText = '';
      let rotationConfidence = 0;

      for (const [index, normalized] of normalizedFiles.entries()) {
        const image = await this.applyRotation(normalized, rotation);
        const { data } = await worker.recognize(image, { rotateAuto: true });
        rotationText += `\n${data.text}`;
        if ((data.confidence ?? 0) >= 40) sides[index] += `\n${data.text}`;
        rotationConfidence = Math.max(rotationConfidence, data.confidence ?? 0);
      }

      const characters = rotationText.replace(/\s/g, '').length;
      if (characters > best.characters) {
        best = { rotation, confidence: rotationConfidence, characters };
      }
    }

    const text = sides.join('\n');
    return {
      sides,
      text,
      rotationDegrees: best.characters > 0 ? best.rotation : null,
      confidence: best.confidence || null,
      characters: text.replace(/\s/g, '').length,
    };
  }

  /**
   * Endereza según EXIF (las cámaras de móvil guardan la orientación ahí en
   * lugar de rotar los píxeles), pasa a escala de grises, estira el contraste y
   * escala a un tamaño que Tesseract pueda leer.
   */
  private async normalizeForOcr(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer, { failOn: 'none' })
      .rotate()
      .toColourspace('b-w')
      .resize({
        width: OCR_TARGET_LONG_EDGE,
        height: OCR_TARGET_LONG_EDGE,
        fit: 'inside',
        withoutEnlargement: false,
      })
      .normalise()
      .sharpen()
      .png()
      .toBuffer();
  }

  private async applyRotation(
    normalized: Buffer,
    rotation: number,
  ): Promise<Buffer> {
    if (rotation === 0) return normalized;
    return sharp(normalized).rotate(rotation).png().toBuffer();
  }

  private getWorker(): Promise<Worker> {
    if (!this.workerPromise) {
      this.workerPromise = createWorker('spa', OEM.LSTM_ONLY, {
        langPath: SPANISH_LANGUAGE_PATH,
      })
        .then(async (worker) => {
          // Sin DPI declarado Tesseract asume 70 y descarta texto pequeño.
          await worker.setParameters({ user_defined_dpi: '300' });
          return worker;
        })
        .catch((error: unknown) => {
          this.workerPromise = null;
          throw error;
        });
    }
    return this.workerPromise;
  }

  private matchIdNumber(
    recognizedText: string,
    expectedId: string,
  ): IdentityMatchQuality {
    if (expectedId.length < 5) return 'none';

    // Cruce estricto: solo dígitos reales leídos por el OCR.
    const candidates = recognizedText.match(/\d(?:[\d. -]*\d)?/g) ?? [];
    if (candidates.some((value) => value.replace(/\D/g, '') === expectedId))
      return 'exact';
    return 'none';
  }

  private matchBirthDate(
    recognizedText: string,
    birthDate: string,
  ): IdentityMatchQuality {
    const patterns = this.buildBirthDatePatterns(birthDate);
    const strict = this.canonicalizeAlphanumeric(recognizedText);
    if (
      patterns
        .filter((pattern) => pattern.length >= 8)
        .some((pattern) => strict.includes(pattern))
    )
      return 'exact';

    return 'none';
  }

  /** Mayúsculas sin tildes y sin separadores, conservando letras. */
  private canonicalizeAlphanumeric(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toUpperCase()
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
    ].map((pattern) => this.canonicalizeAlphanumeric(pattern));
  }
}
