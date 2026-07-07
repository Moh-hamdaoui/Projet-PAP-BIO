import HistoryHero from "./HistoryHero";
import HistoryImageSection from "./HistoryImageSection";
import HistoryTextBlock from "./HistoryTextBlock";
import OrderInfo from "./OrderInfo";
import ProducerList from "./ProducerList";
import content from "@/data/historyPage.json";

export default function HistoryPageContent() {
  return (
    <>
      <HistoryHero {...content.hero} />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <HistoryTextBlock
          title={content.intro.title}
          paragraphs={content.intro.paragraphs}
          accent
        />
        <HistoryImageSection
          title={content.platform.title}
          paragraphs={content.platform.paragraphs}
          image={content.platform.image}
        />
      </div>

      <HistoryImageSection
        title={content.bioPlatform.title}
        paragraphs={content.bioPlatform.paragraphs}
        image={content.bioPlatform.image}
        imageSide="left"
      />

      <ProducerList producers={content.producers} />
      <OrderInfo title={content.order.title} paragraphs={content.order.paragraphs} />
    </>
  );
}
