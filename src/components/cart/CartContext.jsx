import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS, DELIVERY_FEE, FREE_DELIVERY_FROM, PROMO } from "@/lib/catalog";

const STORAGE_KEY = "famipollo.cart.v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setEntries(parsed.filter((entry) => entry && entry.id && Number(entry.qty) > 0));
      }
    } catch {
      setEntries([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, hydrated]);

  const add = useCallback((id, qty = 1) => {
    setEntries((prev) => {
      const found = prev.find((entry) => entry.id === id);
      if (found) return prev.map((entry) => (entry.id === id ? { ...entry, qty: entry.qty + qty } : entry));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setEntries((prev) =>
      qty <= 0 ? prev.filter((entry) => entry.id !== id) : prev.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
    );
  }, []);

  const remove = useCallback((id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clear = useCallback(() => setEntries([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo(
    () =>
      entries
        .map((entry) => {
          const product = PRODUCTS.find((item) => item.id === entry.id);
          return product ? { ...product, qty: entry.qty, lineTotal: product.price * entry.qty } : null;
        })
        .filter(Boolean),
    [entries],
  );

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const discount = subtotal >= PROMO.min ? Math.round((subtotal * PROMO.percent) / 100) : 0;
  const missingForPromo = Math.max(PROMO.min - subtotal, 0);
  const total = subtotal - discount + delivery;

  const value = {
    items,
    count,
    subtotal,
    delivery,
    discount,
    missingForPromo,
    total,
    add,
    setQty,
    remove,
    clear,
    isOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}