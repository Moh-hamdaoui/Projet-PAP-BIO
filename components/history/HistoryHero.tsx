import Image from "next/image";

type HistoryHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
};

export default function HistoryHero({
  eyebrow,
  title,
  intro,
  image,
}: HistoryHeroProps) {
  return (
    <section className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_420px] lg:py-14">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EFBF04]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-black sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-zinc-700">
          {intro}
        </p>
      </div>

      <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#EFBF04]/40 bg-zinc-100">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 420px, 100vw"
        />
      </div>
    </section>
  );
}
