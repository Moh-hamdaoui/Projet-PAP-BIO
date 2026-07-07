import type { Product } from "@/components/ProductCard";
import { isProUser, type UserRole } from "@/lib/auth";

export function getDisplayPrice(
  product: Product,
  role?: UserRole | null,
): number {
  return isProUser(role) ? product.proPrice : product.partiPrice;
}
