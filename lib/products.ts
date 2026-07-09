import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { Product } from "@/components/ProductCard";
import { odooSearchRead } from "@/lib/odoo";

type OdooProductTemplate = {
  default_code: string | false;
  name: string;
  x_prix_particulier: number;
  x_prix_pro: number;
  x_categorie: string | false;
  x_image: string | false;
  x_description: string | false;
};

async function fetchProductsFromOdoo(): Promise<Product[]> {
  const records = await odooSearchRead<OdooProductTemplate>(
    "product.template",
    [["default_code", "!=", false]],
    [
      "default_code",
      "name",
      "x_prix_particulier",
      "x_prix_pro",
      "x_categorie",
      "x_image",
      "x_description",
    ]
  );

  return records
    .filter(
      (record): record is OdooProductTemplate & { default_code: string; x_image: string } =>
        typeof record.default_code === "string" && typeof record.x_image === "string"
    )
    .map((record) => ({
      id: record.default_code,
      title: record.name,
      partiPrice: record.x_prix_particulier,
      proPrice: record.x_prix_pro,
      image: record.x_image,
      category: (record.x_categorie || "cafe") as Product["category"],
      description: record.x_description || "",
    }));
}

const getCachedProducts =
  process.env.NODE_ENV === "test"
    ? fetchProductsFromOdoo
    : unstable_cache(fetchProductsFromOdoo, ["pap-bio-products"], {
        revalidate: 300,
      });

export const getAllProducts = cache(async (): Promise<Product[]> => getCachedProducts());

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id);
}
