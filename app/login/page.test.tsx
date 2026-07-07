import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAuthToken } from "@/lib/auth";
import LoginPage from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("renders the login form and registration links", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /accédez à votre espace pap bio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /s'inscrire particulier/i })).toHaveAttribute("href", "/inscription-particulier");
    expect(screen.getByRole("link", { name: /s'inscrire client pro/i })).toHaveAttribute("href", "/demande-client-pro");
  });

  it("connecte un utilisateur valide et redirige vers l'accueil", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: "pro@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(getAuthToken()).not.toBeNull();
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("redirige sans créer de session si les identifiants sont invalides", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: "inconnu@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "mauvais-mot-de-passe" },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(getAuthToken()).toBeNull();
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
