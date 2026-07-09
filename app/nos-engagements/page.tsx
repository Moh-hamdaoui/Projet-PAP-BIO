import {
  Handshake,
  MapPin,
  Recycle,
  Search,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import IconBox from "@/components/IconBox";

const commitments: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Agriculture biologique",
    description:
      "Tous nos produits sont issus de l'agriculture biologique, sans pesticides ni OGM, pour une consommation saine et responsable.",
    icon: Sprout,
  },
  {
    title: "Circuits courts",
    description:
      "Nous travaillons directement avec des producteurs locaux de la Loire pour limiter les intermédiaires et garantir la fraîcheur.",
    icon: Handshake,
  },
  {
    title: "Respect de l'environnement",
    description:
      "Emballages recyclables, livraisons optimisées et pratiques durables au cœur de notre démarche quotidienne.",
    icon: Recycle,
  },
  {
    title: "Qualité artisanale",
    description:
      "Torréfaction sur place, chocolats façonnés à la main et matés sélectionnés avec soin pour une expérience gustative unique.",
    icon: Sparkles,
  },
  {
    title: "Transparence",
    description:
      "Origine des produits, méthodes de production et traçabilité : nous vous disons tout sur ce que vous consommez.",
    icon: Search,
  },
  {
    title: "Ancrage local",
    description:
      "Basés à Saint-Romain-le-Puy, nous sommes fiers de promouvoir le terroir ligérien et ses savoir-faire.",
    icon: MapPin,
  },
];

export default function NosEngagementsPage() {
  return (
    <main>
      <section className="border-b border-brand/15 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="page-container py-12 sm:py-16">
          <p className="eyebrow">Nos valeurs</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Des engagements concrets, chaque jour
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
            Qualité bio, circuits courts et respect de l&apos;environnement : voici
            ce qui guide nos choix au quotidien.
          </p>
        </div>
      </section>

      <section className="page-container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map(({ title, description, icon }) => (
            <article
              key={title}
              className="card group p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30"
            >
              <IconBox icon={icon} />
              <h2 className="mt-4 text-lg font-bold text-zinc-900">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
