import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import {
  clearAuthToken,
  createToken,
  saveAuthToken,
  validateUser,
} from "@/lib/auth";
import { samples, testProducts } from "@/tests/testProducts";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const products = testProducts;

function renderCatalog() {
  return render(
    <AuthProvider>
      <CartProvider>
        <BoutiqueCatalog products={products} />
      </CartProvider>
    </AuthProvider>,
  );
}

describe("BoutiqueCatalog et ProductCard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("affiche le filtre et le contenu des produits sur la page", () => {
    renderCatalog();

    const filter = screen.getByLabelText(/filtrer/i);
    expect(filter).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cafés" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Chocolats" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Matés" })).toBeInTheDocument();

    const { cafe, chocolat, mate } = samples;

    expect(screen.getByRole("heading", { name: cafe.title })).toBeInTheDocument();
    expect(screen.getByText(`${cafe.partiPrice} €`)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: cafe.title })).toHaveAttribute(
      "src",
      "/cafe/El_Palomar.jpeg",
    );

    fireEvent.change(filter, { target: { value: "chocolat" } });
    expect(screen.getByRole("heading", { name: chocolat.title })).toBeInTheDocument();
    expect(screen.getByText(`${chocolat.partiPrice} €`)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: cafe.title })).not.toBeInTheDocument();

    fireEvent.change(filter, { target: { value: "mate" } });
    expect(screen.getByRole("heading", { name: mate.title })).toBeInTheDocument();
    expect(screen.getByText(`${mate.partiPrice} €`)).toBeInTheDocument();
  });

  it("affiche les tarifs pro pour un compte professionnel connecté", () => {
    const proUser = validateUser("pro@example.com", "password123");
    expect(proUser).toBeDefined();
    saveAuthToken(createToken(proUser!));

    renderCatalog();

    const { cafe } = samples;
    expect(screen.getByText(`${cafe.proPrice} €`)).toBeInTheDocument();
    expect(screen.queryByText(`${cafe.partiPrice} €`)).not.toBeInTheDocument();

    clearAuthToken();
  });
});
