import type { ComponentType, ReactNode } from "react";
import type { PartnerIconName } from "./types";

type PartnerIconProps = {
  icon: PartnerIconName;
  className: string;
};

type IconProps = {
  className: string;
};

type SvgIconProps = IconProps & {
  children: ReactNode;
};

function SvgIcon({ className, children }: SvgIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function LeafIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M13 30c0-11 8-18 22-18 0 14-7 22-18 22-2 0-3-1-4-4Z" />
      <path d="M13 36c5-9 12-14 22-24" />
    </SvgIcon>
  );
}

function BeerIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M17 10h14l-2 28H19L17 10Z" />
      <path d="M16 10h16" />
      <path d="M20 18h10" />
    </SvgIcon>
  );
}

function WineIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M17 9h14l-2 13a7 7 0 0 1-10 0L17 9Z" />
      <path d="M24 28v10" />
      <path d="M18 38h12" />
    </SvgIcon>
  );
}

function JuiceIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M16 12h16l-3 27H19L16 12Z" />
      <path d="M19 20h10" />
      <path d="M27 12l4-6" />
    </SvgIcon>
  );
}

function LentilIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M13 26c3-8 15-13 24-9-1 11-9 18-20 17" />
      <path d="M13 34c8-8 15-10 24-17" />
      <path d="M18 18c-6 1-9 5-8 11" />
    </SvgIcon>
  );
}

function ChipsIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M14 15c5-6 15 4 20-2 3 8-2 17 0 23-6-3-14 3-20-1 3-7-2-14 0-20Z" />
      <path d="M20 21c4 1 8 0 12-3" />
      <path d="M18 29c5 1 9 0 14-3" />
    </SvgIcon>
  );
}

function DateIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M24 10c7 5 10 11 9 18-1 6-5 10-9 10s-8-4-9-10c-1-7 2-13 9-18Z" />
      <path d="M24 15v18" />
    </SvgIcon>
  );
}

function CocoaIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M24 9c8 5 12 13 10 20-2 8-7 11-10 11s-8-3-10-11c-2-7 2-15 10-20Z" />
      <path d="M16 23h16" />
      <path d="M20 13c2 6 2 18 0 25" />
      <path d="M28 13c-2 6-2 18 0 25" />
    </SvgIcon>
  );
}

function TeaIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M14 20h18v9a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-9Z" />
      <path d="M32 23h2a4 4 0 0 1 0 8h-2" />
      <path d="M18 11c-2 3 2 4 0 7" />
      <path d="M25 9c-2 3 2 4 0 7" />
    </SvgIcon>
  );
}

function NetworkIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="15" cy="18" r="5" />
      <circle cx="33" cy="18" r="5" />
      <circle cx="24" cy="34" r="5" />
      <path d="M20 20h8" />
      <path d="M18 23l4 7" />
      <path d="M30 23l-4 7" />
    </SvgIcon>
  );
}

function LemonIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M13 30c0-11 8-18 22-18 0 14-7 22-18 22-2 0-3-1-4-4Z" />
      <path d="M17 30c7-8 11-11 18-18" />
    </SvgIcon>
  );
}

function AgroIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M11 34h26" />
      <path d="M14 34V20l10-7 10 7v14" />
      <path d="M20 34V24h8v10" />
      <path d="M12 18l12-8 12 8" />
    </SvgIcon>
  );
}

// Map plus facile a maintenir qu'un switch quand on ajoute ou retire une icone.
const icons: Record<PartnerIconName, ComponentType<IconProps>> = {
  leaf: LeafIcon,
  beer: BeerIcon,
  wine: WineIcon,
  juice: JuiceIcon,
  lentil: LentilIcon,
  chips: ChipsIcon,
  date: DateIcon,
  cocoa: CocoaIcon,
  tea: TeaIcon,
  network: NetworkIcon,
  lemon: LemonIcon,
  agro: AgroIcon,
};

export default function PartnerIcon({ icon, className }: PartnerIconProps) {
  const Icon = icons[icon] ?? LeafIcon;

  return <Icon className={className} />;
}
