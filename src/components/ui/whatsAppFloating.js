"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating({ offsetBottom = 20 }) {
  const phone = "573147337602";
  const message = "Hola 👋, estoy interesado en un producto de EUROPEATVSTORE";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{ bottom: offsetBottom }}
      className="
        fixed right-5 z-50
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-green-500 text-white
        shadow-lg
        hover:scale-105 transition
      "
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
