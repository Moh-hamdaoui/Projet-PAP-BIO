import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

vi.mock("@/lib/odoo", () => ({
  odooSearchRead: vi.fn(async () => [
    {
      default_code: "el-palomar",
      name: "Café El Palomar 1 Kg Grain",
      x_prix_particulier: 28,
      x_prix_pro: 24,
      x_categorie: "cafe",
      x_image: "/cafe/El_Palomar.jpeg",
      x_description: "Un café élégant aux arômes riches et équilibrés.",
    },
    {
      default_code: "blanc",
      name: "Chocolat Blanc",
      x_prix_particulier: 3,
      x_prix_pro: 2,
      x_categorie: "chocolat",
      x_image: "/chocolat/Blanc.jpg",
      x_description: "Un chocolat blanc doux, crémeux et fondant.",
    },
    {
      default_code: "vert",
      name: "Maté Vert 100g",
      x_prix_particulier: 7,
      x_prix_pro: 6,
      x_categorie: "mate",
      x_image: "/mate/Vert.jpg",
      x_description: "Un maté naturel aux notes végétales.",
    },
  ]),
}));

const localStorageMock = (() => {
  let store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

beforeEach(() => {
  localStorageMock.clear();
});
