import type { Product } from "@/components/ProductCard";
import type { UserRole } from "@/lib/auth";
import { getDisplayPrice } from "@/lib/pricing";

export type CartItem = {
  productId: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "pap-bio-cart";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}

export function addItem(items: CartItem[], productId: string, quantity: number): CartItem[] {
  const existing = items.find((item) => item.productId === productId);

  if (existing) {
    return items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  return [...items, { productId, quantity }];
}

export function updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity < 1) {
    return removeItem(items, productId);
  }

  return items.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  );
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartLineTotal(
  item: CartItem,
  product: Product,
  role?: UserRole | null,
): number {
  return getDisplayPrice(product, role) * item.quantity;
}

export function getCartTotal(
  items: CartItem[],
  products: Product[],
  role?: UserRole | null,
): number {
  return items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      return total;
    }

    return total + getCartLineTotal(item, product, role);
  }, 0);
}
