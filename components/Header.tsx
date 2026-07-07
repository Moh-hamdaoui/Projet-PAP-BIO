"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthToken, isAuthenticated } from "@/lib/auth";

const navItems = [
  { label: "Boutique", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Agenda", href: "/agenda" },
  { label: "Nos partenaires", href: "/nos-partenaires" },
  { label: "Nos engagements", href: "/nos-engagements" },
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

        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 whitespace-nowrap sm:gap-1">
          {navItems.map(({ label, href }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  active
                    ? "text-black"
                    : "text-zinc-600 hover:text-[#EFBF04]"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#EFBF04] sm:inset-x-3" />
                )}
              </Link>
            );
          })}
        </nav>

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
    </header>
  );
}
