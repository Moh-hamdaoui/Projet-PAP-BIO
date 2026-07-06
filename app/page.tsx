import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import { type Product } from "@/components/ProductCard";
import cafes from "@/data/cafes.json";
import chocolats from "@/data/chocolats.json";
import mates from "@/data/mates.json";

const products: Product[] = [...cafes, ...chocolats, ...mates] as Product[];

export default function BoutiquePage() {
  return (
    <main className="page-container flex-1 py-4">
      <p className="max-w-3xl text-zinc-600">
        Parcourez notre sélection de cafés bio en grains, de chocolats artisanaux et de matés aromatisés.
      </p>

      <BoutiqueCatalog products={products} />
    </main>
  );
}
