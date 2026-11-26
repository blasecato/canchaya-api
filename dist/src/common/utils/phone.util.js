"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeColombianPhone = normalizeColombianPhone;
exports.isValidColombianMobile = isValidColombianMobile;
function normalizeColombianPhone(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('57')) {
        return digits.slice(2);
    }
    return digits;
}
function isValidColombianMobile(normalized) {
    return /^3\d{9}$/.test(normalized);
}
//# sourceMappingURL=phone.util.js.map