"use client";

import useProductCartLogic from "@/hooks/useProductCartLogic";
import { getColorHexByName } from "@/utils/getColor";
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const FREE_SHIPPING_FROM = 100000;

export default function ProductInfo({ product, category }) {
  const {
    ready,
    hasColors,
    selectedColor,
    colorStock,
    qty,
    error,
    selectColor,
    incrementQty,
    decrementQty,
    handleAddToCart,
    actionLabel,
  } = useProductCartLogic({ ...product, category }, 1);

  if (!ready) return null;

  const freeShipping = product.price * qty >= FREE_SHIPPING_FROM;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--text-primary)">
        {product.name}
      </h1>

      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-(--cta-primary)">
          ${product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <>
            <span className="line-through text-(--text-muted)">
              ${product.oldPrice.toLocaleString()}
            </span>
            <span className="text-(--danger) font-semibold">
              -{product.discount}%
            </span>
          </>
        )}
      </div>

      <p
        className={`text-sm ${
          freeShipping ? "text-(--success)" : "text-(--text-muted)"
        }`}
      >
        {freeShipping
          ? "✔ Envío gratis"
          : "Envío gratis por compras desde $100.000"}
      </p>

      {hasColors && (
        <div>
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => selectColor(c)}
                className={`
                  w-7 h-7 rounded-full border
                  ${
                    selectedColor === c.name
                      ? "border-(--brand-accent) scale-110"
                      : "border-(--border-soft)"
                  }
                `}
                style={{ backgroundColor: getColorHexByName(c.name) }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="text-sm">Cantidad</span>
        <div className="flex items-center border rounded-lg">
          <button onClick={decrementQty} className="p-2">
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="px-4 font-semibold">{qty}</span>
          <button
            onClick={incrementQty}
            disabled={qty >= colorStock}
            className="p-2 disabled:opacity-40"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && <p className="text-(--danger) text-sm">{error}</p>}

      <button
        onClick={handleAddToCart}
        className="
          w-full
          bg-(--cta-primary)
          hover:bg-(--cta-primary-hover)
          text-white
          py-3 rounded-xl
          font-semibold
          flex items-center justify-center gap-2
        "
      >
        <ShoppingCartIcon className="w-5 h-5" />
        {actionLabel}
      </button>

      <button
        className="
          w-full
          border border-(--border-soft)
          py-3 rounded-xl
          font-semibold
          hover:bg-(--bg-soft)
        "
      >
        Comprar ahora
      </button>
    </div>
  );
}
