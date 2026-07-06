import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#EFBF04]/60 bg-white p-8 shadow-sm sm:p-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
            Connexion
          </p>
          <h1 className="text-3xl font-semibold text-black">
            Accédez à votre espace PAP Bio
          </h1>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="prenom.nom@email.com"
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
              placeholder="••••••••"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-[#EFBF04] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d9a903]"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-[#EFBF04]/40 bg-[#EFBF04]/10 p-5">
          <h2 className="text-lg font-semibold text-black">
            Pas encore inscrit ?
          </h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inscription-particulier"
              className="rounded-full border border-[#EFBF04] px-4 py-2 text-center text-sm font-medium text-black transition hover:bg-[#EFBF04]/20"
            >
              S&apos;inscrire particulier
            </Link>
            <Link
              href="/demande-client-pro"
              className="rounded-full border border-[#EFBF04] px-4 py-2 text-center text-sm font-medium text-black transition hover:bg-[#EFBF04]/20"
            >
              S&apos;inscrire client pro
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
