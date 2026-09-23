import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { createWorker, OEM, PSM, type Worker } from 'tesseract.js';
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

/**
 * Las fotos llegan en cualquier orientación: de frente, de cabeza o giradas 90°
 * porque el documento se fotografió en vertical. Probamos las cuatro y nos
 * quedamos con la primera que permita leer el número de identidad.
 */
const ROTATIONS_TO_TRY = [0, 180, 90, 270] as const;

/** Tesseract necesita ~300 DPI; escalamos el lado largo hasta este tamaño. */
const OCR_TARGET_LONG_EDGE = 1800;

/** Por debajo de esto damos la lectura por inservible (foto borrosa u oscura). */
const MIN_RECOGNIZED_CHARACTERS = 12;

/**
 * Caracteres que el OCR confunde habitualmente con dígitos en una cédula.
 * Solo se aplica en el cruce tolerante, nunca en el estricto.
 */
const DIGIT_LOOKALIKES: Record<string, string> = {
  O: '0',
  Q: '0',
  D: '0',
  U: '0',
  I: '1',
  L: '1',
  T: '7',
  '|': '1',
  '!': '1',
  Z: '2',
  A: '4',
  S: '5',
  G: '6',
  B: '8',
};

interface DocumentReading {
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
   * escritos. Nunca lanza: el registro no se bloquea por una foto difícil, el
   * resultado queda guardado para revisión manual.
   */
  verify(
    front: UploadedImageFile,
    back: UploadedImageFile,
    idNumber: string,
    birthDate: string,
  ): Promise<IdentityVerificationResult> {
    const verification = this.queue.then(() =>
      this.performVerification(front, back, idNumber, birthDate),
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
  ): Promise<IdentityVerificationResult> {
    const expectedId = idNumber.replace(/\D/g, '');

    let reading: DocumentReading;
    try {
      reading = await this.readDocument([front, back], expectedId);
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

    if (reading.characters < MIN_RECOGNIZED_CHARACTERS) {
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

    // El número manda. La fecha solo respalda: exigir ambos duplicaba los
    // rechazos a personas con documentos legítimos.
    if (idNumberMatch !== 'none') {
      return this.buildResult('verified', details);
    }
    if (birthDateMatch === 'exact') {
      return this.buildResult('verified', details);
    }

    // Se leyó texto pero no aparece ninguno de los dos datos: puede ser un
    // documento ajeno o una foto parcial. Queda para revisión humana.
    return this.buildResult('mismatch', details);
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

  /**
   * Recorre caras y rotaciones hasta encontrar el número de identidad. Si no
   * aparece, devuelve todo el texto acumulado y la mejor lectura por confianza,
   * para que el cruce tolerante todavía tenga una oportunidad.
   */
  private async readDocument(
    files: UploadedImageFile[],
    expectedId: string,
  ): Promise<DocumentReading> {
    const worker = await this.getWorker();
    const normalizedFiles = await Promise.all(
      files.map((file) => this.normalizeForOcr(file.buffer)),
    );

    const collected: string[] = [];
    let best: { rotation: number; confidence: number; characters: number } = {
      rotation: 0,
      confidence: 0,
      characters: 0,
    };

    for (const rotation of ROTATIONS_TO_TRY) {
      let rotationText = '';
      let rotationConfidence = 0;

      for (const normalized of normalizedFiles) {
        const image = await this.applyRotation(normalized, rotation);
        const { data } = await worker.recognize(image, { rotateAuto: true });
        rotationText += `\n${data.text}`;
        rotationConfidence = Math.max(rotationConfidence, data.confidence ?? 0);
      }

      collected.push(rotationText);
      const characters = rotationText.replace(/\s/g, '').length;
      if (characters > best.characters) {
        best = { rotation, confidence: rotationConfidence, characters };
      }

      // Con el número ya localizado no hace falta girar más.
      if (this.matchIdNumber(rotationText, expectedId) !== 'none') {
        return {
          text: collected.join('\n'),
          rotationDegrees: rotation,
          confidence: rotationConfidence,
          characters,
        };
      }
    }

    // Último intento: pasada solo de dígitos sobre la rotación más legible.
    // Sin diccionario ni letras, Tesseract acierta mucho más en la numeración.
    const digitsText = await this.recognizeDigitsOnly(
      worker,
      normalizedFiles,
      best.rotation,
    );
    collected.push(digitsText);

    const text = collected.join('\n');
    return {
      text,
      rotationDegrees: best.characters > 0 ? best.rotation : null,
      confidence: best.confidence || null,
      characters: text.replace(/\s/g, '').length,
    };
  }

  private async recognizeDigitsOnly(
    worker: Worker,
    normalizedFiles: Buffer[],
    rotation: number,
  ): Promise<string> {
    try {
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789',
        tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      });
      let text = '';
      for (const normalized of normalizedFiles) {
        const image = await this.applyRotation(normalized, rotation);
        const { data } = await worker.recognize(image);
        text += `\n${data.text}`;
      }
      return text;
    } catch (error) {
      this.logger.warn(`Falló la pasada numérica del OCR: ${String(error)}`);
      return '';
    } finally {
      await worker
        .setParameters({
          tessedit_char_whitelist: '',
          tessedit_pageseg_mode: PSM.AUTO,
        })
        .catch(() => undefined);
    }
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
    const strictDigits = recognizedText.replace(/\D/g, '');
    if (strictDigits.includes(expectedId)) return 'exact';

    // Cruce tolerante: además de resolver confusiones típicas (S/5, B/8, O/0),
    // admite un carácter de diferencia, que es el error más frecuente.
    const looseDigits = this.canonicalizeDigits(recognizedText);
    if (looseDigits.includes(expectedId)) return 'fuzzy';
    if (this.containsWithinDistance(looseDigits, expectedId, 1)) return 'fuzzy';

    return 'none';
  }

  private matchBirthDate(
    recognizedText: string,
    birthDate: string,
  ): IdentityMatchQuality {
    const patterns = this.buildBirthDatePatterns(birthDate);
    const strict = this.canonicalizeAlphanumeric(recognizedText);
    if (patterns.some((pattern) => strict.includes(pattern))) return 'exact';

    const loose = this.canonicalizeDigits(recognizedText);
    const numericPatterns = patterns
      .map((pattern) => pattern.replace(/\D/g, ''))
      .filter((pattern) => pattern.length === 8);
    if (
      numericPatterns.some(
        (pattern) =>
          loose.includes(pattern) ||
          this.containsWithinDistance(loose, pattern, 1),
      )
    ) {
      return 'fuzzy';
    }

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

  /** Igual que el anterior, pero resolviendo letras parecidas a dígitos. */
  private canonicalizeDigits(value: string): string {
    return this.canonicalizeAlphanumeric(value)
      .split('')
      .map((character) => DIGIT_LOOKALIKES[character] ?? character)
      .join('')
      .replace(/\D/g, '');
  }

  /**
   * Busca `needle` dentro de `haystack` admitiendo hasta `maxDistance`
   * sustituciones, inserciones o borrados, probando ventanas de longitud
   * cercana a la del dato esperado.
   */
  private containsWithinDistance(
    haystack: string,
    needle: string,
    maxDistance: number,
  ): boolean {
    if (needle.length === 0) return false;
    const lengths = new Set(
      [needle.length - 1, needle.length, needle.length + 1].filter(
        (length) => length > 0 && length <= haystack.length,
      ),
    );

    for (const length of lengths) {
      for (let start = 0; start + length <= haystack.length; start += 1) {
        const window = haystack.slice(start, start + length);
        if (this.levenshtein(window, needle, maxDistance) <= maxDistance) {
          return true;
        }
      }
    }
    return false;
  }

  /** Distancia de edición con corte temprano para no recorrer de más. */
  private levenshtein(a: string, b: string, limit: number): number {
    if (Math.abs(a.length - b.length) > limit) return limit + 1;

    let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      const current = [i];
      let rowMinimum = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        const value = Math.min(
          previous[j] + 1,
          current[j - 1] + 1,
          previous[j - 1] + cost,
        );
        current.push(value);
        rowMinimum = Math.min(rowMinimum, value);
      }
      if (rowMinimum > limit) return limit + 1;
      previous = current;
    }
    return previous[b.length];
  }

  private buildBirthDatePatterns(value: string): string[] {
    const [year, month, day] = value.split('-');
    const monthName = SPANISH_MONTHS[Number(month) - 1];
    const shortYear = year.slice(2);
    return [
      `${day}${month}${year}`,
      `${year}${month}${day}`,
      `${month}${day}${year}`,
      `${day}${month}${shortYear}`,
      `${day}${monthName}${year}`,
      `${day}${monthName.slice(0, 3)}${year}`,
    ].map((pattern) => this.canonicalizeAlphanumeric(pattern));
  }
}
