"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartButton from "@/components/CartButton";
import { clearAuthToken, isAuthenticated } from "@/lib/auth";

const navSections = [
  {
    title: "Découvrir",
    links: [
      { label: "Histoire", href: "/histoire-enseigne" },
      { label: "Nos engagements", href: "/nos-engagements" },
      { label: "Nos partenaires", href: "/nos-partenaires" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Boutique", href: "/" },
      { label: "Suivi", href: "/suivi" },
      { label: "Historique", href: "/historique" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Agenda", href: "/agenda" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());

    function handleAuthChange() {
      setLoggedIn(isAuthenticated());
    }

    window.addEventListener("pap-bio-auth-change", handleAuthChange);
    return () => window.removeEventListener("pap-bio-auth-change", handleAuthChange);
  }, [pathname]);

  function handleLogout() {
    clearAuthToken();
    setLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#EFBF04]/40 bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="relative z-10 shrink-0 text-xl font-semibold tracking-tight text-black"
        >
          PAP Bio
        </Link>

        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap">
          {navSections.map((section) => {
            const visibleLinks = section.links.filter(({ label }) => !(label === "Historique" && !loggedIn));

            return (
              <div key={section.title} className="group relative">
                <button
                  type="button"
                  className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFBF04] transition-colors hover:text-[#d9a903]"
                >
                  {section.title}
                </button>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-3 text-left shadow-lg opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="space-y-1">
                    {visibleLinks.map(({ label, href }) => {
                      const active = isActive(pathname, href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                            active
                              ? "bg-[#EFBF04] text-black"
                              : "text-zinc-600 hover:bg-[#EFBF04]/10 hover:text-[#EFBF04]"
                          }`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <CartButton />
          {loggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="relative z-10 shrink-0 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Se déconnecter
          </button>
        ) : (
          <Link
            href="/login"
            className="relative z-10 shrink-0 rounded-full bg-[#EFBF04] px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-[#d9a903]"
          >
            Se connecter
          </Link>
        )}
        </div>
      </div>
    </header>
  );
}
