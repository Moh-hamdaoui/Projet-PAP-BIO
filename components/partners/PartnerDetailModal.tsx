import Image from "next/image";
import PartnerIcon from "./PartnerIcon";
import type { Partner } from "./types";

type PartnerDetailModalProps = {
  partner: Partner;
  logoSrc: string | null;
  onClose: () => void;
  onLogoError: (logoSrc: string) => void;
};

export default function PartnerDetailModal({
  partner,
  logoSrc,
  onClose,
  onLogoError,
}: PartnerDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 py-8 sm:px-6 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      onMouseDown={onClose}
    >
      {/* Le clic sur le fond ferme la modale; celui dans le panneau la garde ouverte. */}
      <div
        className="relative flex max-h-[calc(100vh-4rem)] w-full max-w-[850px] overflow-hidden rounded-md bg-white shadow-2xl sm:min-h-[445px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Colonne visuelle desktop, inspiree du design fourni. */}
        <div className="hidden w-[276px] shrink-0 items-center justify-center bg-[#f4c400] text-black sm:flex">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={180}
              height={140}
              className="max-h-40 max-w-44 object-contain"
              onError={() => onLogoError(logoSrc)}
            />
          ) : (
            <PartnerIcon icon={partner.icon} className="h-20 w-20" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto px-7 py-8 sm:px-10 sm:py-10">
          <div className="flex items-start justify-between gap-6">
            <h2
              id="partner-modal-title"
              className="text-[27px] font-semibold leading-8 text-black"
            >
              {partner.name}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-4xl font-light leading-none text-zinc-600 transition hover:bg-zinc-100 hover:text-black focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Fermer la fenêtre"
            >
              ×
            </button>
          </div>

          {/* Version mobile de la zone image pour conserver la lisibilite du texte. */}
          <div className="mt-4 flex justify-center bg-[#f4c400] py-8 text-black sm:hidden">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt=""
                width={180}
                height={130}
                className="max-h-32 max-w-44 object-contain"
                onError={() => onLogoError(logoSrc)}
              />
            ) : (
              <PartnerIcon icon={partner.icon} className="h-16 w-16" />
            )}
          </div>

          <p className="mt-4 w-fit rounded-lg bg-black px-4 py-1 text-base font-bold leading-5 text-[#f4c400]">
            {partner.category}
          </p>

          <div className="mt-6 text-[19px] font-medium leading-[1.55] text-black">
            {partner.description.split("\n\n").map((paragraph) => (
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
  );
}
