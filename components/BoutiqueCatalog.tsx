"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ProductCard, { type Product } from "@/components/ProductCard";
import { getDisplayPrice } from "@/lib/pricing";

type Filter = "cafe" | "chocolat" | "mate";

const filters: { value: Filter; label: string }[] = [
  { value: "cafe", label: "Cafés" },
  { value: "chocolat", label: "Chocolats" },
  { value: "mate", label: "Matés" },
];

export default function BoutiqueCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("cafe");
  const user = useAuth();

  const filtered = products.filter((p) => p.category === filter);

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="category-filter"
          className="text-sm font-medium text-zinc-600"
        >
          Filtrer :
        </label>
        <select
          id="category-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="rounded-lg border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-900 outline-none transition-colors focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        >
          {filters.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              displayPrice={getDisplayPrice(product, user?.role)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
