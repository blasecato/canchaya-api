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
let IdentityVerificationService = IdentityVerificationService_1 = class IdentityVerificationService {
    logger = new common_1.Logger(IdentityVerificationService_1.name);
    workerPromise = null;
    queue = Promise.resolve();
    verify(front, back, idNumber, birthDate, fullName = '') {
        const verification = this.queue.then(() => this.performVerification(front, back, idNumber, birthDate, fullName));
        this.queue = verification.then(() => undefined, () => undefined);
        return verification;
    }
    async onModuleDestroy() {
        if (!this.workerPromise)
            return;
        const worker = await this.workerPromise.catch(() => null);
        await worker?.terminate();
    }
    async performVerification(front, back, idNumber, birthDate, fullName) {
        const expectedId = idNumber.replace(/\D/g, '');
        let reading;
        try {
            reading = await this.readDocument([front, back]);
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
        if (reading.characters < MIN_RECOGNIZED_CHARACTERS ||
            !reading.sides ||
            reading.sides.some((text) => text.replace(/\s/g, '').length < MIN_RECOGNIZED_CHARACTERS)) {
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
        if (!documentMarkers.some((marker) => normalized.includes(marker)) ||
            reading.sides.some((text) => !sideMarkers.some((marker) => this.canonicalizeAlphanumeric(text).includes(marker)))) {
            return this.buildResult('unreadable', {
                ...details,
                failureReason: 'document_not_recognized',
            });
        }
        const words = new Set(reading.text
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toUpperCase()
            .match(/[A-Z]+/g) ?? []);
        const nameWords = fullName
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toUpperCase()
            .match(/[A-Z]+/g) ?? [];
        const nameMatches = nameWords.length >= 2 && nameWords.every((word) => words.has(word));
        if (idNumberMatch === 'exact' &&
            birthDateMatch === 'exact' &&
            nameMatches) {
            return this.buildResult('verified', details);
        }
        return this.buildResult('mismatch', {
            ...details,
            failureReason: 'data_not_confirmed',
        });
    }
    buildResult(outcome, details) {
        return {
            outcome,
            verified: outcome === 'verified',
            requiresManualReview: outcome !== 'verified',
            details,
        };
    }
    async readDocument(files) {
        const worker = await this.getWorker();
        const normalizedFiles = await Promise.all(files.map((file) => this.normalizeForOcr(file.buffer)));
        const sides = normalizedFiles.map(() => '');
        let best = {
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
                if ((data.confidence ?? 0) >= 40)
                    sides[index] += `\n${data.text}`;
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
        const candidates = recognizedText.match(/\d(?:[\d. -]*\d)?/g) ?? [];
        if (candidates.some((value) => value.replace(/\D/g, '') === expectedId))
            return 'exact';
        return 'none';
    }
    matchBirthDate(recognizedText, birthDate) {
        const patterns = this.buildBirthDatePatterns(birthDate);
        const strict = this.canonicalizeAlphanumeric(recognizedText);
        if (patterns
            .filter((pattern) => pattern.length >= 8)
            .some((pattern) => strict.includes(pattern)))
            return 'exact';
        return 'none';
    }
    canonicalizeAlphanumeric(value) {
        return value
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
    }
    buildBirthDatePatterns(value) {
        const [year, month, day] = value.split('-');
        const monthName = SPANISH_MONTHS[Number(month) - 1];
        return [
            `${day}${month}${year}`,
            `${year}${month}${day}`,
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