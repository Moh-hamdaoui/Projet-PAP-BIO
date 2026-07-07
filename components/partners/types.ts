export type PartnerIconName =
  | "leaf"
  | "beer"
  | "wine"
  | "juice"
  | "lentil"
  | "chips"
  | "date"
  | "cocoa"
  | "tea"
  | "network"
  | "lemon"
  | "agro";

export type Partner = {
  name: string;
  category: string;
  description: string;
  icon: PartnerIconName;
  theme: "yellow" | "black";
  logoSrc?: string;
};
