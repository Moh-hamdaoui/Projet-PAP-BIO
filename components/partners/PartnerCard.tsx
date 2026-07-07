import Image from "next/image";
import PartnerIcon from "./PartnerIcon";
import type { Partner } from "./types";

type PartnerCardProps = {
  partner: Partner;
  logoSrc: string | null;
  onClick: () => void;
  onLogoError: (logoSrc: string) => void;
};

export default function PartnerCard({
  partner,
  logoSrc,
  onClick,
  onLogoError,
}: PartnerCardProps) {
  const isBlack = partner.theme === "black";

  return (
    <button
      type="button"
      onClick={onClick}
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
            onError={() => onLogoError(logoSrc)}
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
}
