"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function ConfirmationPage() {
  const user = useAuth();

  return (
    <main className="page-container flex flex-1 flex-col justify-center py-16">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
          Commande confirmée
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-emerald-900">
          Merci pour votre commande !
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          {user
            ? "Votre commande a été enregistrée dans votre compte. Vous pouvez la consulter dans votre historique."
            : "Votre commande a bien été prise en compte."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {user && (
            <Link
              href="/historique"
              className="inline-flex justify-center rounded-full bg-[#EFBF04] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9a903]"
            >
              Voir mon historique
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-medium text-emerald-900 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </main>
  );
}
