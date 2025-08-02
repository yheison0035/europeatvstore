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
    const exists = cartItems.find(
      (item) => item.id === product.id && item.color === product.color
    );

    setCartItems((prev) =>
      exists
        ? prev.filter(
            (item) => !(item.id === product.id && item.color === product.color)
          )
        : [...prev, product]
    );
  };

  const addToCart = (product) => {
    console.log(product);
    const exists = cartItems.some(
      (item) => item.id === product.id && item.color === product.color
    );
    if (!exists) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const isInCart = (product) =>
    cartItems.some(
      (item) => item.id === product.id && item.color === product.color
    );

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, toggleItem, addToCart, isInCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
