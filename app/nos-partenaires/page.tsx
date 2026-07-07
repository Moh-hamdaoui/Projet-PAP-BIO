"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Structure commune pour les cartes et la modale de detail.
type Partner = {
  name: string;
  category: string;
  description: string;
  icon: "leaf" | "beer" | "wine" | "juice" | "lentil" | "chips" | "date" | "cocoa" | "tea" | "network" | "lemon" | "agro";
  theme: "yellow" | "black";
  logoSrc?: string;
};

// Donnees des partenaires affichees sur la page.
// Les logos sont servis depuis public/partners avec des chemins absolus.
const partners: Partner[] = [
  {
    name: "Sol à Sol",
    category: "Distributeur de maté",
    icon: "leaf",
    theme: "yellow",
    logoSrc: "/partners/sol-a-sol.jpg",
    description:
      "Sol à Sol est spécialisé dans la distribution de maté, extrait d'une plante riche en oligoéléments, en vitamines et en tanins. C'est une substance naturelle qui possède les effets dynamisants de la caféine sans provoquer d’énervement. C'est ainsi un stimulant naturel et un allié minceur.\n\nL'entreprise s'engage dans le cadre d’un commerce équitable, respectueux des conditions de vie des producteurs et de l’environnement, et porteur d’un projet de développement durable.",
  },
  {
    name: "Brasserie du Pilat",
    category: "Producteur de bières bio",
    icon: "beer",
    theme: "black",
    logoSrc: "/partners/brasserie-du-pilat.jpg",
    description:
      "La Brasserie du Pilat, c’est une histoire de famille. Son créateur, Max Skubich a transmis l’affaire à son fils Thomas qui la perpétue avec la même passion. Il élabore une grande variété de bières 100% bio grâce à un brassage avec la passion et le soin des Brasseurs d'autrefois, et de l'eau de source des Monts du Pilat.",
  },
  {
    name: "Notre sélection de vins",
    category: "Petits vignerons",
    icon: "wine",
    theme: "yellow",
    logoSrc: "/partners/selection-vins.JPG",
    description:
      "Nous nous engageons à sélectionner des vins de petits vignerons de différentes régions viticoles françaises, passionnés par leur métier et qui ont choisi de mettre en avant le magnifique terroir.\n\nNous avons également à cœur de promouvoir les vins produits dans le respect de l'environnement.",
  },
  {
    name: "Bissardon Jus de Fruits",
    category: "Producteur de jus de fruits",
    icon: "juice",
    theme: "black",
    logoSrc: "/partners/bissardon-jus-de-fruits.JPG",
    description:
      "Créée il y a une quinzaine d'années, l'entreprise Bissardon Jus de Fruits est spécialisée dans la fabrication de divers jus de fruits. L'équipe assure la transformation à partir de fruits frais.",
  },
  {
    name: "Les lentilles vertes du Puy",
    category: "Producteur de lentilles bio au Puy-en-Velay",
    icon: "lentil",
    theme: "yellow",
    logoSrc: "/partners/lentilles-vertes-du-puy.jpg",
    description:
      "La Lentille Verte du Puy, 1ère légumineuse européenne à avoir obtenu une AOP, véritable fierté culinaire de la région Rhône-Alpes-Auvergne. La lentille verte du Puy est une spécialité de lentille cultivée dans la région du Puy-en-Velay.",
  },
  {
    name: "Crousti Sud",
    category: "Fabricant de chips bio",
    icon: "chips",
    theme: "black",
    logoSrc: "/partners/crousti-sud.png",
    description:
      "Crousti Sud a été créé en Ardèche en 2008 avec l'idée de proposer des chips apéritives et innovantes, saines, naturelles et bio. Une gamme de fruits et de légumes est proposée : les saveurs sont au rendez-vous !",
  },
  {
    name: "Nomade Palize",
    category: "Distributeur de produits d’Iran",
    icon: "date",
    theme: "yellow",
    logoSrc: "/partners/nomade-palize.jpg",
    description:
      "Nomade Palize est une entreprise attachée à l'Iran et désireuse de promouvoir ses produits de qualité : dattes, figues, henné... des produits bio issus du commerce équitable.",
  },
  {
    name: "SALDAC",
    category: "Distributeur de produits du Pérou",
    icon: "cocoa",
    theme: "black",
    logoSrc: "/partners/saldac.JPG",
    description:
      "SALDAC est une entreprise française engagée dans une démarche de commerce équitable avec divers groupes de producteurs du Pérou. Ils sont en partenariat avec plusieurs coopératives produisant du chocolat, des jus de fruits, du quinoa et du sucre.",
  },
  {
    name: "Pagès",
    category: "Producteur de thés et d’infusions",
    icon: "tea",
    theme: "yellow",
    logoSrc: "/partners/pages.JPG",
    description:
      "Située au Puy en Velay, la maison Pagès transmet son savoir-faire et sa connaissance des plantes avec ses thés et ses infusions biologiques sélectionnés dans le respect de la tradition.",
  },
  {
    name: "Délices du 42",
    category: "Réseau d’artisans et producteurs de la Loire",
    icon: "network",
    theme: "black",
    logoSrc: "/partners/delices-du-42.png",
    description:
      "Nous sommes partenaire de Délice du 42, site regroupant les artisans de la Loire.\n\nVous pourrez consulter sur ce site les différentes matières premières locales produites dans la Loire, les nombreux savoir-faire locaux et la mise en avant des aliments ligériens.",
  },
  {
    name: "Limonade du Vercors",
    category: "Limonade pur citron 100% bio",
    icon: "lemon",
    theme: "yellow",
    logoSrc: "/partners/limonade-du-vercors.jpg",
    description:
      "La première limonade pur citron 100% bio conçue et produite en Rhône Alpes : au cœur du Vercors.\n\nLa composition : l’eau du Vercors, du citron bio, du sucre de canne bio, de l’huile essentielle de citron… et des bulles !",
  },
  {
    name: "Pôle Agroalimentaire Loire",
    category: "Partenaire de l’agroalimentaire dans la Loire",
    icon: "agro",
    theme: "black",
    logoSrc: "/partners/pole-agroalimentaire-loire.JPG",
    description:
      "Partenaire et soutien de l’agroalimentaire dans la Loire, ce site internet regroupe de nombreux artisans.\n\nCréé dans le but de développer un lien de l'agriculture à la transformation agroalimentaire en France.",
  },
];

