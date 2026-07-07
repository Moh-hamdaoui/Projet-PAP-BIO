import ContactIcon from "./ContactIcon";

const emailLinks = [
  "plateformebio@yahoo.fr",
  "couleurcafebio@gmail.com",
] as const;

export default function ContactInfo() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
        Coordonn&eacute;es
      </p>
      <h2 className="mt-3 text-2xl font-extrabold text-black">
        Nous contacter
      </h2>

      <div className="mt-6 space-y-5">
        <div className="flex gap-4">
          <ContactIcon name="address" />
          <div>
            <h3 className="font-bold text-black">Adresse</h3>
            <address className="mt-1 not-italic leading-7 text-zinc-700">
              8 impasse Jean Pinturier
              <br />
              <span className="text-zinc-500">(dans Rue de Galavesse)</span>
              <br />
              42610 Saint-Romain-le-Puy
            </address>
          </div>
        </div>

        <div className="flex gap-4">
          <ContactIcon name="phone" />
          <div>
            <h3 className="font-bold text-black">T&eacute;l&eacute;phone</h3>
            <a
              href="tel:+33698862270"
              className="mt-1 inline-block text-zinc-700 underline decoration-[#EFBF04] underline-offset-4 transition-colors hover:text-black"
            >
              06 98 86 22 70
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <ContactIcon name="mail" />
          <div>
            <h3 className="font-bold text-black">Emails</h3>
            <div className="mt-1 flex flex-col gap-1">
              {emailLinks.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="break-words text-zinc-700 underline decoration-[#EFBF04] underline-offset-4 transition-colors hover:text-black"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <ContactIcon name="website" />
          <div>
            <h3 className="font-bold text-black">Atelier de torr&eacute;faction</h3>
            <a
              href="http://www.couleurcafebio.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block break-words text-zinc-700 underline decoration-[#EFBF04] underline-offset-4 transition-colors hover:text-black"
            >
              www.couleurcafebio.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
