import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
  await page.goto("/");
});

test("ajoute un produit au panier", async ({ page }) => {
  await page
    .getByRole("article")
    .filter({ hasText: "Café El Palomar" })
    .getByRole("button", { name: /ajouter au panier/i })
    .click();

  await expect(
    page.getByRole("link", { name: /panier, 1 article/i }),
  ).toBeVisible();
});
