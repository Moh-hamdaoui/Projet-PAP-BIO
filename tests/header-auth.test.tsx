import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import {
  clearAuthToken,
  createToken,
  saveAuthToken,
  validateUser,
} from "@/lib/auth";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: pushMock,
  }),
}));

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

function renderHeader() {
  return render(
    <AuthProvider>
      <CartProvider>
        <Header />
      </CartProvider>
    </AuthProvider>,
  );
}

describe("Header auth", () => {
  beforeEach(() => {
    pushMock.mockReset();
    window.localStorage.clear();
  });

  it("affiche le lien de connexion quand l'utilisateur est déconnecté", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: /se connecter/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /se déconnecter/i })).not.toBeInTheDocument();
  });

  it("affiche le bouton de déconnexion après connexion", async () => {
    renderHeader();

    const user = validateUser("particulier@example.com", "password123");
    expect(user).toBeDefined();
    saveAuthToken(createToken(user!));
    window.dispatchEvent(new Event("pap-bio-auth-change"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /se déconnecter/i })).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: /^se connecter$/i })).not.toBeInTheDocument();
  });

  it("déconnecte l'utilisateur et redirige vers la page de connexion", async () => {
    const user = validateUser("particulier@example.com", "password123");
    saveAuthToken(createToken(user!));

    renderHeader();
    window.dispatchEvent(new Event("pap-bio-auth-change"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /se déconnecter/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /se déconnecter/i }));

    expect(pushMock).toHaveBeenCalledWith("/login");
    clearAuthToken();
    expect(screen.queryByRole("button", { name: /se déconnecter/i })).not.toBeInTheDocument();
  });
});
