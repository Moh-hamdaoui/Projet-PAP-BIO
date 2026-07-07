import Image from "next/image";

type HistoryImageSectionProps = {
  title: string;
  paragraphs: string[];
  image: string;
  imageSide?: "left" | "right";
};

export default function HistoryImageSection({
  title,
  paragraphs,
  image,
  imageSide = "right",
}: HistoryImageSectionProps) {
  const imageBlock = (
    <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 380px, 100vw"
      />
    </div>
  );

  const textBlock = (
    <div>
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );

  return (
    <section className="grid gap-8 border-t border-zinc-200 py-10 lg:grid-cols-[380px_1fr] lg:items-center">
      {imageSide === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          <div className="lg:order-1">{textBlock}</div>
          <div className="lg:order-2">{imageBlock}</div>
        </>
      )}
    </section>
  );
}
