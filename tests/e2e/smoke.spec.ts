import { test, expect } from "@playwright/test";

test("application homepage is reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/PAP Bio/i);
});
