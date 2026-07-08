import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AgendaPage from "@/app/agenda/page";
import content from "@/data/agendaPage.json";

describe("AgendaPage", () => {
  it("affiche l'introduction et la section des salons", () => {
    render(<AgendaPage />);

    expect(screen.getByRole("heading", { name: content.hero.title })).toBeInTheDocument();
    expect(screen.getByText(content.hero.intro)).toBeInTheDocument();
    expect(screen.getByText(content.eventsSection.title)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: content.eventsSection.subtitle })).toBeInTheDocument();
  });

  it("affiche tous les événements et marchés prévus", () => {
    render(<AgendaPage />);

    for (const event of content.events) {
      expect(screen.getByRole("heading", { name: event.title })).toBeInTheDocument();
      expect(screen.getByText(event.dateLabel)).toBeInTheDocument();

      if (event.subtitle) {
        expect(screen.getByText(event.subtitle)).toBeInTheDocument();
      }

      if (event.location) {
        expect(screen.getByText(event.location)).toBeInTheDocument();
      }

      if (event.hours) {
        expect(screen.getByText(event.hours)).toBeInTheDocument();
      }
    }
  });

  it("distingue les événements des périodes de fermeture", () => {
    render(<AgendaPage />);

    const eventCount = content.events.filter((event) => event.type === "event").length;
    const closureCount = content.events.filter((event) => event.type === "closure").length;

    expect(screen.getAllByText("Événement")).toHaveLength(eventCount);
    expect(screen.getAllByText("Fermeture")).toHaveLength(closureCount);
  });

  it("affiche l'atelier avec son adresse et ses horaires d'ouverture", () => {
    render(<AgendaPage />);

    const { establishment } = content;

    expect(screen.getByRole("heading", { name: establishment.title })).toBeInTheDocument();
    expect(
      screen.getByText(`Ouvert à ${establishment.location} (${establishment.postalCode})`),
    ).toBeInTheDocument();

    const address = screen.getByRole("group");
    expect(address).toHaveTextContent(establishment.address);
    expect(address).toHaveTextContent(establishment.addressNote);
    expect(address).toHaveTextContent(`${establishment.postalCode} ${establishment.location}`);
    expect(screen.getByText(establishment.hours)).toBeInTheDocument();
  });
});
