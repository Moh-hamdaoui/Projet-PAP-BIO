"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";

export type Product = {
  id: string;
  title: string;
  partiPrice: number;
  proPrice: number;
  image: string;
  category: "cafe" | "chocolat" | "mate";
};

export default function ProductCard({
  product,
  displayPrice,
}: {
  product: Product;
  displayPrice: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  function handleAddToCart() {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) {
      addItem(product.id, quantity);
      return;
    }

    addItem(product.id, quantity, {
      fromRect: rect,
      imageUrl: product.image,
    });
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        ref={imageRef}
        className="relative aspect-square overflow-hidden bg-zinc-100"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="text-base font-medium text-emerald-900">{product.title}</h2>
        <p className="text-lg font-semibold text-emerald-700">
          {displayPrice.toLocaleString("fr-FR")} €
        </p>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor={`qty-${product.id}`}>
            Quantité pour {product.title}
          </label>
          <input
            id={`qty-${product.id}`}
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => {
              const next = Number.parseInt(event.target.value, 10);
              setQuantity(Number.isNaN(next) || next < 1 ? 1 : next);
            }}
            className="w-full rounded-lg border border-emerald-100 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 sm:w-20"
          />
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-[#EFBF04] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d9a903]"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>
  );
}
