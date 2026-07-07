import type { Product } from "@/components/ProductCard";
import cafes from "@/data/cafes.json";
import chocolats from "@/data/chocolats.json";
import mates from "@/data/mates.json";

const allProducts: Product[] = [...cafes, ...chocolats, ...mates] as Product[];

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}
