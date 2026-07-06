import { test, expect } from "@playwright/test";

test("the login page exposes the inscription options", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: /accédez à votre espace pap bio/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /s'inscrire particulier/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /s'inscrire client pro/i })).toBeVisible();
});

test("the registration links navigate to the correct pages", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("link", { name: /s'inscrire particulier/i }).click();
  await expect(page).toHaveURL(/\/inscription-particulier$/);

  await page.goto("/login");
  await page.getByRole("link", { name: /s'inscrire client pro/i }).click();
  await expect(page).toHaveURL(/\/demande-client-pro$/);
});
