type AgendaHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export default function AgendaHero({ eyebrow, title, intro }: AgendaHeroProps) {
  return (
    <section className="py-10 lg:py-14">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-black sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-700">{intro}</p>
    </section>
  );
}
