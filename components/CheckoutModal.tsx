"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { getCartTotal } from "@/lib/cart";
import { createOrder, type DeliveryDetails, type DeliveryMethod } from "@/lib/orders";
import { getAllProducts } from "@/lib/products";

const emptyDelivery: DeliveryDetails = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  postalCode: "",
};

function isDeliveryComplete(delivery: DeliveryDetails): boolean {
  return Object.values(delivery).every((value) => value.trim().length > 0);
}

type CheckoutModalProps = {
  onClose: () => void;
};

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const router = useRouter();
  const user = useAuth();
  const { items, clearCart } = useCart();
  const products = useMemo(() => getAllProducts(), []);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [delivery, setDelivery] = useState<DeliveryDetails>(emptyDelivery);

  const lineTitles = items
    .map((item) => products.find((product) => product.id === item.productId)?.title)
    .filter((title): title is string => Boolean(title));

  const total = getCartTotal(items, products, user?.role);

  const canProceed =
    deliveryMethod === "pickup" ||
    (deliveryMethod === "delivery" && isDeliveryComplete(delivery));

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (user?.email && delivery.email === "") {
      setDelivery((current) => ({ ...current, email: user.email }));
    }
  }, [user?.email, delivery.email]);

  function updateDeliveryField(field: keyof DeliveryDetails, value: string) {
    setDelivery((current) => ({ ...current, [field]: value }));
  }

  function handlePay() {
    if (lineTitles.length === 0 || !deliveryMethod || !canProceed) {
      return;
    }

    if (user) {
      createOrder({
        userId: user.id,
        items: lineTitles,
        total,
        deliveryMethod,
        delivery: deliveryMethod === "delivery" ? delivery : undefined,
      });
    }

    clearCart();
    onClose();
    router.push("/panier/confirmation");
  }

  const inputClassName =
    "w-full rounded-2xl border border-emerald-100 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white";

  const loginRedirect = encodeURIComponent("/panier?checkout=1");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 py-8 sm:items-center sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[calc(100vh-4rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#EFBF04]">
              Paiement
            </p>
            <h2 id="checkout-modal-title" className="mt-2 text-2xl font-semibold text-emerald-900">
              Finaliser votre commande
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
            aria-label="Fermer la fenêtre"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4">
            <h3 className="font-semibold text-emerald-900">Mode de réception</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Préférez-vous retirer en magasin ou vous faire livrer ?
            </p>

            <fieldset className="mt-4 space-y-3">
              <legend className="sr-only">Mode de réception</legend>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 transition-colors has-checked:border-emerald-400 has-checked:bg-emerald-50">
                <input
                  type="radio"
                  name="delivery-method"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className="h-4 w-4 accent-emerald-700"
                />
                <span className="text-sm font-medium text-emerald-900">Retrait en magasin</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 transition-colors has-checked:border-emerald-400 has-checked:bg-emerald-50">
                <input
                  type="radio"
                  name="delivery-method"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="h-4 w-4 accent-emerald-700"
                />
                <span className="text-sm font-medium text-emerald-900">Livraison</span>
              </label>
            </fieldset>

            {deliveryMethod === "delivery" && (
              <div className="mt-5 space-y-4 border-t border-emerald-100 pt-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="checkout-email">
                    Adresse mail
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={delivery.email}
                    onChange={(event) => updateDeliveryField("email", event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="checkout-firstName">
                      Prénom
                    </label>
                    <input
                      id="checkout-firstName"
                      type="text"
                      value={delivery.firstName}
                      onChange={(event) => updateDeliveryField("firstName", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="checkout-lastName">
                      Nom
                    </label>
                    <input
                      id="checkout-lastName"
                      type="text"
                      value={delivery.lastName}
                      onChange={(event) => updateDeliveryField("lastName", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="checkout-address">
                    Adresse postale
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={delivery.address}
                    onChange={(event) => updateDeliveryField("address", event.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="checkout-postalCode">
                    Code postale
                  </label>
                  <input
                    id="checkout-postalCode"
                    type="text"
                    value={delivery.postalCode}
                    onChange={(event) => updateDeliveryField("postalCode", event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-4">
            <div className="flex items-center justify-between text-lg font-semibold text-emerald-900">
              <span>Total</span>
              <span>{total.toLocaleString("fr-FR")} €</span>
            </div>

            {user ? (
              <button
                type="button"
                onClick={handlePay}
                disabled={!canProceed}
                className="mt-4 w-full rounded-full bg-[#EFBF04] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9a903] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Payer {total.toLocaleString("fr-FR")} €
              </button>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <h3 className="font-semibold text-emerald-900">Suivez vos commandes</h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Connectez-vous pour retrouver vos commandes dans votre compte et suivre leur
                    avancement.
                  </p>
                  <Link
                    href={`/login?redirect=${loginRedirect}`}
                    className="mt-4 inline-flex w-full justify-center rounded-full bg-[#EFBF04] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9a903]"
                  >
                    Se connecter
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handlePay}
                  disabled={!canProceed}
                  className="w-full rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-medium text-emerald-900 transition-colors hover:border-emerald-400 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Poursuivre sans compte
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
