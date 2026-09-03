"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityVerificationService = void 0;
const common_1 = require("@nestjs/common");
const node_path_1 = require("node:path");
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
let IdentityVerificationService = class IdentityVerificationService {
    workerPromise = null;
    queue = Promise.resolve();
    verify(front, back, idNumber, birthDate, declaredAge) {
        const verification = this.queue.then(() => this.performVerification(front, back, idNumber, birthDate, declaredAge));
        this.queue = verification.then(() => undefined, () => undefined);
        return verification;
    }
    async onModuleDestroy() {
        if (!this.workerPromise)
            return;
        const worker = await this.workerPromise.catch(() => null);
        await worker?.terminate();
    }
    async performVerification(front, back, idNumber, birthDate, declaredAge) {
        const expectedAge = this.calculateAge(birthDate);
        if (expectedAge !== declaredAge) {
            throw new common_1.BadRequestException(`La edad indicada no coincide con la fecha de nacimiento. Para esa fecha la edad actual es ${expectedAge} años.`);
        }
        let recognizedText;
        try {
            const worker = await this.getWorker();
            const frontResult = await worker.recognize(front.buffer);
            const backResult = await worker.recognize(back.buffer);
            recognizedText = `${frontResult.data.text}\n${backResult.data.text}`;
        }
        catch {
            throw new common_1.ServiceUnavailableException('No fue posible analizar las imágenes del documento. Intenta nuevamente con fotografías más claras.');
        }
        const normalizedText = this.normalizeOcrText(recognizedText);
        const normalizedId = idNumber.replace(/\D/g, '');
        if (normalizedId.length < 5 || !normalizedText.includes(normalizedId)) {
            throw new common_1.BadRequestException('El número de identidad escrito no coincide con el documento fotografiado.');
        }
        const expectedDatePatterns = this.buildBirthDatePatterns(birthDate);
        if (!expectedDatePatterns.some((pattern) => normalizedText.includes(pattern))) {
            throw new common_1.BadRequestException('La fecha de nacimiento escrita no coincide con la información reconocida en el documento.');
        }
    }
    getWorker() {
        if (!this.workerPromise) {
            this.workerPromise = (0, tesseract_js_1.createWorker)('spa', tesseract_js_1.OEM.LSTM_ONLY, {
                langPath: SPANISH_LANGUAGE_PATH,
            }).catch((error) => {
                this.workerPromise = null;
                throw error;
            });
        }
        return this.workerPromise;
    }
    normalizeOcrText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .replace(/[OQD]/g, '0')
            .replace(/[IL|]/g, '1')
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
        ].map((pattern) => this.normalizeOcrText(pattern));
    }
    calculateAge(value) {
        const [year, month, day] = value.split('-').map(Number);
        const today = new Date();
        let age = today.getFullYear() - year;
        if (today.getMonth() + 1 < month ||
            (today.getMonth() + 1 === month && today.getDate() < day)) {
            age -= 1;
        }
        return age;
    }
};
exports.IdentityVerificationService = IdentityVerificationService;
exports.IdentityVerificationService = IdentityVerificationService = __decorate([
    (0, common_1.Injectable)()
], IdentityVerificationService);
//# sourceMappingURL=identity-verification.service.js.map