"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildValidationException = buildValidationException;
const common_1 = require("@nestjs/common");
const CONSTRAINT_MESSAGES = {
    arrayNotEmpty: (field) => `Agrega al menos un elemento en ${field}.`,
    arrayMaxSize: (field) => `Enviaste demasiados elementos en ${field}.`,
    isArray: (field) => `El campo ${field} no tiene el formato esperado.`,
    isBoolean: (field) => `El campo ${field} debe ser sí o no.`,
    isDateString: (field) => `La fecha de ${field} no es válida.`,
    isEmail: () => 'El correo electrónico no es válido.',
    isEnum: (field) => `Selecciona una opción válida en ${field}.`,
    isIn: (field) => `Selecciona una opción válida en ${field}.`,
    isInt: (field) => `El campo ${field} debe ser un número entero.`,
    isNotEmpty: (field) => `El campo ${field} es obligatorio.`,
    isNumber: (field) => `El campo ${field} debe ser un número.`,
    isPositive: (field) => `El campo ${field} debe ser mayor que cero.`,
    isString: (field) => `El campo ${field} es obligatorio.`,
    isUrl: (field) => `El enlace de ${field} no es válido.`,
    matches: (field) => `El formato de ${field} no es válido.`,
    max: (field) => `El valor de ${field} es demasiado alto.`,
    maxLength: (field) => `El texto de ${field} es demasiado largo.`,
    min: (field) => `El valor de ${field} es demasiado bajo.`,
    minLength: (field) => `El texto de ${field} es demasiado corto.`,
    whitelistValidation: () => 'Se enviaron datos que este formulario no admite. Recarga la página e inténtalo de nuevo.',
};
const humanizeField = (field) => field
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .toLocaleLowerCase('es');
const isCustomMessage = (constraint, message) => !message.toLowerCase().startsWith(constraint.toLowerCase()) &&
    /[áéíóúñ¿¡]|^[A-ZÁÉÍÓÚÑ]/.test(message.trim());
const collect = (errors, parent = '') => errors.flatMap((error) => {
    const path = parent ? `${parent}.${error.property}` : error.property;
    const own = Object.entries(error.constraints ?? {}).map(([constraint, message]) => isCustomMessage(constraint, message)
        ? message
        : (CONSTRAINT_MESSAGES[constraint]?.(humanizeField(path)) ??
            `Revisa el campo ${humanizeField(path)}.`));
    return [...own, ...collect(error.children ?? [], path)];
});
function buildValidationException(errors) {
    const messages = [...new Set(collect(errors))];
    return new common_1.BadRequestException(messages.length > 0
        ? messages
        : 'Revisa los datos del formulario e inténtalo de nuevo.');
}
//# sourceMappingURL=validation-messages.js.map