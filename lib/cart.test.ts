import { describe, expect, it } from "vitest";
import type { Product } from "@/components/ProductCard";
import {
  addItem,
  CART_STORAGE_KEY,
  getCartItemCount,
  getCartLineTotal,
  getCartTotal,
  loadCart,
  removeItem,
  saveCart,
  updateQuantity,
} from "@/lib/cart";

const sampleProduct: Product = {
  id: "el-palomar",
  title: "Café El Palomar 1 Kg Grain",
  partiPrice: 28,
  proPrice: 24,
  image: "/cafe/El_Palomar.jpeg",
  category: "cafe",
};

describe("cart", () => {
  it("ajoute un produit et incrémente la quantité si déjà présent", () => {
    const firstAdd = addItem([], sampleProduct.id, 1);
    expect(firstAdd).toEqual([{ productId: sampleProduct.id, quantity: 1 }]);

    const secondAdd = addItem(firstAdd, sampleProduct.id, 2);
    expect(secondAdd).toEqual([{ productId: sampleProduct.id, quantity: 3 }]);
  });

  it("met à jour et supprime une ligne", () => {
    const items = addItem([], sampleProduct.id, 1);

    expect(updateQuantity(items, sampleProduct.id, 4)).toEqual([
      { productId: sampleProduct.id, quantity: 4 },
    ]);

    expect(removeItem(items, sampleProduct.id)).toEqual([]);
    expect(updateQuantity(items, sampleProduct.id, 0)).toEqual([]);
  });

  it("calcule le nombre total d'articles", () => {
    const items = addItem(addItem([], sampleProduct.id, 2), "blanc", 3);
    expect(getCartItemCount(items)).toBe(5);
  });

  it("calcule le total particulier et pro", () => {
    const items = [{ productId: sampleProduct.id, quantity: 2 }];
    const products = [sampleProduct];

    expect(getCartLineTotal(items[0], sampleProduct, "particulier")).toBe(56);
    expect(getCartLineTotal(items[0], sampleProduct, "pro")).toBe(48);
    expect(getCartTotal(items, products, "particulier")).toBe(56);
    expect(getCartTotal(items, products, "pro")).toBe(48);
  });

  it("ignore les produits inconnus dans le total", () => {
    const items = [
      { productId: sampleProduct.id, quantity: 1 },
      { productId: "produit-inexistant", quantity: 5 },
    ];

    expect(getCartTotal(items, [sampleProduct], "particulier")).toBe(28);
  });

  it("charge et sauvegarde le panier dans localStorage", () => {
    const items = [{ productId: sampleProduct.id, quantity: 2 }];

    saveCart(items);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe(JSON.stringify(items));
    expect(loadCart()).toEqual(items);
  });

  it("retourne un panier vide si le JSON est invalide ou absent", () => {
    expect(loadCart()).toEqual([]);

    window.localStorage.setItem(CART_STORAGE_KEY, "pas-du-json");
    expect(loadCart()).toEqual([]);
  });
});
