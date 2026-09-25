"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var IdentityVerificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityVerificationService = void 0;
const common_1 = require("@nestjs/common");
const node_path_1 = require("node:path");
const sharp_1 = __importDefault(require("sharp"));
const tesseract_js_1 = require("tesseract.js");
const SPANISH_LANGUAGE_PATH = (0, node_path_1.join)((0, node_path_1.dirname)(require.resolve('@tesseract.js-data/spa')), '4.0.0_best_int');
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
];
const ROTATIONS_TO_TRY = [0, 180, 90, 270];
const OCR_TARGET_LONG_EDGE = 1800;
const MIN_RECOGNIZED_CHARACTERS = 12;
const DIGIT_LOOKALIKES = {
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
let IdentityVerificationService = IdentityVerificationService_1 = class IdentityVerificationService {
    logger = new common_1.Logger(IdentityVerificationService_1.name);
    workerPromise = null;
    queue = Promise.resolve();
    verify(front, back, idNumber, birthDate) {
        const verification = this.queue.then(() => this.performVerification(front, back, idNumber, birthDate));
        this.queue = verification.then(() => undefined, () => undefined);
        return verification;
    }
    async onModuleDestroy() {
        if (!this.workerPromise)
            return;
        const worker = await this.workerPromise.catch(() => null);
        await worker?.terminate();
    }
    async performVerification(front, back, idNumber, birthDate) {
        const expectedId = idNumber.replace(/\D/g, '');
        let reading;
        try {
            reading = await this.readDocument([front, back], expectedId);
        }
        catch (error) {
            this.logger.warn(`No fue posible ejecutar el OCR del documento: ${String(error)}`);
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
        const details = {
            idNumberMatch,
            birthDateMatch,
            rotationDegrees: reading.rotationDegrees,
            ocrConfidence: reading.confidence,
            recognizedCharacters: reading.characters,
        };
        if (idNumberMatch !== 'none') {
            return this.buildResult('verified', details);
        }
        if (birthDateMatch === 'exact') {
            return this.buildResult('verified', details);
        }
        return this.buildResult('mismatch', details);
    }
    buildResult(outcome, details) {
        return {
            outcome,
            verified: outcome === 'verified',
            requiresManualReview: outcome !== 'verified',
            details,
        };
    }
    async readDocument(files, expectedId) {
        const worker = await this.getWorker();
        const normalizedFiles = await Promise.all(files.map((file) => this.normalizeForOcr(file.buffer)));
        const collected = [];
        let best = {
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
            if (this.matchIdNumber(rotationText, expectedId) !== 'none') {
                return {
                    text: collected.join('\n'),
                    rotationDegrees: rotation,
                    confidence: rotationConfidence,
                    characters,
                };
            }
        }
        const digitsText = await this.recognizeDigitsOnly(worker, normalizedFiles, best.rotation);
        collected.push(digitsText);
        const text = collected.join('\n');
        return {
            text,
            rotationDegrees: best.characters > 0 ? best.rotation : null,
            confidence: best.confidence || null,
            characters: text.replace(/\s/g, '').length,
        };
    }
    async recognizeDigitsOnly(worker, normalizedFiles, rotation) {
        try {
            await worker.setParameters({
                tessedit_char_whitelist: '0123456789',
                tessedit_pageseg_mode: tesseract_js_1.PSM.SPARSE_TEXT,
            });
            let text = '';
            for (const normalized of normalizedFiles) {
                const image = await this.applyRotation(normalized, rotation);
                const { data } = await worker.recognize(image);
                text += `\n${data.text}`;
            }
            return text;
        }
        catch (error) {
            this.logger.warn(`Falló la pasada numérica del OCR: ${String(error)}`);
            return '';
        }
        finally {
            await worker
                .setParameters({
                tessedit_char_whitelist: '',
                tessedit_pageseg_mode: tesseract_js_1.PSM.AUTO,
            })
                .catch(() => undefined);
        }
    }
    async normalizeForOcr(buffer) {
        return (0, sharp_1.default)(buffer, { failOn: 'none' })
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
    async applyRotation(normalized, rotation) {
        if (rotation === 0)
            return normalized;
        return (0, sharp_1.default)(normalized).rotate(rotation).png().toBuffer();
    }
    getWorker() {
        if (!this.workerPromise) {
            this.workerPromise = (0, tesseract_js_1.createWorker)('spa', tesseract_js_1.OEM.LSTM_ONLY, {
                langPath: SPANISH_LANGUAGE_PATH,
            })
                .then(async (worker) => {
                await worker.setParameters({ user_defined_dpi: '300' });
                return worker;
            })
                .catch((error) => {
                this.workerPromise = null;
                throw error;
            });
        }
        return this.workerPromise;
    }
    matchIdNumber(recognizedText, expectedId) {
        if (expectedId.length < 5)
            return 'none';
        const strictDigits = recognizedText.replace(/\D/g, '');
        if (strictDigits.includes(expectedId))
            return 'exact';
        const looseDigits = this.canonicalizeDigits(recognizedText);
        if (looseDigits.includes(expectedId))
            return 'fuzzy';
        if (this.containsWithinDistance(looseDigits, expectedId, 1))
            return 'fuzzy';
        return 'none';
    }
    matchBirthDate(recognizedText, birthDate) {
        const patterns = this.buildBirthDatePatterns(birthDate);
        const strict = this.canonicalizeAlphanumeric(recognizedText);
        if (patterns.some((pattern) => strict.includes(pattern)))
            return 'exact';
        const loose = this.canonicalizeDigits(recognizedText);
        const numericPatterns = patterns
            .map((pattern) => pattern.replace(/\D/g, ''))
            .filter((pattern) => pattern.length === 8);
        if (numericPatterns.some((pattern) => loose.includes(pattern) ||
            this.containsWithinDistance(loose, pattern, 1))) {
            return 'fuzzy';
        }
        return 'none';
    }
    canonicalizeAlphanumeric(value) {
        return value
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
    }
    canonicalizeDigits(value) {
        return this.canonicalizeAlphanumeric(value)
            .split('')
            .map((character) => DIGIT_LOOKALIKES[character] ?? character)
            .join('')
            .replace(/\D/g, '');
    }
    containsWithinDistance(haystack, needle, maxDistance) {
        if (needle.length === 0)
            return false;
        const lengths = new Set([needle.length - 1, needle.length, needle.length + 1].filter((length) => length > 0 && length <= haystack.length));
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
    levenshtein(a, b, limit) {
        if (Math.abs(a.length - b.length) > limit)
            return limit + 1;
        let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
        for (let i = 1; i <= a.length; i += 1) {
            const current = [i];
            let rowMinimum = i;
            for (let j = 1; j <= b.length; j += 1) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                const value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
                current.push(value);
                rowMinimum = Math.min(rowMinimum, value);
            }
            if (rowMinimum > limit)
                return limit + 1;
            previous = current;
        }
        return previous[b.length];
    }
    buildBirthDatePatterns(value) {
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
};
exports.IdentityVerificationService = IdentityVerificationService;
exports.IdentityVerificationService = IdentityVerificationService = IdentityVerificationService_1 = __decorate([
    (0, common_1.Injectable)()
], IdentityVerificationService);
//# sourceMappingURL=identity-verification.service.js.map