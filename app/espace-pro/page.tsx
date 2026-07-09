import Link from "next/link";

const features = [
  {
    title: "Tarifs professionnels",
    description: "Bénéficiez de prix dégressifs adaptés à votre activité de restauration ou commerce.",
    icon: "💼",
  },
  {
    title: "Suivi de commandes",
    description: "Consultez l'état de vos livraisons et l'historique de vos achats en temps réel.",
    icon: "📦",
  },
  {
    title: "Catalogue dédié",
    description: "Accédez à une gamme complète de produits bio pour équiper votre établissement.",
    icon: "📋",
  },
] as const;

export default function EspaceProPage() {
  return (
    <main>
      <section className="border-b border-brand/15 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        <div className="page-container py-12 sm:py-16">
          <p className="eyebrow">Professionnels</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Votre espace dédié
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">
            Gérez vos commandes, profitez de tarifs préférentiels et accédez à
            notre catalogue professionnel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demande-client-pro" className="btn-primary">
              Demander un accès pro
            </Link>
            <Link href="/login" className="btn-secondary !border-zinc-600 !bg-transparent !text-white hover:!bg-zinc-700">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      <section className="page-container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(({ title, description, icon }) => (
            <article key={title} className="card p-6">
              <span className="text-3xl">{icon}</span>
              <h2 className="mt-4 text-lg font-bold text-zinc-900">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-brand-light p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold text-zinc-900">
            Vous êtes restaurateur ou commerçant ?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-600">
            Rejoignez notre réseau de clients professionnels et découvrez nos
            conditions avantageuses.
          </p>
          <Link href="/contact" className="btn-primary mt-6">
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
  );
}
