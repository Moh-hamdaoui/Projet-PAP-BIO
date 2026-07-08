import AgendaEstablishment from "./AgendaEstablishment";
import AgendaEvents, { type AgendaEvent } from "./AgendaEvents";
import AgendaHero from "./AgendaHero";
import content from "@/data/agendaPage.json";

export default function AgendaPageContent() {
  return (
    <>
      <AgendaHero {...content.hero} />
      <AgendaEvents
        title={content.eventsSection.title}
        subtitle={content.eventsSection.subtitle}
        events={content.events as AgendaEvent[]}
      />
      <AgendaEstablishment {...content.establishment} />
    </>
  );
}
