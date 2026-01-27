// cart/cartDrawerDesktop.jsx
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import CartItem from "../cartItem";
import CartSummary from "../cartSummary";

export default function CartDrawerDesktop({ open, onClose }) {
  const { items } = useCart();

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-998" onClick={onClose} />

      <aside
        className="
          fixed right-0 top-0
          w-full max-w-md
          h-dvh
          bg-(--bg-page)
          z-999
          flex flex-col
          shadow-(--shadow-lg)
        "
      >
        <div className="flex items-center justify-between p-4 border-b border-(--border-soft)">
          <h2 className="text-lg font-semibold">Tu carrito</h2>
          <button onClick={onClose} className="cursor-pointer">
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
