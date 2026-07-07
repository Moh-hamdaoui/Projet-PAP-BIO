"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FlyToCartAnimation, { type FlyAnimationPayload } from "@/components/FlyToCartAnimation";
import {
  addItem as addItemToCart,
  getCartItemCount,
  loadCart,
  removeItem as removeItemFromCart,
  saveCart,
  updateQuantity as updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (productId: string, quantity: number, animation?: Omit<FlyAnimationPayload, "imageUrl"> & { imageUrl: string }) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  cartButtonRef: React.RefObject<HTMLAnchorElement | null>;
  pulseCart: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [animation, setAnimation] = useState<FlyAnimationPayload | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [pulseCart, setPulseCart] = useState(false);
  const cartButtonRef = useRef<HTMLAnchorElement | null>(null);
  const [, setAuthVersion] = useState(0);

  useEffect(() => {
    setItems(loadCart());

    function handleAuthChange() {
      setAuthVersion((version) => version + 1);
    }

    window.addEventListener("pap-bio-auth-change", handleAuthChange);
    return () => window.removeEventListener("pap-bio-auth-change", handleAuthChange);
  }, []);

  const persist = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
    saveCart(nextItems);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setAnimation(null);
    setTargetRect(null);
    setPulseCart(true);
    window.setTimeout(() => setPulseCart(false), 400);
  }, []);

  const addItem = useCallback(
    (
      productId: string,
      quantity: number,
      flyAnimation?: Omit<FlyAnimationPayload, "imageUrl"> & { imageUrl: string },
    ) => {
      persist(addItemToCart(items, productId, quantity));

      if (flyAnimation && cartButtonRef.current) {
        setAnimation({
          fromRect: flyAnimation.fromRect,
          imageUrl: flyAnimation.imageUrl,
        });
        setTargetRect(cartButtonRef.current.getBoundingClientRect());
      }
    },
    [items, persist],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      persist(updateCartQuantity(items, productId, quantity));
    },
    [items, persist],
  );

  const removeItem = useCallback(
    (productId: string) => {
      persist(removeItemFromCart(items, productId));
    },
    [items, persist],
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: getCartItemCount(items),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        cartButtonRef,
        pulseCart,
      }}
    >
      {children}
      <FlyToCartAnimation
        animation={animation}
        targetRect={targetRect}
        onComplete={handleAnimationComplete}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
