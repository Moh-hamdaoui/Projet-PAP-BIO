import { type ReactNode } from "react";

type ContactIconProps = {
  name: "address" | "phone" | "mail" | "website";
};

const icons: Record<ContactIconProps["name"], ReactNode> = {
  address: (
    <path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  ),
  phone: (
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3.1.5.7 0 1.3.6 1.3 1.3v3.5c0 .7-.6 1.3-1.3 1.3C10 21.5 2.5 14 2.5 4.3 2.5 3.6 3.1 3 3.8 3h3.5c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.1.5 3.1.1.4 0 .9-.3 1.2l-2.2 2.2Z" />
  ),
  mail: (
    <path d="M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1Zm0 2 8 6 8-6" />
  ),
  website: (
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.2-2.4 3.4-5.4 3.4-9S14.2 5.4 12 3m0 18c-2.2-2.4-3.4-5.4-3.4-9S9.8 5.4 12 3M3.6 9h16.8M3.6 15h16.8" />
  ),
};

export default function ContactIcon({ name }: ContactIconProps) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EFBF04] text-black">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        {icons[name]}
      </svg>
    </span>
  );
}
