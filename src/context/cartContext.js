"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar o aumentar producto
  const addToCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item.id === product.id && item.color === product.color
      );

      if (index !== -1) {
        const updated = [...prev];
        const currentQty = updated[index].quantity || 1;
        updated[index].quantity = currentQty + 1;
        return updated;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Quitar o disminuir producto
  const removeFromCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item.id === product.id && item.color === product.color
      );

      if (index !== -1) {
        const updated = [...prev];
        const currentQty = updated[index].quantity || 1;

        if (currentQty > 1) {
          updated[index].quantity = currentQty - 1;
          return updated;
        } else {
          return updated.filter(
            (item) => !(item.id === product.id && item.color === product.color)
          );
        }
      }

      return prev;
    });
  };

  // Eliminar completamente un producto del carrito
  const removeAllOfProduct = (product) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === product.id && item.color === product.color)
      )
    );
  };

  // Saber si está en el carrito
  const isInCart = (product) =>
    cartItems.some(
      (item) => item.id === product.id && item.color === product.color
    );

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeAllOfProduct,
        isInCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
