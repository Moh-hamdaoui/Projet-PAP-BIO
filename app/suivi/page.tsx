"use client";

import ordersData from "@/data/orders.json";

interface OrderSummary {
  id: string;
  userId: string;
  date: string;
  status: string;
  total: string;
  items: string[];
}

const orders = (ordersData.orders as OrderSummary[])
  .map((order) => ({ ...order }))
  .filter((order) => order.status.toLowerCase().includes("en cours"));

export default function SuiviPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
          Suivi des commandes
        </p>
        <h1 className="text-3xl font-semibold text-black">
          Consultez l’état de vos commandes
        </h1>
        <p className="text-sm text-zinc-600">
          Les commandes actuellement en cours sont affichées ci-dessous.
        </p>
      </div>

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
    </main>
  );
}
