import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PanierPage from "@/app/panier/page";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import CartButton from "@/components/CartButton";
import ProductCard from "@/components/ProductCard";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { createToken, saveAuthToken } from "@/lib/auth";
import productsData from "@/data/products.json";
import usersData from "@/data/users.json";

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

const cafe = productsData.products[0];
const proUser = usersData.users.find((user) => user.role === "pro")!;

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <CartProvider>{ui}</CartProvider>
    </AuthProvider>,
  );
}

describe("panier", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("ajoute plusieurs unités selon la quantité choisie", () => {
    renderWithProviders(
      <>
        <CartButton />
        <ProductCard product={cafe} displayPrice={cafe.partiPrice} />
      </>,
    );

    fireEvent.change(screen.getByLabelText(new RegExp(`quantité pour ${cafe.title}`, "i")), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ajouter au panier/i }));

    expect(screen.getByLabelText(/panier, 3 articles/i)).toBeInTheDocument();
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain('"quantity":3');
  });

  it("ajoute un produit depuis ProductCard et met à jour le badge", () => {
    renderWithProviders(
      <>
        <CartButton />
        <ProductCard product={cafe} displayPrice={cafe.partiPrice} />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: /ajouter au panier/i }));

    expect(screen.getByLabelText(/panier, 1 article/i)).toBeInTheDocument();
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toContain(cafe.id);
  });

  it("affiche le récap au survol du bouton panier", () => {
    renderWithProviders(
      <>
        <CartButton />
        <ProductCard product={cafe} displayPrice={cafe.partiPrice} />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: /ajouter au panier/i }));

    const cartLink = screen.getByLabelText(/panier, 1 article/i);
    fireEvent.mouseEnter(cartLink.closest("div")!);

    expect(screen.getByText("Votre panier")).toBeInTheDocument();
    const preview = screen.getByText("Votre panier").closest("div");
    expect(preview).not.toBeNull();
    expect(within(preview!).getByText(/Café El Palomar/i)).toBeInTheDocument();
    expect(within(preview!).getAllByText("28 €").length).toBeGreaterThan(0);
  });

  it("permet de modifier les quantités et supprimer sur la page panier", () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ productId: cafe.id, quantity: 1 }]),
    );

    renderWithProviders(<PanierPage />);

    const totalBlock = screen.getByText("Total").closest("div");
    expect(totalBlock).not.toBeNull();
    expect(within(totalBlock!).getByText("28 €")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /augmenter la quantité/i }));
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getAllByText("56 €").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /supprimer/i }));
    expect(screen.getByText(/votre panier est vide/i)).toBeInTheDocument();
  });

  it("applique les tarifs pro après connexion", () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ productId: cafe.id, quantity: 2 }]),
    );

    const { rerender } = renderWithProviders(<PanierPage />);

    expect(screen.getAllByText("56 €").length).toBeGreaterThan(0);

    const token = createToken(proUser);
    saveAuthToken(token);
    window.dispatchEvent(new Event("pap-bio-auth-change"));

    rerender(
      <AuthProvider>
        <CartProvider>
          <PanierPage />
        </CartProvider>
      </AuthProvider>,
    );

    const totalBlock = screen.getByText("Total").closest("div");
    expect(totalBlock).not.toBeNull();
    expect(within(totalBlock!).getByText("48 €")).toBeInTheDocument();
  });
});
