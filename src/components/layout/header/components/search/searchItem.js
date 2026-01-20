"use client";

import { useState, useEffect } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";

export default function SearchItem({ product }) {
  const { addToCart, getItem, ready } = useCart();

  const itemInCart = ready ? getItem(product.id) : null;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (itemInCart) {
      setQty(itemInCart.quantity);
    }
  }, [itemInCart]);

  if (!ready) {
    return <div className="p-6 text-sm text-gray-400">Cargando carrito...</div>;
  }

  const outOfStock = product.stock === 0;
  const alreadyInCart = Boolean(itemInCart);

  return (
    <div
      className="
        grid grid-cols-1 md:grid-cols-[120px_1fr_220px]
        gap-6
        p-6
        border-b border-[var(--border-soft)]
        bg-white
      "
    >
      <div className="flex items-center justify-center">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-xs text-gray-400">IMG</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-base">{product.name}</p>

        <p className="text-sm text-[var(--text-secondary)]">
          {product.description}
        </p>

        <div className="mt-1">
          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400 mr-2">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-bold text-[var(--cta-primary)]">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Stock disponible: {product.stock}
        </p>

        {alreadyInCart && (
          <span className="text-xs text-green-600 mt-1">
            ✔ Ya está en el carrito
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="border rounded p-1"
          >
            <MinusIcon className="w-4 h-4" />
          </button>

          <span className="font-medium">{qty}</span>

          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="border rounded p-1"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          disabled={outOfStock}
          onClick={() => addToCart(product, qty)}
          className="
            bg-[var(--cta-primary)]
            text-white
            py-2 rounded-lg
            font-medium
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {outOfStock
            ? "Sin stock"
            : alreadyInCart
              ? "Actualizar carrito"
              : "Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}
