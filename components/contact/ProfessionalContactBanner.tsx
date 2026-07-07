import Link from "next/link";

export default function ProfessionalContactBanner() {
  return (
    <section className="my-10 flex flex-col gap-5 rounded-lg bg-black p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
          Professionnels
        </p>
        <h2 className="mt-2 text-2xl font-extrabold">
          Besoin de tarifs ou d&apos;un acc&egrave;s d&eacute;di&eacute; ?
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-zinc-200">
          Retrouvez l&apos;espace professionnel pour les commandes, les tarifs et
          les informations r&eacute;serv&eacute;es aux partenaires.
        </p>
      </div>

      <Link
        href="/espace-pro"
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#EFBF04] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#d9a903]"
      >
        Acc&eacute;der &agrave; l&apos;espace pro
      </Link>
    </section>
  );
}
