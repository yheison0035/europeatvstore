"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { getProductImage } from "@/lib/website";

/**
 * Imagen de un producto.
 *
 * Cuando el producto no tiene foto se pinta un marcador que ocupa TODO el
 * recuadro, en vez de dejar un hueco blanco o el texto suelto. En miniaturas
 * pequeñas (`compact`) solo se muestra el icono, porque el texto no se leería.
 */
export default function ProductImage({
  product,
  alt,
  className = "",
  compact = false,
}) {
  const src = getProductImage(product);
  const name = alt ?? product?.name ?? "Producto";

  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${name} (sin imagen)`}
        className="
          w-full h-full
          flex flex-col items-center justify-center gap-1
          bg-(--bg-muted) text-(--text-muted)
        "
      >
        <PhotoIcon className={compact ? "w-1/2 max-w-8" : "w-1/3 max-w-20"} />
        {!compact && <span className="text-xs">Sin imagen</span>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className={className} />
  );
}
