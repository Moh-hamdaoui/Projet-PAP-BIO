"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createToken, saveAuthToken, validateUser } from "@/lib/auth";

function getSafeRedirect(redirect: string | null): string {
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return "/";
  }
  return redirect;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const user = validateUser(email, password);
    if (user) {
      const token = createToken(user);
      saveAuthToken(token);
      router.push(getSafeRedirect(searchParams.get("redirect")));
      return;
    }
    setError("Identifiants incorrects. Veuillez réessayer.");
  }

  return (
    <main className="auth-page">
      <div className="relative z-10 mx-auto w-full max-w-md">
        <div className="auth-card">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl font-extrabold text-black">
              P
            </div>
            <p className="eyebrow">Connexion</p>
            <h1 className="mt-2 text-2xl font-bold text-zinc-900">
              Accédez à votre espace
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Connectez-vous pour suivre vos commandes et profiter de vos tarifs.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700" htmlFor="email">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="prenom.nom@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <button type="submit" className="btn-primary w-full !py-3">
              Se connecter
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-brand-light p-5">
            <h2 className="text-sm font-semibold text-zinc-900">
              Pas encore inscrit ?
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Créez votre compte en quelques clics.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/inscription-particulier" className="btn-secondary w-full text-center">
                S&apos;inscrire particulier
              </Link>
              <Link href="/demande-client-pro" className="btn-secondary w-full text-center">
                S&apos;inscrire client pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
