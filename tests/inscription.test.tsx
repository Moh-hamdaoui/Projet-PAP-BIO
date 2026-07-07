import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import InscriptionParticulierPage from "@/app/inscription-particulier/page";
import { findUserByEmail } from "@/lib/auth";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Inscription particulier", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("affiche une erreur si des champs sont vides", () => {
    render(<InscriptionParticulierPage />);

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    expect(screen.getByText(/merci de remplir tous les champs/i)).toBeInTheDocument();
  });

  it("crée un compte particulier et confirme l'inscription", () => {
    const email = `test-${Date.now()}@example.com`;

    render(<InscriptionParticulierPage />);

    fireEvent.change(screen.getByLabelText(/^prénom$/i), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByLabelText(/^nom$/i), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "motdepasse123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    expect(screen.getByText(/compte créé avec succès/i)).toBeInTheDocument();
    expect(findUserByEmail(email)?.role).toBe("particulier");
    expect(screen.getByLabelText(/adresse e-mail/i)).toHaveValue("");
  });
});
