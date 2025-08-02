"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleItem = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    setCartItems((prev) =>
      exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, toggleItem, isInCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
