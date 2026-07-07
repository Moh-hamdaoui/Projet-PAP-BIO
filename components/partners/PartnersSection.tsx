"use client";

import { useEffect, useState } from "react";
import PartnerCard from "./PartnerCard";
import PartnerDetailModal from "./PartnerDetailModal";
import { partners } from "./partnersData";
import type { Partner } from "./types";

export default function PartnersSection() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  // Evite de retenter un logo casse et affiche l'icone correspondante.
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const selectedLogoSrc =
    selectedPartner?.logoSrc && !failedLogos[selectedPartner.logoSrc]
      ? selectedPartner.logoSrc
      : null;

  function markLogoAsFailed(logoSrc: string) {
    setFailedLogos((current) => ({
      ...current,
      [logoSrc]: true,
    }));
  }

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
    <>
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
          // Chaque carte privilegie le logo du partenaire, puis bascule sur l'icone SVG.
          const logoSrc =
            partner.logoSrc && !failedLogos[partner.logoSrc]
              ? partner.logoSrc
              : null;

          return (
            <PartnerCard
              key={partner.name}
              partner={partner}
              logoSrc={logoSrc}
              onClick={() => setSelectedPartner(partner)}
              onLogoError={markLogoAsFailed}
            />
          );
        })}
      </section>

      {selectedPartner && (
        <PartnerDetailModal
          partner={selectedPartner}
          logoSrc={selectedLogoSrc}
          onClose={() => setSelectedPartner(null)}
          onLogoError={markLogoAsFailed}
        />
      )}
    </>
  );
}
