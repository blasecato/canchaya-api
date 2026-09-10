"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAgeOnDate = calculateAgeOnDate;
exports.getTournamentEligibilityIssues = getTournamentEligibilityIssues;
exports.formatTournamentEligibilityError = formatTournamentEligibilityError;
const tournament_category_constants_1 = require("./tournament-category.constants");
const user_gender_constants_1 = require("../users/user-gender.constants");
function calculateAgeOnDate(birthDate, referenceDate) {
    let age = referenceDate.getUTCFullYear() - birthDate.getUTCFullYear();
    const birthdayHasNotPassed = referenceDate.getUTCMonth() < birthDate.getUTCMonth() ||
        (referenceDate.getUTCMonth() === birthDate.getUTCMonth() &&
            referenceDate.getUTCDate() < birthDate.getUTCDate());
    if (birthdayHasNotPassed)
        age -= 1;
    return age;
}
function getTournamentEligibilityIssues(tournament, players) {
    const issues = [];
    const genderRule = tournament.gender;
    for (const player of players) {
        const age = calculateAgeOnDate(player.birthDate, tournament.startDate);
        if (tournament.minAge !== null && age < tournament.minAge) {
            issues.push(`${player.fullName} tendrá ${age} años al iniciar el torneo; la edad mínima es ${tournament.minAge}.`);
        }
        if (tournament.maxAge !== null && age > tournament.maxAge) {
            issues.push(`${player.fullName} tendrá ${age} años al iniciar el torneo; la edad máxima es ${tournament.maxAge}.`);
        }
        if (genderRule === 'male' || genderRule === 'female') {
            if (player.gender !== genderRule) {
                const registeredGender = player.gender
                    ? (user_gender_constants_1.USER_GENDER_LABELS[player.gender] ?? player.gender)
                    : 'sin registrar';
                issues.push(`${player.fullName} no cumple la rama ${tournament_category_constants_1.TOURNAMENT_CATEGORY_GENDER_LABELS[genderRule]} (género: ${registeredGender}).`);
            }
        }
    }
    return issues;
}
function formatTournamentEligibilityError(tournament, issues) {
    const visibleIssues = issues.slice(0, 5);
    const remaining = issues.length - visibleIssues.length;
    return [
        `El equipo no cumple la categoría ${tournament.categoryName} del torneo ${tournament.name}.`,
        ...visibleIssues,
        ...(remaining > 0
            ? [
                `Hay ${remaining} jugador${remaining === 1 ? '' : 'es'} adicional${remaining === 1 ? '' : 'es'} que no cumple${remaining === 1 ? '' : 'n'} los requisitos.`,
            ]
            : []),
    ].join(' ');
}
//# sourceMappingURL=tournament-eligibility.js.map