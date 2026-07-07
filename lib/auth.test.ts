import { describe, expect, it } from "vitest";
import {
  findUserByEmail,
  getRoleLabel,
  isAuthenticated,
  parseAuthToken,
  saveUser,
  validateUser,
} from "./auth";

describe("auth helpers", () => {
  it("finds a user by email", () => {
    expect(findUserByEmail("particulier@example.com")?.role).toBe("particulier");
  });

  it("validates a correct credential pair", () => {
    expect(validateUser("pro@example.com", "password123")?.role).toBe("pro");
  });

  it("rejects invalid credentials", () => {
    expect(validateUser("unknown@example.com", "password123")).toBeUndefined();
  });

  it("returns a readable label for each role", () => {
    expect(getRoleLabel("pro_LaVieClaire")).toBe("Professionnel La Vie Claire");
    expect(getRoleLabel("particulier")).toBe("Particulier");
    expect(getRoleLabel("pro")).toBe("Professionnel");
  });

  it("recherche les utilisateurs sans tenir compte de la casse", () => {
    expect(findUserByEmail("PRO@example.com")?.role).toBe("pro");
  });

  it("enregistre un nouvel utilisateur et ignore les doublons d'e-mail", () => {
    const email = `nouveau-${Date.now()}@example.com`;
    const user = {
      id: "user-test-1",
      email,
      password: "secret",
      role: "particulier" as const,
    };

    const afterFirstSave = saveUser(user);
    expect(afterFirstSave.some((entry) => entry.email === email)).toBe(true);

    const afterDuplicate = saveUser({ ...user, id: "user-test-2" });
    expect(
      afterDuplicate.filter(
        (entry) => entry.email.toLowerCase() === email.toLowerCase(),
      ),
    ).toHaveLength(1);
  });

  it("rejette un token expiré ou mal formé", () => {
    const user = validateUser("pro@example.com", "password123");
    expect(user).toBeDefined();

    const expiredToken = btoa(
      JSON.stringify({
        sub: user!.id,
        email: user!.email,
        role: user!.role,
        exp: 1,
      }),
    );

    expect(parseAuthToken(expiredToken)).toBeNull();
    expect(parseAuthToken("token-invalide")).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});
