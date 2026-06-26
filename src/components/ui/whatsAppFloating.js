"use client";

import { useWebsiteContext } from "@/context/websiteContext";
import { getCompanyName, getWhatsapp } from "@/lib/website";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating({ offsetBottom = 20 }) {
  const { website } = useWebsiteContext();

  const companyName = getCompanyName(website);
  const whatsapp = getWhatsapp(website);

  const phone = whatsapp || "3147337602";
  const message =
    website?.whatsappMessage ||
    `Hola 👋, estoy interesado en un producto de ${companyName || "EUROPEATVSTORE"}`;

  return (
    <Link
      href={`https://wa.me/57${phone}?text=${encodeURIComponent(message)}`}
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
