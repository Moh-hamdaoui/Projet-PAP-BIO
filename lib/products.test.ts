import { describe, expect, it, vi } from "vitest";

const odooRecords = [
  {
    default_code: "el-palomar",
    name: "Café El Palomar 1 Kg Grain",
    x_prix_particulier: 28,
    x_prix_pro: 24,
    x_categorie: "cafe",
    x_image: "/cafe/El_Palomar.jpeg",
    x_description: "Un café élégant aux arômes riches.",
  },
  {
    default_code: "blanc",
    name: "Chocolat Blanc",
    x_prix_particulier: 3,
    x_prix_pro: 2,
    x_categorie: "chocolat",
    x_image: "/chocolat/Blanc.jpg",
    x_description: "Un chocolat blanc doux et crémeux.",
  },
  {
    default_code: false,
    name: "Produit sans référence (ignoré)",
    x_prix_particulier: 10,
    x_prix_pro: 8,
    x_categorie: "cafe",
    x_image: false,
    x_description: "",
  },
];

vi.mock("@/lib/odoo", () => ({
  odooSearchRead: vi.fn(async () => odooRecords),
}));

const { getAllProducts, getProductById } = await import("@/lib/products");

describe("products", () => {
  it("mappe les produits Odoo valides et ignore ceux sans référence ou image", async () => {
    const products = await getAllProducts();

    expect(products).toHaveLength(2);
    expect(products.every((product) => product.id && product.title)).toBe(true);
  });

  it("retrouve un produit par identifiant", async () => {
    expect((await getProductById("el-palomar"))?.title).toContain("El Palomar");
    expect(await getProductById("identifiant-inconnu")).toBeUndefined();
  });
});
