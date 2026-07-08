"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { useProducts } from "@/components/ProductsProvider";
import { getCartLineTotal, getCartTotal } from "@/lib/cart";

const MAX_PREVIEW_LINES = 5;

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13 5.4 5M7 13l-1.2 6.2a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L19 13M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </svg>
  );
}

export default function CartButton() {
  const user = useAuth();
  const { items, itemCount, cartButtonRef, pulseCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const products = useProducts();

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            id: item.productId,
            title: product.title,
            quantity: item.quantity,
            lineTotal: getCartLineTotal(item, product, user?.role),
          };
        })
        .filter((line): line is NonNullable<typeof line> => line !== null),
    [items, products, user?.role],
  );

  const total = getCartTotal(items, products, user?.role);
  const previewLines = lines.slice(0, MAX_PREVIEW_LINES);
  const remainingCount = lines.length - previewLines.length;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <Link
        ref={cartButtonRef}
        href="/panier"
        aria-label={`Panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
        className="relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:border-[#EFBF04] hover:text-[#EFBF04]"
      >
        <CartIcon />
        <span className="hidden sm:inline">Panier</span>
        {itemCount > 0 && (
          <span
            className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EFBF04] px-1 text-xs font-bold text-black ${
              pulseCart ? "cart-badge-pulse" : ""
            }`}
          >
            {itemCount}
          </span>
        )}
      </Link>

      {showPreview && itemCount > 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 w-max min-w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg">
          <p className="text-sm font-semibold text-black">Votre panier</p>
          <ul className="mt-3 space-y-2">
            {previewLines.map((line) => (
              <li
                key={line.id}
                className="flex items-center justify-between gap-4 text-sm whitespace-nowrap"
              >
                <span className="text-zinc-700">
                  {line.title}{" "}
                  <span className="text-zinc-400">× {line.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-emerald-700">
                  {line.lineTotal.toLocaleString("fr-FR")} €
                </span>
              </li>
            ))}
          </ul>
          {remainingCount > 0 && (
            <p className="mt-2 text-xs text-zinc-500">
              et {remainingCount} autre{remainingCount > 1 ? "s" : ""} article
              {remainingCount > 1 ? "s" : ""}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 text-sm font-semibold">
            <span>Total</span>
            <span className="text-emerald-700">{total.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
      )}
    </div>
  );
}
