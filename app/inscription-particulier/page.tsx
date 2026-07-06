"use client";

import Link from "next/link";
import { useState } from "react";
import { saveUser, getRoleLabel, type UserRole } from "@/lib/auth";

export default function InscriptionParticulierPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setMessage("Merci de remplir tous les champs.");
      return;
    }

    const role: UserRole = "particulier";
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      role,
    };

    saveUser(newUser);
    setMessage(`Compte créé avec succès pour ${getRoleLabel(role)}. Vous pouvez maintenant vous connecter.`);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

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

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="firstName">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
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
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#EFBF04] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#EFBF04] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#d9a903]"
          >
            S&apos;inscrire
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-2xl border border-[#EFBF04]/30 bg-[#EFBF04]/10 px-4 py-3 text-sm text-black">
            {message}
          </p>
        ) : null}

        <Link href="/login" className="mt-6 block text-center text-sm font-medium text-black hover:text-[#EFBF04]">
          Déjà inscrit ? Se connecter
        </Link>
      </div>
    </main>
  );
}
