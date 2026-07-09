"use client";

import { Candy, Coffee, Leaf, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ProductCard, { type Product } from "@/components/ProductCard";
import { getDisplayPrice } from "@/lib/pricing";

type Filter = "cafe" | "chocolat" | "mate";

const filters: { value: Filter; label: string; icon: LucideIcon }[] = [
  { value: "cafe", label: "Cafés", icon: Coffee },
  { value: "chocolat", label: "Chocolats", icon: Candy },
  { value: "mate", label: "Matés", icon: Leaf },
];

export default function BoutiqueCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("cafe");
  const user = useAuth();

  const filtered = products.filter((p) => p.category === filter);
  const activeFilter = filters.find((f) => f.value === filter)!;

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Notre sélection</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} — {activeFilter.label.toLowerCase()}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          className="inline-flex rounded-2xl bg-zinc-100 p-1"
        >
          {filters.map(({ value, label, icon: Icon }) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(value)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 py-16 text-center">
          <p className="text-zinc-500">Aucun produit dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                displayPrice={getDisplayPrice(product, user?.role)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
