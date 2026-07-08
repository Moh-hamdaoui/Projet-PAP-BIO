import type { Product } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const testProducts: Product[] = await getAllProducts();

export const samples: Record<Product["category"], Product> = {
  cafe: testProducts.find((product) => product.category === "cafe")!,
  chocolat: testProducts.find((product) => product.category === "chocolat")!,
  mate: testProducts.find((product) => product.category === "mate")!,
};