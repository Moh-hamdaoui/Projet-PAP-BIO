# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: boutique.spec.ts >> la boutique affiche le catalogue filtrable avec les produits
- Location: tests/e2e/boutique.spec.ts:16:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Chocolat Blanc' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Chocolat Blanc' })

```

```yaml
- banner:
  - link "PAP Bio":
    - /url: /
  - navigation:
    - link "Boutique":
      - /url: /
    - link "Contact":
      - /url: /contact
    - link "Agenda":
      - /url: /agenda
    - link "Nos partenaires":
      - /url: /nos-partenaires
    - link "Nos engagements":
      - /url: /nos-engagements
  - link "Se connecter":
    - /url: /login
- main:
  - paragraph: Parcourez notre sélection de cafés bio en grains, de chocolats artisanaux et de matés aromatisés.
  - text: "Filtrer :"
  - combobox "Filtrer :":
    - option "Cafés"
    - option "Chocolats" [selected]
    - option "Matés"
  - list:
    - listitem:
      - article:
        - img "Café El Palomar 1 Kg Grain"
        - heading "Café El Palomar 1 Kg Grain" [level=2]
        - paragraph: 28 €
    - listitem:
      - article:
        - img "Café Saint Romain 1 Kg Grain"
        - heading "Café Saint Romain 1 Kg Grain" [level=2]
        - paragraph: 26 €
    - listitem:
      - article:
        - img "Café Moka Ethiopie 1 Kg Grain"
        - heading "Café Moka Ethiopie 1 Kg Grain" [level=2]
        - paragraph: 32 €
    - listitem:
      - article:
        - img "Café Honduras 1 Kg Grain"
        - heading "Café Honduras 1 Kg Grain" [level=2]
        - paragraph: 27 €
    - listitem:
      - article:
        - img "Café Italien 1 Kg Grain"
        - heading "Café Italien 1 Kg Grain" [level=2]
        - paragraph: 26 €
    - listitem:
      - article:
        - img "Café Decafeine 1 Kg Grain"
        - heading "Café Decafeine 1 Kg Grain" [level=2]
        - paragraph: 29 €
    - listitem:
      - article:
        - img "Café San Lorenzo 1 Kg Grain"
        - heading "Café San Lorenzo 1 Kg Grain" [level=2]
        - paragraph: 30 €
    - listitem:
      - article:
        - img "Café Mexique 1 Kg Grain"
        - heading "Café Mexique 1 Kg Grain" [level=2]
        - paragraph: 27 €
    - listitem:
      - article:
        - img "Café Colombie 1 Kg Grain"
        - heading "Café Colombie 1 Kg Grain" [level=2]
        - paragraph: 31 €
    - listitem:
      - article:
        - img "Café Don Cristobal 1 Kg Grain"
        - heading "Café Don Cristobal 1 Kg Grain" [level=2]
        - paragraph: 32 €
```

# Test source

```ts
  1  | import { test, expect, type Page } from "@playwright/test";
  2  | import products from "../../test-data/products.json";
  3  | 
  4  | async function selectCategory(page: Page, category: string) {
  5  |   await page.locator("#category-filter").evaluate((select, value) => {
  6  |     const el = select as HTMLSelectElement;
  7  |     const setter = Object.getOwnPropertyDescriptor(
  8  |       HTMLSelectElement.prototype,
  9  |       "value",
  10 |     )?.set;
  11 |     setter?.call(el, value);
  12 |     el.dispatchEvent(new Event("change", { bubbles: true }));
  13 |   }, category);
  14 | }
  15 | 
  16 | test("la boutique affiche le catalogue filtrable avec les produits", async ({ page }) => {
  17 |   await page.goto("/");
  18 | 
  19 |   await expect(
  20 |     page.getByText(/parcourez notre sélection de cafés bio en grains/i),
  21 |   ).toBeVisible();
  22 |   await expect(page.getByLabel("Filtrer :")).toBeVisible();
  23 | 
  24 |   const { cafe, chocolat, mate } = products.samples;
  25 | 
  26 |   await expect(page.getByRole("heading", { name: cafe.title })).toBeVisible();
  27 |   await expect(page.getByText(`${cafe.price} €`).first()).toBeVisible();
  28 | 
  29 |   await selectCategory(page, "chocolat");
> 30 |   await expect(page.getByRole("heading", { name: chocolat.title })).toBeVisible();
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  31 |   await expect(page.getByText(`${chocolat.price} €`).first()).toBeVisible();
  32 |   await expect(page.getByRole("heading", { name: cafe.title })).toHaveCount(0);
  33 | 
  34 |   await selectCategory(page, "mate");
  35 |   await expect(page.getByRole("heading", { name: mate.title })).toBeVisible();
  36 |   await expect(page.getByText(`${mate.price} €`).first()).toBeVisible();
  37 | });
  38 | 
```