type HistoryTextBlockProps = {
  title: string;
  paragraphs: string[];
  accent?: boolean;
};

export default function HistoryTextBlock({
  title,
  paragraphs,
  accent = false,
}: HistoryTextBlockProps) {
  return (
    <section
      className={`rounded-xl border p-6 sm:p-8 ${
        accent
          ? "border-[#EFBF04]/50 bg-[#EFBF04]/10"
          : "border-zinc-200 bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
