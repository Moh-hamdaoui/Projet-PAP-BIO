export type AgendaEvent = {
  id: string;
  title: string;
  subtitle: string | null;
  location: string | null;
  dateLabel: string;
  hours: string | null;
  type: "event" | "closure";
};

type AgendaEventsProps = {
  title: string;
  subtitle: string;
  events: AgendaEvent[];
};

function EventCard({ event }: { event: AgendaEvent }) {
  const isClosure = event.type === "closure";

  return (
    <article
      className={`rounded-lg border p-5 ${
        isClosure
          ? "border-amber-200 bg-amber-50"
          : "border-zinc-200 bg-white"
      }`}
    >
      <p
        className={`text-sm font-bold uppercase tracking-[0.14em] ${
          isClosure ? "text-amber-700" : "text-[#EFBF04]"
        }`}
      >
        {isClosure ? "Fermeture" : "Événement"}
      </p>
      <h3 className="mt-2 text-xl font-extrabold text-black">{event.title}</h3>
      {event.subtitle ? (
        <p className="mt-1 text-sm text-zinc-500">{event.subtitle}</p>
      ) : null}

      <dl className="mt-4 space-y-2 text-sm leading-6 text-zinc-700">
        <div>
          <dt className="font-bold text-black">Date</dt>
          <dd>{event.dateLabel}</dd>
        </div>
        {event.location ? (
          <div>
            <dt className="font-bold text-black">Lieu</dt>
            <dd>{event.location}</dd>
          </div>
        ) : null}
        {event.hours ? (
          <div>
            <dt className="font-bold text-black">Horaires</dt>
            <dd>{event.hours}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export default function AgendaEvents({ title, subtitle, events }: AgendaEventsProps) {
  return (
    <section className="pb-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
        {title}
      </p>
      <h2 className="mt-3 text-2xl font-extrabold text-black">{subtitle}</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
