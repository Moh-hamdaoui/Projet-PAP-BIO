import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
});
