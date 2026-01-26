"use client";

import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getColorHexByName } from "@/utils/getColor";
import { slugifyCategory } from "@/utils/slugify";
import useProductCartLogic from "@/hooks/useProductCartLogic";

export default function CatalogProductCard({ product, category }) {
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
    alreadyInCart,
    actionLabel,
  } = useProductCartLogic(product, 1);

  if (!ready) return null;

  return (
    <article
      className="
        group
        relative
        bg-(--bg-page)
        border border-(--border-soft)
        rounded-2xl
        overflow-hidden
        transition-all
        hover:shadow-(--shadow-lg)
        hover:-translate-y-1
        flex flex-col
      "
    >
      <Link href={`/${category}/${slugifyCategory(product.name)}`} prefetch>
        <div className="relative aspect-square bg-(--bg-soft)">
          <div className="relative aspect-square bg-(--bg-soft) cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className="
                    w-full h-full object-contain p-4
                    transition-transform duration-300
                    group-hover:scale-105
                "
            />
          </div>

          {product.discount > 0 && (
            <span
              className="
                absolute top-4 left-4
                bg-(--danger)
                text-white text-xs font-bold
                px-3 py-1 rounded-full
                shadow
              "
            >
              -{product.discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <Link href={`/${category}/${slugifyCategory(product.name)}`} prefetch>
          <h3
            className="
                text-sm font-semibold text-(--text-primary)
                line-clamp-2 hover:underline
            "
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-(--cta-primary)">
            ${product.price.toLocaleString()}
          </span>

          {product.oldPrice && (
            <span className="text-xs line-through text-(--text-muted)">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {hasColors && (
          <div className="flex items-center gap-2 mt-1">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => selectColor(c)}
                className={`
                  w-5 h-5 rounded-full border
                  transition cursor-pointer
                  ${
                    selectedColor === c.name
                      ? "border-(--brand-accent) scale-110"
                      : "border-(--border-strong)"
                  }
                `}
                style={{ backgroundColor: getColorHexByName(c.name) }}
              />
            ))}
          </div>
        )}

        {selectedColor && (
          <p className="text-xs text-(--text-muted)">
            Stock disponible: {colorStock}
          </p>
        )}

        {error && (
          <p className="text-xs text-(--danger) font-medium">{error}</p>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-(--text-muted)">Cantidad</span>

            <div className="flex items-center border border-(--border-soft) rounded-lg overflow-hidden">
              <button
                onClick={decrementQty}
                className="px-3 py-1 hover:bg-(--bg-soft) cursor-pointer"
              >
                <MinusIcon className="w-4 h-4" />
              </button>

              <span className="px-4 text-sm font-semibold">{qty}</span>

              <button
                onClick={incrementQty}
                disabled={qty >= colorStock}
                className="px-3 py-1 hover:bg-(--bg-soft) disabled:opacity-40 cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {alreadyInCart && (
            <p className="text-xs mt-1 text-(--success)">
              ✔ Este color ya está en tu carrito ({qty})
            </p>
          )}
          <button
            onClick={handleAddToCart}
            className="
              w-full
              flex items-center justify-center gap-2
              bg-(--cta-primary)
              hover:bg-(--cta-primary-hover)
              text-white
              py-2.5 rounded-xl
              font-semibold text-sm
              transition
              cursor-pointer
            "
          >
            <ShoppingCartIcon className="w-4 h-4" />
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
