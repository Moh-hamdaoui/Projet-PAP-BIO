import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/components/AuthProvider";
import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import type { Product } from "@/components/ProductCard";
import productsData from "@/test-data/products.json";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const products = productsData.products as Product[];

function renderCatalog() {
  return render(
    <AuthProvider>
      <BoutiqueCatalog products={products} />
    </AuthProvider>,
  );
}

describe("BoutiqueCatalog et ProductCard", () => {
  it("affiche le filtre et le contenu des produits sur la page", () => {
    renderCatalog();

    const filter = screen.getByLabelText(/filtrer/i);
    expect(filter).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cafés" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Chocolats" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Matés" })).toBeInTheDocument();

    const { cafe, chocolat, mate } = productsData.samples;

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
});
