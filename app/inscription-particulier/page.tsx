import Link from "next/link";

export default function InscriptionParticulierPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#EFBF04]/60 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
          Inscription particulier
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-black">
          Créez votre compte particulier
        </h1>
        <p className="mt-4 text-zinc-600">
          Réservez vos produits, suivez vos commandes et profitez des offres
          adaptées à votre quotidien.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="firstName">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="lastName">
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-full bg-[#EFBF04] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d9a903]"
        >
          S&apos;inscrire
        </button>

        <Link href="/login" className="mt-6 block text-center text-sm font-medium text-black hover:text-[#EFBF04]">
          Déjà inscrit ? Se connecter
        </Link>
      </div>
    </main>
  );
}
