import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import { getAllProducts } from "@/lib/products";

export default async function BoutiquePage() {
  const products = await getAllProducts();

  return (
    <main className="page-container flex-1 py-4">
      <p className="max-w-3xl text-zinc-600">
        Parcourez notre sélection de cafés bio en grains, de chocolats artisanaux et de matés aromatisés.
      </p>

      <BoutiqueCatalog products={products} />
    </main>
  );
}
