import type { Product } from "@/components/ProductCard";
import cafes from "@/data/cafes.json";
import chocolats from "@/data/chocolats.json";
import mates from "@/data/mates.json";
import { productDescriptions } from "@/data/productDescriptions";

type ProductSource = Omit<Product, "description">;

const productSources = [...cafes, ...chocolats, ...mates] as ProductSource[];

const allProducts: Product[] = productSources.map((product) => ({
  ...product,
  description: productDescriptions[product.id] ?? "",
}));

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}
