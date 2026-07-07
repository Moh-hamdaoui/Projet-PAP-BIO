import { describe, expect, it } from "vitest";
import type { Product } from "@/components/ProductCard";
import {
  clearCurrentUser,
  getCurrentUser,
  isProUser,
  setCurrentUser,
} from "@/lib/auth";
import { getDisplayPrice } from "@/lib/pricing";
import productsData from "@/test-data/products.json";

const cafe = productsData.products[0] as Product;

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

describe("auth session", () => {
  it("stores and clears the current user", () => {
    setCurrentUser({
      id: "user-2",
      email: "pro@example.com",
      password: "password123",
      role: "pro",
    });

    expect(getCurrentUser()?.role).toBe("pro");

    clearCurrentUser();
    expect(getCurrentUser()).toBeNull();
  });
});
