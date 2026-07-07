import Image from "next/image";

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
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-base font-medium text-emerald-900">{product.title}</h2>
        <p className="mt-auto text-lg font-semibold text-emerald-700">
          {displayPrice.toLocaleString("fr-FR")} €
        </p>
      </div>
    </article>
  );
}
