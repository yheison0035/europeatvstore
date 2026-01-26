"use client";

import Link from "next/link";
import { useCart } from "@/context/cartContext";
import {
  CreditCardIcon,
  BanknotesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const SHIPPING_RULES = [
  { min: 0, max: 50000, price: 16000 },
  { min: 50001, max: 99999, price: 21000 },
];

const FREE_SHIPPING_FROM = 100000;

export default function CartSummary({ onClose }) {
  const { items } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let shipping = 0;
  let shippingLabel = "Gratis";
  let shippingMessage = "Por compras superiores a $100.000";

  if (subtotal < FREE_SHIPPING_FROM) {
    const rule = SHIPPING_RULES.find(
      (r) => subtotal >= r.min && subtotal <= r.max,
    );

    shipping = rule?.price || 0;
    shippingLabel = `$${shipping.toLocaleString()}`;
    shippingMessage = `Te faltan $${(
      FREE_SHIPPING_FROM - subtotal
    ).toLocaleString()} para envío gratis`;
  }

  const total = subtotal + shipping;

  return (
    <div className="border-t border-(--border-soft) p-4 space-y-4">
      <div className="flex justify-between text-sm text-(--text-secondary)">
        <span>Subtotal</span>
        <span className="font-medium text-(--text-primary)">
          ${subtotal.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex flex-col">
          <span className="text-(--text-secondary)">Envío</span>
          <span className="text-xs text-(--text-muted)">{shippingMessage}</span>
        </div>
        <span
          className={`font-medium ${
            shipping === 0 ? "text-(--success)" : "text-(--text-primary)"
          }`}
        >
          {shippingLabel}
        </span>
      </div>

      <div className="flex justify-between text-base font-semibold">
        <span className="text-(--text-primary)">Total</span>
        <span className="text-(--cta-primary)">${total.toLocaleString()}</span>
      </div>

      <Link
        href="/checkout"
        onClick={onClose}
        className="
          flex items-center justify-center gap-2
          w-full
          bg-(--cta-primary)
          text-(--text-inverted)
          py-3 rounded-lg
          font-medium
          hover:opacity-90
          transition
        "
      >
        <CreditCardIcon className="w-5 h-5" />
        Proceder al pago en línea
      </Link>

      <Link
        href="/checkout"
        onClick={onClose}
        className="
          flex items-center justify-center gap-2
          w-full
          bg-(--success)
          text-(--text-inverted)
          py-3 rounded-lg
          font-medium
          hover:opacity-90
          transition
        "
      >
        <BanknotesIcon className="w-5 h-5" />
        Pago contra entrega
      </Link>

      <div className="pt-2 text-center">
        <Link
          href="/"
          onClick={onClose}
          className="
            inline-flex items-center gap-1
            text-sm text-(--text-muted)
            hover:text-(--brand-primary)
            underline underline-offset-4
            transition
          "
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
