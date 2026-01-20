"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "europea_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error cargando carrito", err);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        const newQty = Math.min(existing.quantity + qty, product.stock);

        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: newQty } : p,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(qty, product.stock),
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  function getItem(productId) {
    return items.find((p) => p.id === productId);
  }

  const count = items.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getItem,
        count,
        ready,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }

  return context;
}
