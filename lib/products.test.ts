import { describe, expect, it } from "vitest";
import cafes from "@/data/cafes.json";
import chocolats from "@/data/chocolats.json";
import mates from "@/data/mates.json";
import { getAllProducts, getProductById } from "@/lib/products";

describe("products", () => {
  it("agrège tous les catalogues", () => {
    const products = getAllProducts();

    expect(products).toHaveLength(cafes.length + chocolats.length + mates.length);
    expect(products.every((product) => product.id && product.title)).toBe(true);
  });

  it("retrouve un produit par identifiant", () => {
    expect(getProductById("el-palomar")?.title).toContain("El Palomar");
    expect(getProductById("identifiant-inconnu")).toBeUndefined();
  });
});
