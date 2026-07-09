import Image from "next/image";
import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import { getAllProducts } from "@/lib/products";

export default async function BoutiquePage() {
  const products = await getAllProducts();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-brand/15 bg-gradient-to-br from-brand-light via-white to-emerald-50/40">
        <div className="page-container py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-in-up">
              <p className="eyebrow">Boutique en ligne</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
                Des produits bio,
                <span className="text-brand"> du producteur à votre table</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-600">
                Cafés torréfiés localement, chocolats artisanaux et matés
                aromatisés — une sélection soignée en circuit court.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  100 % bio
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200/80">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Circuit court
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200/80">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Torréfaction locale
                </span>
              </div>
            </div>

            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-lg ring-1 ring-zinc-200/60 lg:block">
              <Image
                src="/cafe/Saint_Romain.jpeg"
                alt="Café bio torréfié à Saint-Romain-le-Puy"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 0px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-container flex-1 py-10 sm:py-12">
        <BoutiqueCatalog products={products} />
      </section>
    </main>
  );
}