function PartnerIcon({
  icon,
  className,
}: {
  icon: Partner["icon"];
  className: string;
}) {
  // Icônes SVG de secours quand un logo est absent ou ne charge pas.
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "beer":
      return (
        <svg {...common}>
          <path d="M17 10h14l-2 28H19L17 10Z" />
          <path d="M16 10h16" />
          <path d="M20 18h10" />
        </svg>
      );
    case "wine":
      return (
        <svg {...common}>
          <path d="M17 9h14l-2 13a7 7 0 0 1-10 0L17 9Z" />
          <path d="M24 28v10" />
          <path d="M18 38h12" />
        </svg>
      );
    case "juice":
      return (
        <svg {...common}>
          <path d="M16 12h16l-3 27H19L16 12Z" />
          <path d="M19 20h10" />
          <path d="M27 12l4-6" />
        </svg>
      );
    case "lentil":
      return (
        <svg {...common}>
          <path d="M13 26c3-8 15-13 24-9-1 11-9 18-20 17" />
          <path d="M13 34c8-8 15-10 24-17" />
          <path d="M18 18c-6 1-9 5-8 11" />
        </svg>
      );
    case "chips":
      return (
        <svg {...common}>
          <path d="M14 15c5-6 15 4 20-2 3 8-2 17 0 23-6-3-14 3-20-1 3-7-2-14 0-20Z" />
          <path d="M20 21c4 1 8 0 12-3" />
          <path d="M18 29c5 1 9 0 14-3" />
        </svg>
      );
    case "date":
      return (
        <svg {...common}>
          <path d="M24 10c7 5 10 11 9 18-1 6-5 10-9 10s-8-4-9-10c-1-7 2-13 9-18Z" />
          <path d="M24 15v18" />
        </svg>
      );
    case "cocoa":
      return (
        <svg {...common}>
          <path d="M24 9c8 5 12 13 10 20-2 8-7 11-10 11s-8-3-10-11c-2-7 2-15 10-20Z" />
          <path d="M16 23h16" />
          <path d="M20 13c2 6 2 18 0 25" />
          <path d="M28 13c-2 6-2 18 0 25" />
        </svg>
      );
    case "tea":
      return (
        <svg {...common}>
          <path d="M14 20h18v9a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-9Z" />
          <path d="M32 23h2a4 4 0 0 1 0 8h-2" />
          <path d="M18 11c-2 3 2 4 0 7" />
          <path d="M25 9c-2 3 2 4 0 7" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="15" cy="18" r="5" />
          <circle cx="33" cy="18" r="5" />
          <circle cx="24" cy="34" r="5" />
          <path d="M20 20h8" />
          <path d="M18 23l4 7" />
          <path d="M30 23l-4 7" />
        </svg>
      );
    case "lemon":
      return (
        <svg {...common}>
          <path d="M13 30c0-11 8-18 22-18 0 14-7 22-18 22-2 0-3-1-4-4Z" />
          <path d="M17 30c7-8 11-11 18-18" />
        </svg>
      );
    case "agro":
      return (
        <svg {...common}>
          <path d="M11 34h26" />
          <path d="M14 34V20l10-7 10 7v14" />
          <path d="M20 34V24h8v10" />
          <path d="M12 18l12-8 12 8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M13 30c0-11 8-18 22-18 0 14-7 22-18 22-2 0-3-1-4-4Z" />
          <path d="M13 36c5-9 12-14 22-24" />
        </svg>
      );
  }
}

