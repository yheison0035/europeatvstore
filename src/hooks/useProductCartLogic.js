"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import { useToast } from "@/context/toastContext";

export default function useProductCartLogic(product, initialQty = 1) {
  const { addToCart, updateItemQuantity, getItemsByProduct, ready } = useCart();

  const toast = useToast();

  const [selectedColor, setSelectedColor] = useState(null);
  const [colorStock, setColorStock] = useState(0);
  const [qty, setQty] = useState(initialQty);
  const [error, setError] = useState(null);

  const hasColors = product.colors?.length > 0;
  const itemsInCart = getItemsByProduct(product.id);

  useEffect(() => {
    if (hasColors && product.colors.length === 1) {
      selectColor(product.colors[0]);
    }
  }, [hasColors, product.colors]);

  function selectColor(color) {
    setSelectedColor(color.name);
    setColorStock(color.stock);
    setError(null);

    const existing = itemsInCart.find((i) => i.color === color.name);

    setQty(existing ? existing.quantity : initialQty);
  }

  function incrementQty() {
    if (qty < colorStock) setQty((q) => q + 1);
  }

  function decrementQty() {
    setQty((q) => Math.max(1, q - 1));
  }

  function handleAddToCart() {
    if (hasColors && !selectedColor) {
      setError("Selecciona un color");
      return;
    }

    if (qty > colorStock) {
      setError(`Solo hay ${colorStock} unidades disponibles`);
      return;
    }

    const key = `${product.id}-${selectedColor}`;
    const existing = itemsInCart.find((i) => i.color === selectedColor);

    if (!existing) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice ?? null,
          discount: product.discount ?? 0,
          image: product.image,
          color: selectedColor,
          stock: colorStock,
        },
        qty,
      );
    } else {
      updateItemQuantity(key, qty);
    }

    toast.success("Carrito actualizado");
    setError(null);
  }

  const alreadyInCart = !!itemsInCart.find((i) => i.color === selectedColor);

  const actionLabel = alreadyInCart
    ? "Actualizar carrito"
    : "Añadir al carrito";

  return {
    ready,
    hasColors,
    selectedColor,
    colorStock,
    qty,
    error,
    alreadyInCart,
    actionLabel,
    selectColor,
    incrementQty,
    decrementQty,
    handleAddToCart,
  };
}
