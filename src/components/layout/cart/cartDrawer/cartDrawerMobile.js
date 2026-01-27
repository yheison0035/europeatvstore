// cart/cartDrawerMobile.jsx
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import CartItem from "../cartItem";
import CartSummary from "../cartSummary";

export default function CartDrawerMobile({ open, onClose }) {
  const { items } = useCart();

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-998" onClick={onClose} />

      <aside
        className="
          fixed bottom-0 left-0 right-0
          h-[85dvh]
          bg-(--bg-page)
          z-999
          rounded-t-2xl
          flex flex-col
          animate-slide-up
        "
      >
        <div className="flex justify-center py-2">
          <div className="w-10 h-1.5 rounded-full bg-(--border-soft)" />
        </div>

        <div className="flex items-center justify-between px-4 pb-2 border-b border-(--border-soft)">
          <h2 className="text-lg font-semibold">Tu carrito</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-center text-(--text-muted) mt-10">
              Tu carrito está vacío
            </p>
          ) : (
            items.map((item) => <CartItem key={item.key} item={item} />)
          )}
        </div>

        {items.length > 0 && <CartSummary onClose={onClose} />}
      </aside>
    </>
  );
}