export default function NosPartenairesPage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  // Evite de retenter un logo casse et affiche l'icone correspondante.
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const selectedLogoSrc =
    selectedPartner?.logoSrc && !failedLogos[selectedPartner.logoSrc]
      ? selectedPartner.logoSrc
      : null;

  useEffect(() => {
    if (!selectedPartner) return;

    // Ferme la modale au clavier et bloque le scroll de la page en arriere-plan.
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedPartner(null);
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedPartner]);

  return (
    <main className="page-container flex-1 bg-white pb-16 pt-4">
      <section className="mx-auto max-w-[860px] text-center">
        <h1 className="text-[40px] font-extrabold leading-tight text-black sm:text-[42px]">
          Nos partenaires
        </h1>
        <p className="mt-2 text-[22px] leading-7 text-zinc-600">
          Cliquez sur un partenaire pour en savoir plus.
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-[860px] grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => {
          const isBlack = partner.theme === "black";
          // Chaque carte privilegie le logo du partenaire, puis bascule sur l'icone SVG.
          const logoSrc =
            partner.logoSrc && !failedLogos[partner.logoSrc]
              ? partner.logoSrc
              : null;

          return (
            <button
              key={partner.name}
              type="button"
              onClick={() => setSelectedPartner(partner)}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              <div
                className={`flex h-[113px] items-center justify-center ${
                  isBlack ? "bg-black text-[#f4c400]" : "bg-[#f4c400] text-black"
                }`}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt=""
                    width={144}
                    height={80}
                    className="max-h-20 max-w-36 object-contain"
                    onError={() => {
                      setFailedLogos((current) => ({
                        ...current,
                        [logoSrc]: true,
                      }));
                    }}
                  />
                ) : (
                  <PartnerIcon icon={partner.icon} className="h-10 w-10" />
                )}
              </div>
              <div className="min-h-[78px] px-5 py-4">
                <h2 className="text-lg font-bold leading-6 text-zinc-950">
                  {partner.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-base font-semibold leading-5 text-zinc-600">
                  {partner.category}
                </p>
              </div>
            </button>
          );
        })}
      </section>

      {selectedPartner && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 py-8 sm:px-6 sm:pt-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
          onMouseDown={() => setSelectedPartner(null)}
        >
          {/* Le clic sur le fond ferme la modale; celui dans le panneau la garde ouverte. */}
          <div
            className="relative flex max-h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-md bg-white shadow-2xl sm:min-h-[445px]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Colonne visuelle desktop, inspiree du design fourni. */}
            <div className="hidden w-[276px] shrink-0 items-center justify-center bg-[#f4c400] text-black sm:flex">
              {selectedLogoSrc ? (
                <Image
                  src={selectedLogoSrc}
                  alt=""
                  width={180}
                  height={140}
                  className="max-h-40 max-w-44 object-contain"
                  onError={() => {
                    setFailedLogos((current) => ({
                      ...current,
                      [selectedLogoSrc]: true,
                    }));
                  }}
                />
              ) : (
                <PartnerIcon icon={selectedPartner.icon} className="h-20 w-20" />
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto px-7 py-8 sm:px-10 sm:py-10">
              <div className="flex items-start justify-between gap-6">
                <h2
                  id="partner-modal-title"
                  className="text-[27px] font-semibold leading-8 text-black"
                >
                  {selectedPartner.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedPartner(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-4xl font-light leading-none text-zinc-600 transition hover:bg-zinc-100 hover:text-black focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  aria-label="Fermer la fenêtre"
                >
                  ×
                </button>
              </div>

              {/* Version mobile de la zone image pour conserver la lisibilite du texte. */}
              <div className="mt-4 flex justify-center bg-[#f4c400] py-8 text-black sm:hidden">
                {selectedLogoSrc ? (
                  <Image
                    src={selectedLogoSrc}
                    alt=""
                    width={180}
                    height={130}
                    className="max-h-32 max-w-44 object-contain"
                    onError={() => {
                      setFailedLogos((current) => ({
                        ...current,
                        [selectedLogoSrc]: true,
                      }));
                    }}
                  />
                ) : (
                  <PartnerIcon
                    icon={selectedPartner.icon}
                    className="h-16 w-16"
                  />
                )}
              </div>

              <p className="mt-4 w-fit rounded-lg bg-black px-4 py-1 text-base font-bold leading-5 text-[#f4c400]">
                {selectedPartner.category}
              </p>

              <div className="mt-6 text-[19px] font-medium leading-[1.55] text-black">
                {selectedPartner.description.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-0 left-1/2 hidden h-11 w-11 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg ring-1 ring-zinc-200 sm:flex"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
