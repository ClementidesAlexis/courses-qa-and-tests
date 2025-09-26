import { describe, it } from "vitest";

describe("User Service", () => {
  it("should create an user", async () => {});
});

import { describe, it, expect } from 'vitest';
import { createUser, MIN_USER_AGE } from './user';

describe('createUser', () => {
  it('devrait lever une erreur si l\'utilisateur est trop jeune', () => {
    const tooYoungAge = MIN_USER_AGE - 1;
    expect(() => createUser(tooYoungAge)).toThrow("Utilisateur trop jeune");
  });

  it('devrait créer l\'utilisateur si l\'âge est suffisant', () => {
    const validAge = MIN_USER_AGE;
    expect(createUser(validAge)).toEqual({ age: validAge });
  });
});
