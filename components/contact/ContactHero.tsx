import Image from "next/image";

const heroImages = [
  {
    src: "/cafe/Saint_Romain.jpeg",
    alt: "Cafe bio torrefie",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/chocolat/Noir_Cacao.jpg",
    alt: "Chocolat artisanal",
    className: "",
  },
  {
    src: "/mate/Vert.jpg",
    alt: "Mate bio",
    className: "",
  },
] as const;

export default function ContactHero() {
  return (
    <section className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_420px] lg:py-14">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
          Contact
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-black sm:text-5xl">
          Une question, une commande ou un projet professionnel ?
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-700">
          Contactez la plateforme bio de Saint-Romain-le-Puy pour obtenir des
          informations sur les produits, les commandes ou l&apos;atelier de
          torr&eacute;faction.
        </p>
      </div>

      <div className="grid min-h-[320px] grid-cols-2 grid-rows-2 gap-3">
        {heroImages.map((image) => (
          <div
            key={image.src}
            className={`relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.src === "/cafe/Saint_Romain.jpeg"}
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
