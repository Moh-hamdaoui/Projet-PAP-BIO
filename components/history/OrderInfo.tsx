type OrderInfoProps = {
  title: string;
  paragraphs: string[];
};

export default function OrderInfo({ title, paragraphs }: OrderInfoProps) {
  return (
    <section className="my-10 rounded-xl bg-black p-7 text-white sm:p-10">
      <h2 className="text-3xl font-extrabold underline decoration-[#EFBF04] decoration-4 underline-offset-4">
        {title}
      </h2>
      <div className="mt-6 space-y-4 text-xl leading-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
