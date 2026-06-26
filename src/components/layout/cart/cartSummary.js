"use client";

import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { useWebsiteContext } from "@/context/websiteContext";
import { getWhatsapp } from "@/lib/website";

export default function CartSummary({ onClose }) {
  const { items } = useCart();
  const { website } = useWebsiteContext();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const whatsapp = getWhatsapp(website);

  const products = items
    .map((item) => {
      let text = `• ${item.name}\n`;

      if (item.color) {
        text += `Color: ${item.color}\n`;
      }

      text += `Cantidad: ${item.quantity}\n`;
      text += `Precio: $${item.price.toLocaleString()}`;

      return text;
    })
    .join("\n\n");

  const message = `🛒 *SOLICITUD DE COMPRA*

      Hola, deseo realizar la siguiente compra:

      ${products}

      ━━━━━━━━━━━━━━

      *Subtotal:* $${subtotal.toLocaleString()}

      ━━━━━━━━━━━━━━

      Quedo atento para finalizar el pedido.`;

  const whatsappUrl = whatsapp
    ? `https://wa.me/57${whatsapp.replace(
        /\D/g,
        "",
      )}?text=${encodeURIComponent(message)}`
    : "#";

  return (
    <div className="border-t border-(--border-soft) p-4 space-y-4">
      <div className="flex justify-between text-base font-semibold">
        <span className="text-(--text-primary)">Subtotal</span>

        <span className="text-(--cta-primary)">
          ${subtotal.toLocaleString()}
        </span>
      </div>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
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
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <FaWhatsapp className="w-7 h-7 text-white" />
        </div>

        <div className="flex flex-col text-left text-white">
          <span className="font-semibold text-base">
            Continuar por WhatsApp
          </span>

          <span className="text-xs opacity-90">
            Finaliza tu compra con uno de nuestros asesores
          </span>
        </div>
      </Link>

      <div className="rounded-lg bg-(--bg-soft) border border-(--border-soft) p-3">
        <p className="text-xs text-(--text-secondary) leading-5">
          Al continuar por WhatsApp uno de nuestros asesores verificará la
          disponibilidad del inventario, calculará el costo del envío según tu
          ciudad y finalizará tu pedido.
        </p>
      </div>

      <div className="pt-2 text-center">
        <Link
          href="/"
          onClick={onClose}
          className="
            inline-flex
            items-center
            gap-1
            text-sm
            text-(--text-muted)
            hover:text-(--brand-primary)
            underline
            underline-offset-4
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
