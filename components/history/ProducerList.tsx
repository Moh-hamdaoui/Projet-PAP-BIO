type Producer = {
  name: string;
  location: string;
  description: string;
  url?: string;
};

type ProducerListProps = {
  producers: Producer[];
};

export default function ProducerList({ producers }: ProducerListProps) {
  return (
    <section className="border-t border-zinc-200 py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
          Présentation
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-black">
          Les artisans et producteurs
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {producers.map((producer) => (
          <article
            key={producer.name}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <h3 className="text-lg font-bold text-black">{producer.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[#8F6A00]">
              {producer.location}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              {producer.description}
            </p>
            {producer.url && (
              <a
                href={producer.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block break-words text-sm font-semibold text-[#8F6A00] underline decoration-[#EFBF04] underline-offset-4 transition-colors hover:text-black"
              >
                {producer.url}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
