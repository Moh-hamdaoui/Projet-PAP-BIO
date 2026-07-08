import { type Product } from "@/components/ProductCard";

type ProductDetailModalProps = {
  product: Product;
  onClose: () => void;
};

const categoryLabels: Record<Product["category"], string> = {
  cafe: "Café",
  chocolat: "Chocolat",
  mate: "Maté",
};

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-title-${product.id}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 bg-black px-6 py-5 text-white">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
              {categoryLabels[product.category]}
            </p>
            <h2
              id={`product-title-${product.id}`}
              className="mt-2 text-2xl font-extrabold"
            >
              {product.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-[#EFBF04] transition-colors hover:bg-white/10"
            aria-label="Fermer la description"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-lg leading-8 text-zinc-800">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
