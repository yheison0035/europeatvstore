"use client";
import ProductImage from "@/components/ui/productImage";

import { useCart } from "@/context/cartContext";

export default function CheckoutCartItems() {
  const { items } = useCart();

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex gap-4 border-b border-(--border-soft) pb-4"
        >
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-(--bg-soft)">
            <ProductImage
              product={item}
              compact
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-(--text-primary)">
              {item.name}
            </p>
            <p className="text-xs text-(--text-muted)">
              Color: {item.color} · Cant: {item.quantity}
            </p>
          </div>

          <div className="text-sm font-semibold">
            ${(item.price * item.quantity).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
