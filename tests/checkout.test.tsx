import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PanierPage from "@/app/panier/page";
import LoginPage from "@/app/login/page";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import { ProductsProvider } from "@/components/ProductsProvider";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { createToken, getAuthToken, saveAuthToken } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/orders";
import usersData from "@/data/users.json";
import { samples, testProducts } from "@/tests/testProducts";

const pushMock = vi.fn();
const replaceMock = vi.fn();
let searchParams = new URLSearchParams();

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
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

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
  useSearchParams: () => searchParams,
}));

const cafe = samples.cafe;
const particulier = usersData.users.find((user) => user.role === "particulier")!;

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <ProductsProvider products={testProducts}>
        <CartProvider>{ui}</CartProvider>
      </ProductsProvider>
    </AuthProvider>,
  );
}

function openCheckoutModal() {
  fireEvent.click(screen.getByRole("button", { name: /^payer$/i }));
}

function selectPickup() {
  fireEvent.click(screen.getByRole("radio", { name: /retrait en magasin/i }));
}

describe("checkout", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushMock.mockReset();
    replaceMock.mockReset();
    searchParams = new URLSearchParams();
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ productId: cafe.id, quantity: 1 }]),
    );
  });

  it("affiche le bouton Payer sur la page panier", () => {
    renderWithProviders(<PanierPage />);

    expect(screen.getByRole("button", { name: /^payer$/i })).toBeInTheDocument();
  });

  it("ouvre une modale avec le choix retrait ou livraison", () => {
    renderWithProviders(<PanierPage />);
    openCheckoutModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/préférez-vous retirer en magasin ou vous faire livrer/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /retrait en magasin/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /livraison/i })).toBeInTheDocument();
  });

  it("affiche les champs de livraison et bloque le paiement tant qu'ils sont incomplets", () => {
    renderWithProviders(<PanierPage />);
    openCheckoutModal();

    fireEvent.click(screen.getByRole("radio", { name: /livraison/i }));

    expect(screen.getByLabelText(/adresse mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse postale/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postale/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /poursuivre sans compte/i })).toBeDisabled();
  });

  it("permet un paiement invité sans enregistrer de commande", () => {
    const ordersBefore = getOrdersForUser(particulier.id).length;

    renderWithProviders(<PanierPage />);
    openCheckoutModal();
    selectPickup();

    fireEvent.click(screen.getByRole("button", { name: /poursuivre sans compte/i }));

    expect(getOrdersForUser(particulier.id)).toHaveLength(ordersBefore);
    expect(getOrdersForUser(particulier.id).some((order) => order.id === "CMD-1004")).toBe(false);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe("[]");
    expect(pushMock).toHaveBeenCalledWith("/panier/confirmation");
  });

  it("enregistre la commande et vide le panier pour un utilisateur connecté", () => {
    const token = createToken(particulier);
    saveAuthToken(token);

    renderWithProviders(<PanierPage />);
    openCheckoutModal();
    selectPickup();

    fireEvent.click(screen.getByRole("button", { name: /payer 28 €/i }));

    const orders = getOrdersForUser(particulier.id);
    expect(orders.some((order) => order.id === "CMD-1004")).toBe(true);
    expect(orders.find((order) => order.id === "CMD-1004")?.items).toContain(cafe.title);
    expect(orders.find((order) => order.id === "CMD-1004")?.deliveryMethod).toBe("pickup");
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe("[]");
    expect(pushMock).toHaveBeenCalledWith("/panier/confirmation");
  });

  it("propose la connexion avec redirection vers le panier", () => {
    renderWithProviders(<PanierPage />);
    openCheckoutModal();

    expect(screen.getByRole("link", { name: /se connecter/i })).toHaveAttribute(
      "href",
      "/login?redirect=%2Fpanier%3Fcheckout%3D1",
    );
  });

  it("permet de se connecter sans avoir choisi le mode de réception", () => {
    renderWithProviders(<PanierPage />);
    openCheckoutModal();

    const loginLink = screen.getByRole("link", { name: /se connecter/i });
    expect(loginLink).not.toHaveAttribute("aria-disabled", "true");

    fireEvent.click(loginLink);

    expect(loginLink).toHaveAttribute("href", "/login?redirect=%2Fpanier%3Fcheckout%3D1");
  });

  it("rouvre la modale après connexion via le paramètre checkout", () => {
    searchParams = new URLSearchParams("checkout=1");
    renderWithProviders(<PanierPage />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("redirige vers le panier après connexion avec le paramètre redirect", () => {
    searchParams = new URLSearchParams("redirect=/panier?checkout=1");
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: particulier.email },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: particulier.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(getAuthToken()).not.toBeNull();
    expect(pushMock).toHaveBeenCalledWith("/panier?checkout=1");
  });
});
