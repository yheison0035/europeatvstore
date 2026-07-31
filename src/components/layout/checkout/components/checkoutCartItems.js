"use client";
import { getProductImage } from "@/lib/website";

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
          <img
            src={getProductImage(item)}
            alt={item.name}
            className="w-16 h-16 rounded-lg object-contain bg-(--bg-soft)"
          />

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
