"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setLoggedIn(isAuthenticated());

    function handleAuthChange() {
      setLoggedIn(isAuthenticated());
    }

    window.addEventListener("pap-bio-auth-change", handleAuthChange);
    return () => window.removeEventListener("pap-bio-auth-change", handleAuthChange);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenSection(null);
    }, 180);
  }

  function handleLogout() {
    clearAuthToken();
    setLoggedIn(false);
    router.push("/login");
  }

  const visibleSections = navSections.map((section) => ({
    ...section,
    links: section.links.filter(({ label }) => !(label === "Suivi" && !loggedIn)),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-brand/25 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-black transition-colors hover:text-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-black">
            P
          </span>
          <span className="hidden sm:inline">PAP Bio</span>
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap lg:flex">
          {visibleSections.map((section) => (
            <div
              key={section.title}
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenSection(section.title);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:bg-brand-light hover:text-brand-hover"
              >
                {section.title}
              </button>

              <div
                role="menu"
                aria-label={section.title}
                data-open={openSection === section.title ? "true" : "false"}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
                className={`absolute left-1/2 top-full z-50 mt-1 w-56 -translate-x-1/2 rounded-2xl border border-zinc-200/80 bg-white p-2 text-left shadow-lg transition-all duration-200 ${
                  openSection === section.title
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <div className="space-y-0.5">
                  {section.links.map(({ label, href }) => {
                    const active = isActive(pathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-brand text-black"
                            : "text-zinc-600 hover:bg-brand-light hover:text-brand-hover"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <CartButton />
          {loggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-700 sm:inline-flex"
            >
              Se déconnecter
            </button>
          ) : (
            <Link href="/login" className="btn-primary hidden !py-2 sm:inline-flex">
              Se connecter
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white lg:hidden">
          <nav className="page-container space-y-6 py-6">
            {visibleSections.map((section) => (
              <div key={section.title}>
                <p className="eyebrow mb-3">{section.title}</p>
                <ul className="space-y-1">
                  {section.links.map(({ label, href }) => {
                    const active = isActive(pathname, href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-brand text-black"
                              : "text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="border-t border-zinc-100 pt-4">
              {loggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  Se déconnecter
                </button>
              ) : (
                <Link href="/login" className="btn-primary w-full">
                  Se connecter
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
