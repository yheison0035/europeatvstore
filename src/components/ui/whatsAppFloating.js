"use client";

import { useWebsiteContext } from "@/context/websiteContext";
import { getCompanyName, getWhatsappDigits } from "@/lib/website";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating({ offsetBottom = 20 }) {
  const { website } = useWebsiteContext();

  const companyName = getCompanyName(website);
  const phone = getWhatsappDigits(website);

  // Sin número configurado no se muestra el botón (cada empresa pone el suyo).
  if (!phone) return null;

  const message = companyName
    ? `Hola 👋, estoy interesado en un producto de ${companyName}`
    : "Hola 👋, estoy interesado en un producto";

  return (
    <Link
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
    </Link>
  );
}
