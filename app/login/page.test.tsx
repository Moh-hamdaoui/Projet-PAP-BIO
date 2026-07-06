import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "./page";

describe("LoginPage", () => {
  it("renders the login form and registration links", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /accédez à votre espace pap bio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /s'inscrire particulier/i })).toHaveAttribute("href", "/inscription-particulier");
    expect(screen.getByRole("link", { name: /s'inscrire client pro/i })).toHaveAttribute("href", "/demande-client-pro");
  });
});
