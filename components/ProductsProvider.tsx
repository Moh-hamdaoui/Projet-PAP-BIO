"use client";

import { createContext, useContext } from "react";
import type { Product } from "@/components/ProductCard";

const ProductsContext = createContext<Product[] | null>(null);

export function ProductsProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
