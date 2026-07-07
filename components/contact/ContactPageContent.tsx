import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ProfessionalContactBanner from "./ProfessionalContactBanner";

export default function ContactPageContent() {
  return (
    <>
      <ContactHero />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ContactInfo />
        <ContactForm />
      </div>

      <ProfessionalContactBanner />
    </>
  );
}
