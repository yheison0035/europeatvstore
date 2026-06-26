"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { useWebsiteContext } from "@/context/websiteContext";

import {
  getCompanyName,
  getPhone,
  getEmail,
  getWhatsapp,
  getAddress,
  getSchedule,
  getFacebook,
  getInstagram,
  getTikTok,
  getFooterText,
} from "@/lib/website";

export default function Footer() {
  const pathname = usePathname();

  const { website } = useWebsiteContext();

  const companyName = getCompanyName(website);
  const phone = getPhone(website);
  const email = getEmail(website);
  const whatsapp = getWhatsapp(website);
  const address = getAddress(website);
  const schedule = getSchedule(website);

  const facebook = getFacebook(website);
  const instagram = getInstagram(website);
  const tiktok = getTikTok(website);

  const footerText = getFooterText(website);

  const isActive = (href) => pathname === href;

  const handleNavigate = () => {
    // asegura que al cambiar de documento legal,
    // el usuario empiece a leer desde arriba
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-(--bg-dark) text-(--text-inverted)">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestra empresa</h3>

            <p className="text-sm text-(--text-muted) mb-4 leading-relaxed">
              {companyName} es una tienda online colombiana especializada en
              productos para el hogar, tecnología, salud y bienestar, ofreciendo
              soluciones prácticas con envíos a todo el país.
            </p>

            <ul className="space-y-2 text-sm text-(--text-muted)">
              <li>
                <Link
                  href="/legal/quienes-somos"
                  onClick={handleNavigate}
                  className={`
                    transition
                    ${
                      isActive("/legal/quienes-somos")
                        ? "text-(--brand-accent) font-medium underline"
                        : "hover:text-(--brand-accent)"
                    }
                  `}
                >
                  Quiénes somos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información legal</h3>

            <nav aria-label="Información legal">
              <ul className="space-y-2 text-sm text-(--text-muted)">
                {[
                  {
                    href: "/legal/terminos-y-condiciones",
                    label: "Términos y condiciones",
                  },
                  {
                    href: "/legal/politicas-de-privacidad",
                    label: "Políticas de privacidad",
                  },
                  {
                    href: "/legal/autorizacion-de-datos",
                    label: "Autorización de datos",
                  },
                  {
                    href: "/legal/derecho-de-retracto",
                    label: "Derecho de retracto",
                  },
                  {
                    href: "/legal/politica-de-envios",
                    label: "Política de envíos",
                  },
                  {
                    href: "/legal/cambios-y-devoluciones",
                    label: "Cambios y devoluciones",
                  },
                  { href: "/legal/garantias", label: "Política de garantías" },
                  {
                    href: "/legal/condiciones-de-promociones",
                    label: "Condiciones de promociones",
                  },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleNavigate}
                      className={`
                        transition
                        ${
                          isActive(item.href)
                            ? "text-(--brand-accent) font-medium underline"
                            : "hover:text-(--brand-accent)"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="https://sedeelectronica.sic.gov.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-(--brand-accent)"
                  >
                    Superintendencia de Industria y Comercio (SIC)
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctenos</h3>

            <address className="not-italic space-y-3 text-sm text-(--text-muted)">
              <p className="flex items-center gap-3">
                <FaWhatsapp className="text-(--brand-accent)" />
                <Link
                  href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                  className="hover:text-(--brand-accent)"
                  target="_blank"
                >
                  {whatsapp}
                </Link>
              </p>

              <p className="flex items-center gap-3">
                <EnvelopeIcon className="w-4 h-4 text-(--brand-accent)" />
                <Link
                  href={`mailto:${email}`}
                  className="hover:text-(--brand-accent)"
                >
                  {email}
                </Link>
              </p>

              <p className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-(--brand-accent)" />
                +57 {phone}
              </p>

              <p className="flex items-center gap-3">
                <MapPinIcon className="w-4 h-4 text-(--brand-accent)" />
                {address}
              </p>

              <p className="flex items-center gap-3">
                <ClockIcon className="w-4 h-4 text-(--brand-accent)" />
                {schedule}
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>

            <nav aria-label="Redes sociales" className="flex gap-4 mb-6">
              {[
                {
                  icon: <FaInstagram />,
                  href: instagram,
                  label: "Instagram",
                },
                {
                  icon: <FaTiktok />,
                  href: tiktok,
                  label: "TikTok",
                },
                {
                  icon: <FaFacebookF />,
                  href: facebook,
                  label: "Facebook",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    bg-(--brand-secondary)
                    text-(--text-inverted)
                    hover:bg-(--brand-accent)
                    hover:text-(--bg-dark)
                    transition
                  "
                >
                  {social.icon}
                </Link>
              ))}
            </nav>

            <ul className="space-y-2 text-sm text-(--text-muted)">
              <li className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-(--brand-accent)" />
                Compra segura
              </li>
              <li className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-(--brand-accent)" />
                Envíos a todo Colombia
              </li>
              <li className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-(--brand-accent)" />
                Atención por WhatsApp
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300/20" />

      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-(--text-muted)">
        © 2026 <strong>{companyName}</strong>. Todos los derechos reservados.
        <p className="mt-2 text-xs">{footerText}</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: { companyName },
            url: "https://www.europeatvstore.com",
            logo: "https://www.europeatvstore.com/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Itagüí",
              addressRegion: "Antioquia",
              addressCountry: "CO",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+57-314-733-7602",
              contactType: "customer service",
              areaServed: "CO",
              availableLanguage: ["Spanish"],
            },
            sameAs: [
              "https://www.instagram.com/europeatvstore",
              "https://www.facebook.com/europeatvstore",
              "https://www.tiktok.com/@europeatvstore_oficial",
            ],
          }),
        }}
      />
    </footer>
  );
}
