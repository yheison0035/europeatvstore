"use client";

import useProductCartLogic from "@/hooks/useProductCartLogic";
import { getColorHexByName } from "@/utils/getColor";
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
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
    <div className="bg-white border border-(--border-soft) rounded-2xl p-4 sm:p-6 space-y-5 shadow-(--shadow-sm)">
      {/* Title */}
      <h1 className="text-lg sm:text-2xl font-semibold text-(--text-primary)">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-end gap-3 flex-wrap">
        <span className="text-2xl sm:text-3xl font-bold text-(--cta-primary)">
          ${product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <>
            <span className="line-through text-sm text-(--text-muted)">
              ${product.oldPrice.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-(--danger)">
              {product.discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Shipping */}
      <div className="flex items-center gap-2 text-sm">
        <TruckIcon className="w-5 h-5" />
        <span
          className={freeShipping ? "text-(--success)" : "text-(--text-muted)"}
        >
          {freeShipping ? "Envío gratis" : "Envío gratis desde $100.000"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-(--text-muted)">
        <ShieldCheckIcon className="w-4 h-4 text-(--success)" />
        Compra segura · Garantía incluida
      </div>

      {/* Colors */}
      {hasColors && (
        <div>
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => selectColor(c)}
                className={`
                  w-8 h-8 rounded-full border
                  ${
                    selectedColor === c.name
                      ? "border-(--brand-accent) ring-2 ring-(--brand-accent)"
                      : "border-(--border-soft)"
                  }
                `}
                style={{ backgroundColor: getColorHexByName(c.name) }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium mb-2">Cantidad</p>
        <div className="inline-flex items-center border rounded-xl">
          <button onClick={decrementQty} className="p-3">
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="px-4 font-semibold">{qty}</span>
          <button
            onClick={incrementQty}
            disabled={qty >= colorStock}
            className="p-3 disabled:opacity-40"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && <p className="text-(--danger) text-sm">{error}</p>}

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="
            w-full
            bg-(--cta-primary)
            hover:bg-(--cta-primary-hover)
            text-white
            py-4
            rounded-xl
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
            py-4
            rounded-xl
            font-semibold
            hover:bg-(--bg-soft)
          "
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}
