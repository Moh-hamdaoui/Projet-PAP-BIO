import { describe, expect, it } from "vitest";
import { findUserByEmail, getRoleLabel, validateUser } from "./auth";

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
  });
});
