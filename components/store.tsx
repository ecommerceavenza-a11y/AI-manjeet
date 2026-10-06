"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Item = { id: string; quantity: number };
type Store = {
  cart: Item[];
  wishlist: string[];
  add: (id: string, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  toggleWish: (id: string) => void;
  clearCart: () => void;
};

const StoreContext = createContext<Store | null>(null);

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readStored<Item[]>("av-cart", []));
    setWishlist(readStored<string[]>("av-wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("av-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("av-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<Store>(() => ({
    cart,
    wishlist,
    add: (id, quantity = 1) => setCart((items) => items.some((item) => item.id === id)
      ? items.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...items, { id, quantity }]),
    remove: (id) => setCart((items) => items.filter((item) => item.id !== id)),
    setQty: (id, quantity) => setCart((items) => quantity < 1
      ? items.filter((item) => item.id !== id)
      : items.map((item) => item.id === id ? { ...item, quantity } : item)),
    toggleWish: (id) => setWishlist((items) => items.includes(id)
      ? items.filter((item) => item !== id)
      : [...items, id]),
    clearCart: () => setCart([]),
  }), [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("StoreProvider is missing");
  return value;
}
