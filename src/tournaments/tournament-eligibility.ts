import {
  TOURNAMENT_CATEGORY_GENDER_LABELS,
  type TournamentCategoryGender,
} from './tournament-category.constants';
import {
  USER_GENDER_LABELS,
  type UserGender,
} from '../users/user-gender.constants';

export type TournamentEligibilityRules = {
  name: string;
  startDate: Date;
  categoryName: string;
  minAge: number | null;
  maxAge: number | null;
  gender: string;
};

export type TournamentEligibilityPlayer = {
  fullName: string;
  birthDate: Date;
  gender: string | null;
};

export function calculateAgeOnDate(
  birthDate: Date,
  referenceDate: Date,
): number {
  let age = referenceDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const birthdayHasNotPassed =
    referenceDate.getUTCMonth() < birthDate.getUTCMonth() ||
    (referenceDate.getUTCMonth() === birthDate.getUTCMonth() &&
      referenceDate.getUTCDate() < birthDate.getUTCDate());
  if (birthdayHasNotPassed) age -= 1;
  return age;
}

export function getTournamentEligibilityIssues(
  tournament: TournamentEligibilityRules,
  players: TournamentEligibilityPlayer[],
): string[] {
  const issues: string[] = [];
  const genderRule = tournament.gender as TournamentCategoryGender;

  for (const player of players) {
    const age = calculateAgeOnDate(player.birthDate, tournament.startDate);
    if (tournament.minAge !== null && age < tournament.minAge) {
      issues.push(
        `${player.fullName} tendrá ${age} años al iniciar el torneo; la edad mínima es ${tournament.minAge}.`,
      );
    }
    if (tournament.maxAge !== null && age > tournament.maxAge) {
      issues.push(
        `${player.fullName} tendrá ${age} años al iniciar el torneo; la edad máxima es ${tournament.maxAge}.`,
      );
    }

    if (genderRule === 'male' || genderRule === 'female') {
      if (player.gender !== genderRule) {
        const registeredGender = player.gender
          ? (USER_GENDER_LABELS[player.gender as UserGender] ?? player.gender)
          : 'sin registrar';
        issues.push(
          `${player.fullName} no cumple la rama ${TOURNAMENT_CATEGORY_GENDER_LABELS[genderRule]} (género: ${registeredGender}).`,
        );
      }
    }
  }

  return issues;
}

export function formatTournamentEligibilityError(
  tournament: TournamentEligibilityRules,
  issues: string[],
): string {
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
