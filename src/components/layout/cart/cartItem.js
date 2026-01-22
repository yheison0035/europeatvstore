"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import { getColorHexByName } from "@/utils/getColor";

export default function CartItem({ item }) {
  const { addToCart, removeFromCart, decreaseItem } = useCart();

  const isLowStock = item.stock <= 3;

  return (
    <div
      className="
        flex gap-4 py-5
        border-b border-[var(--border-soft)]
      "
    >
      <div
        className="
          w-20 h-20
          rounded-xl
          flex items-center justify-center
          overflow-hidden
        "
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-xs text-[var(--text-muted)]">IMG</span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <p className="font-semibold text-sm text-[var(--text-primary)] leading-tight">
          {item.name}
        </p>

        {item.color && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span>Color:</span>
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full border border-[var(--border-strong)]"
                style={{ backgroundColor: getColorHexByName(item.color) }}
              />
              <span className="capitalize">{item.color}</span>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-1">
          {item.oldPrice && (
            <span className="text-xs text-[var(--text-muted)] line-through">
              ${item.oldPrice.toLocaleString()}
            </span>
          )}

          <span className="text-sm font-bold text-[var(--cta-primary)]">
            ${item.price.toLocaleString()}
          </span>

          {item.discount > 0 && (
            <span
              className="
                text-[10px] font-semibold
                bg-red-100
                text-[var(--danger)]
                px-2 py-0.5
                rounded-full
              "
            >
              -{item.discount}%
            </span>
          )}
        </div>

        <p
          className={`text-xs mt-1 ${
            isLowStock ? "text-[var(--warning)]" : "text-[var(--text-muted)]"
          }`}
        >
          {isLowStock
            ? `¡Solo quedan ${item.stock} disponibles!`
            : `Stock disponible: ${item.stock}`}
        </p>

        <div className="flex items-center mt-3">
          <div
            className="
              flex items-center
              border border-[var(--border-soft)]
              rounded-lg
              overflow-hidden
            "
          >
            <button
              onClick={() => decreaseItem(item.key)}
              disabled={item.quantity <= 1}
              className="
                px-2 py-1
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                disabled:opacity-40
                transition
                cursor-pointer
              "
            >
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="px-3 text-sm font-medium min-w-[32px] text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => addToCart(item, 1)}
              disabled={item.quantity >= item.stock}
              className="
                px-2 py-1
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                disabled:opacity-40
                transition
                cursor-pointer
              "
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-bold text-[var(--text-primary)]">
          ${(item.price * item.quantity).toLocaleString()}
        </span>

        <button
          onClick={() => removeFromCart(item.key)}
          title="Eliminar producto"
          className="
            text-[var(--text-muted)]
            hover:text-[var(--danger)]
            transition
            cursor-pointer
          "
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
