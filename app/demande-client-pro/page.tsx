import Link from "next/link";

export default function DemandeClientProPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#EFBF04]/60 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
          Demande client pro
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-black">
          Demandez votre accès professionnel
        </h1>
        <p className="mt-4 text-zinc-600">
          Décrivez votre activité et nous vous recontacterons pour préparer
          votre adhésion client professionnel.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="company">
              Nom de l&apos;entreprise
            </label>
            <input
              id="company"
              type="text"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="contact">
              Personne de contact
            </label>
            <input
              id="contact"
              type="text"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="email">
              Adresse e-mail professionnelle
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="message">
              Présentation de votre besoin
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-full bg-[#EFBF04] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d9a903]"
        >
          Envoyer la demande
        </button>

        <Link href="/login" className="mt-6 block text-center text-sm font-medium text-black hover:text-[#EFBF04]">
          Retour à la connexion
        </Link>
      </div>
    </main>
  );
}
