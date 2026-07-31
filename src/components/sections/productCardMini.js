"use client";

import Link from "next/link";
import ProductImage from "@/components/ui/productImage";
import { slugifyCategory } from "@/utils/slugify";

export default function ProductCardMini({ product }) {
  if (!product) return null;

  return (
    <Link
      href={`/${slugifyCategory(product.category)}/${product.slug}`}
      className="block h-full"
    >
      <article
        className="
          group
          relative
          h-full
          w-full
          max-w-60

          rounded-xl
          border border-(--border-soft)
          bg-(--bg-page)
          p-3

          flex flex-col
          transition
          hover:shadow-(--shadow-md)
        "
      >
        {product.discount > 0 && (
          <span
            className="
              absolute top-2 left-2 z-10
              bg-(--danger)
              text-white
              text-xs font-semibold
              px-2 py-0.5
              rounded-full
            "
          >
            -{product.discount}%
          </span>
        )}

        <div className="relative w-full h-32 rounded-lg overflow-hidden flex items-center justify-center">
          <ProductImage
            product={product}
            className="
              max-w-full max-h-full
              object-contain
              transition-transform
              group-hover:scale-105
            "
          />
        </div>

        <div className="mt-3 flex flex-col flex-1">
          <p
            className="
              text-sm font-medium text-(--text-primary)
              line-clamp-2
              min-h-11
              hover:underline
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

          <span
            className="
              mt-auto pt-2
              text-xs font-semibold
              text-(--brand-primary)
              group-hover:text-(--brand-accent)
              transition
            "
          >
            Ver producto →
          </span>
        </div>
      </article>
    </Link>
  );
}
