import { describe, expect, it } from "vitest";
import {
  clearAuthToken,
  createToken,
  getCurrentUser,
  isProUser,
  saveAuthToken,
  validateUser,
} from "@/lib/auth";
import { getDisplayPrice } from "@/lib/pricing";
import { samples } from "@/tests/testProducts";

const cafe = samples.cafe;

describe("pricing helpers", () => {
  it("returns particulier prices by default and pro prices for pro accounts", () => {
    expect(getDisplayPrice(cafe, null)).toBe(cafe.partiPrice);
    expect(getDisplayPrice(cafe, "particulier")).toBe(cafe.partiPrice);
    expect(getDisplayPrice(cafe, "pro")).toBe(cafe.proPrice);
    expect(getDisplayPrice(cafe, "pro_LaVieClaire")).toBe(cafe.proPrice);
    expect(isProUser("pro")).toBe(true);
    expect(isProUser("particulier")).toBe(false);
  });
});

describe("auth token", () => {
  it("stores and clears the current user from token", () => {
    const user = validateUser("pro@example.com", "password123");
    expect(user).toBeDefined();

    saveAuthToken(createToken(user!));
    expect(getCurrentUser()?.role).toBe("pro");

    clearAuthToken();
    expect(getCurrentUser()).toBeNull();
  });
});
