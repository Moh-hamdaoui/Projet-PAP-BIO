import Link from "next/link";

const footerSections = [
  {
    title: "Découvrir",
    links: [
      { label: "Notre histoire", href: "/histoire-enseigne" },
      { label: "Nos engagements", href: "/nos-engagements" },
      { label: "Nos partenaires", href: "/nos-partenaires" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Boutique", href: "/" },
      { label: "Suivi commandes", href: "/suivi" },
      { label: "Espace Pro", href: "/espace-pro" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Agenda", href: "/agenda" },
      { label: "Contact", href: "/contact" },
      { label: "Connexion", href: "/login" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand/20 bg-zinc-900 text-zinc-300">
      <div className="page-container py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white transition-colors hover:text-brand"
            >
              PAP Bio
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Produits bio de Saint-Romain-le-Puy — cafés torréfiés, chocolats
              artisanaux et matés aromatisés, en circuit court.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} PAP Bio — Tous droits réservés
          </p>
          <p className="text-xs text-zinc-500">
            Agriculture biologique &middot; Circuits courts &middot; Loire
          </p>
        </div>
      </div>
    </footer>
  );
}
