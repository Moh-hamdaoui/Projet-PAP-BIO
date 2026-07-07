"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { getCartLineTotal, getCartTotal } from "@/lib/cart";
import { getAllProducts } from "@/lib/products";
import { getDisplayPrice } from "@/lib/pricing";

export default function PanierPage() {
  const user = useAuth();
  const { items, updateQuantity, removeItem } = useCart();
  const products = useMemo(() => getAllProducts(), []);

  const lines = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }

      const unitPrice = getDisplayPrice(product, user?.role);
      return {
        item,
        product,
        unitPrice,
        lineTotal: getCartLineTotal(item, product, user?.role),
      };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const total = getCartTotal(items, products, user?.role);

  if (lines.length === 0) {
    return (
      <main className="page-container flex-1 py-8">
        <h1 className="text-2xl font-semibold text-emerald-900">Votre panier</h1>
        <p className="mt-4 text-zinc-600">Votre panier est vide.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#EFBF04] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9a903]"
        >
          Continuer mes achats
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container flex-1 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-emerald-900">Votre panier</h1>
        <Link
          href="/"
          className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 transition-colors hover:border-emerald-300"
        >
          Continuer mes achats
        </Link>
      </div>

      <ul className="mt-8 space-y-4">
        {lines.map(({ item, product, unitPrice, lineTotal }) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-medium text-emerald-900">{product.title}</h2>
              <p className="mt-1 text-sm text-zinc-600">
                {unitPrice.toLocaleString("fr-FR")} € / unité
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-emerald-100">
                <button
                  type="button"
                  aria-label={`Diminuer la quantité de ${product.title}`}
                  onClick={() => updateQuantity(product.id, item.quantity - 1)}
                  className="px-3 py-2 text-lg text-emerald-900 transition-colors hover:bg-emerald-50"
                >
                  −
                </button>
                <label className="sr-only" htmlFor={`cart-qty-${product.id}`}>
                  Quantité pour {product.title}
                </label>
                <input
                  id={`cart-qty-${product.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) => {
                    const next = Number.parseInt(event.target.value, 10);
                    if (!Number.isNaN(next) && next >= 1) {
                      updateQuantity(product.id, next);
                    }
                  }}
                  className="w-14 border-x border-emerald-100 py-2 text-center text-sm outline-none"
                />
                <button
                  type="button"
                  aria-label={`Augmenter la quantité de ${product.title}`}
                  onClick={() => updateQuantity(product.id, item.quantity + 1)}
                  className="px-3 py-2 text-lg text-emerald-900 transition-colors hover:bg-emerald-50"
                >
                  +
                </button>
              </div>

              <p className="min-w-20 text-right font-semibold text-emerald-700">
                {lineTotal.toLocaleString("fr-FR")} €
              </p>

              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="rounded-full border border-red-100 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-sm rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-lg font-semibold text-emerald-900">
            <span>Total</span>
            <span>{total.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
      </div>
    </main>
  );
}
