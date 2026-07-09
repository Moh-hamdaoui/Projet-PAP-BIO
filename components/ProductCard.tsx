"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import ProductDetailModal from "@/components/ProductDetailModal";

export type Product = {
  id: string;
  title: string;
  partiPrice: number;
  proPrice: number;
  image: string;
  description: string;
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
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const imageRef = useRef<HTMLButtonElement>(null);
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
    <>
      <article className="card group flex flex-col overflow-hidden">
        <button
          ref={imageRef}
          type="button"
          onClick={() => setIsDetailOpen(true)}
          className="relative aspect-square overflow-hidden bg-zinc-100 text-left"
          aria-label={`Voir la description de ${product.title}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h2 className="text-base font-semibold text-zinc-900">
            <button
              type="button"
              onClick={() => setIsDetailOpen(true)}
              className="text-left transition-colors hover:text-brand"
            >
              {product.title}
            </button>
          </h2>

          <p className="text-xl font-bold text-emerald-700">
            {displayPrice.toLocaleString("fr-FR")} &euro;
          </p>

          <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor={`qty-${product.id}`}>
              Quantit&eacute; pour {product.title}
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
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 sm:w-20"
            />
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary flex-1 !py-2.5"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </article>

      {isDetailOpen && (
        <ProductDetailModal
          product={product}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
}
