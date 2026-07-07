"use client";

import { type FormEvent } from "react";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Demande de contact");
    const message = String(formData.get("message") || "");
    const body = [`Nom : ${name}`, `Email : ${email}`, "", message].join("\n");

    window.location.href = `mailto:plateformebio@yahoo.fr?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
        Message
      </p>
      <h2 className="mt-3 text-2xl font-extrabold text-black">
        &Eacute;crivez-nous
      </h2>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold text-black" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EFBF04] focus:ring-2 focus:ring-[#EFBF04]/20"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EFBF04] focus:ring-2 focus:ring-[#EFBF04]/20"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black" htmlFor="subject">
            Sujet
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EFBF04] focus:ring-2 focus:ring-[#EFBF04]/20"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-2 w-full resize-none rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#EFBF04] focus:ring-2 focus:ring-[#EFBF04]/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
