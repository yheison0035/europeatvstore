"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cartContext";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";

export default function CartDrawer({ open, onClose }) {
  const { items } = useCart();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[998]" onClick={onClose} />

      <aside
        className="
          fixed right-0 top-0 h-full w-full max-w-md
          bg-white z-[999]
          flex flex-col
          shadow-2xl
        "
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Tu carrito</h2>
          <button onClick={onClose} className="cursor-pointer">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-10">
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
