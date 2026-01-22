"use client";

import { useState } from "react";
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import { getColorHexByName } from "@/utils/getColor";
import { useToast } from "@/context/toastContext";

export default function SearchItem({ product }) {
  const { addToCart, getItemsByProduct, ready } = useCart();
  const toast = useToast();

  const [selectedColor, setSelectedColor] = useState(null);
  const [colorStock, setColorStock] = useState(0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  if (!ready) return null;

  const hasColors = product.colors?.length > 0;
  const itemsInCart = getItemsByProduct(product.id);

  const handleAdd = () => {
    if (hasColors && !selectedColor) {
      setError("Selecciona un color para continuar");
      return;
    }

    if (qty > colorStock) {
      setError(`Solo hay ${colorStock} unidades disponibles`);
      return;
    }

    const result = addToCart(
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

    if (!result.ok) {
      toast.error(
        `Ya tienes todo el stock disponible de ${selectedColor} en el carrito`,
      );
      return;
    }

    toast.success("Producto añadido al carrito");
    setError(null);
  };

  const MAX_CHARS = 100;
  const isLongText = product.description?.length > MAX_CHARS;
  const shortDescription = isLongText
    ? product.description.slice(0, MAX_CHARS) + "..."
    : product.description;

  return (
    <div
      className="
        grid grid-cols-1 md:grid-cols-[100px_1fr_220px]
        gap-5 p-5
        border-b border-[var(--border-soft)]
        bg-[var(--bg-page)]
      "
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-[var(--text-primary)]">
          {product.name}
        </p>

        <div className="text-sm text-[var(--text-secondary)]">
          <p className={expanded ? "" : "line-clamp-2"}>
            {expanded ? product.description : shortDescription}
          </p>

          {isLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="
                mt-1 text-xs font-medium
                text-[var(--cta-primary)]
                hover:underline
                cursor-pointer
              "
            >
              {expanded ? "Ocultar" : "Leer más"}
            </button>
          )}
        </div>

        {hasColors && (
          <div className="mt-2">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
              Color
            </p>

            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColor(c.name);
                    setColorStock(c.stock);
                    setError(null);

                    const existing = itemsInCart.find(
                      (i) => i.color === c.name,
                    );
                    setQty(existing ? existing.quantity : 1);
                  }}
                  className={`w-4 h-4 rounded-full border transition cursor-pointer ${
                    selectedColor === c.name
                      ? "border-[var(--brand-primary)] scale-110"
                      : "border-[var(--border-strong)]"
                  }`}
                  style={{ backgroundColor: getColorHexByName(c.name) }}
                />
              ))}
            </div>

            {selectedColor && (
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Stock {selectedColor}: {colorStock}
              </p>
            )}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-sm line-through text-[var(--text-muted)]">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}

          <span className="text-xl font-bold text-[var(--cta-primary)]">
            ${product.price.toLocaleString()}
          </span>

          {product.discount > 0 && (
            <span className="text-xs bg-red-100 text-[var(--danger)] px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        {selectedColor &&
          itemsInCart.some((i) => i.color === selectedColor) && (
            <p className="text-xs mt-1 text-[var(--success)]">
              ✔ Este color ya está en tu carrito
            </p>
          )}

        {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
      </div>

      <div className="flex flex-col gap-3 items-start">
        <div className="flex items-center border border-[var(--border-soft)] rounded-lg h-9 overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <MinusIcon className="w-4 h-4" />
          </button>

          <span className="px-4 text-sm font-semibold min-w-[40px] text-center">
            {qty}
          </span>

          <button
            disabled={!selectedColor || qty >= colorStock}
            onClick={() => setQty((q) => q + 1)}
            className="px-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-40 cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="
            w-full
            flex items-center justify-center gap-2
            bg-[var(--cta-primary)]
            text-white
            py-2 rounded-lg
            font-medium
            hover:bg-[var(--cta-primary-hover)]
            transition
            cursor-pointer
          "
        >
          <ShoppingCartIcon className="w-4 h-4 opacity-90" />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
