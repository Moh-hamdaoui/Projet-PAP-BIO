"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, isAuthenticated } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/orders";

export default function HistoriquePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setReady(true);

    if (!isAuthenticated() || !currentUser) {
      router.replace("/login");
    }
  }, [router]);

  const orders = useMemo(() => (user ? getOrdersForUser(user.id) : []), [user]);

  if (!ready) {
    return null;
  }

  if (!isAuthenticated() || !user) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
            Accès restreint
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            Connectez-vous pour consulter votre historique
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Cette page est réservée aux utilisateurs authentifiés.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-[#EFBF04] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d9a903]"
          >
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
          Historique commandes
        </p>
        <h1 className="text-3xl font-semibold text-black">
          Bonjour {user.email}
        </h1>
        <p className="text-sm text-zinc-600">
          Retrouvez l’état de vos commandes passées.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-medium text-black">Aucune commande trouvée.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
                    {order.id}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-black">{order.status}</h2>
                </div>
                <div className="text-sm text-zinc-600">
                  <p>{order.date}</p>
                  <p className="font-semibold text-black">{order.total}</p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <li key={item} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
