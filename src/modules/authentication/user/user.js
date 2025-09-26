export const MIN_USER_AGE = 18;

export function createUser(age) {
  if (age < MIN_USER_AGE) {
    throw new Error("Utilisateur trop jeune");
  }
  return { age };
}
