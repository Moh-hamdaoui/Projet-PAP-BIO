type AgendaEstablishmentProps = {
  title: string;
  location: string;
  postalCode: string;
  address: string;
  addressNote: string;
  hours: string;
};

export default function AgendaEstablishment({
  title,
  location,
  postalCode,
  address,
  addressNote,
  hours,
}: AgendaEstablishmentProps) {
  return (
    <section className="rounded-lg bg-[#b8956a] px-6 py-8 text-white sm:px-8 sm:py-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">
        Notre atelier
      </p>
      <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <p className="mt-2 text-lg font-medium">
        Ouvert à {location} ({postalCode})
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-bold">Adresse</h3>
          <address className="mt-2 not-italic leading-7 text-white/90">
            {address}
            <br />
            <span className="text-white/70">{addressNote}</span>
            <br />
            {postalCode} {location}
          </address>
        </div>

        <div>
          <h3 className="font-bold">Horaires d&apos;ouverture</h3>
          <p className="mt-2 text-lg leading-7 text-white/90">{hours}</p>
        </div>
      </div>
    </section>
  );
}
