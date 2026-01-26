"use client";

import Link from "next/link";
import { slugifyCategory } from "@/utils/slugify";

export default function ProductCardMini({ product }) {
  if (!product) return null;

  return (
    <div
      className="
        group relative
        rounded-xl
        border border-(--border-soft)
        bg-(--bg-page)
        p-3
        flex flex-col
        hover:shadow-(--shadow-md)
        transition
        h-full
      "
    >
      {product.discount > 0 && (
        <span
          className="
            absolute top-2 left-2 z-10
            bg-(--danger)
            text-(--text-inverted)
            text-xs font-semibold
            px-2 py-0.5
            rounded-full
          "
        >
          -{product.discount}%
        </span>
      )}

      <div className="relative w-full h-32 rounded-lg overflow-hidden shrink-0">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="
              w-full h-full
              object-contain
              transition
              group-hover:scale-105
            "
          />
        )}
      </div>

      <div className="mt-3 flex flex-col flex-1">
        <p
          className="
            text-sm font-medium text-(--text-primary)
            line-clamp-2
            min-h-11
          "
        >
          {product.name}
        </p>

        <div className="mt-2 leading-tight">
          {product.oldPrice && (
            <span className="block text-xs text-(--text-muted) line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-bold text-(--cta-primary)">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <Link
          href={`/producto/${slugifyCategory(product.name)}`}
          className="
            mt-auto pt-2
            inline-block
            text-xs font-semibold
            text-(--brand-primary)
            hover:text-(--brand-accent)
            transition
          "
        >
          Ver producto →
        </Link>
      </div>
    </div>
  );
}
