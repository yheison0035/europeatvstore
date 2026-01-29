import Providers from "@/context/providers";
import { ToastProvider } from "@/context/toastContext";
import { NavProvider } from "@/context/navigationContext";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";
import GlobalUI from "@/components/layout/globalUI";

export const metadata = {
  metadataBase: new URL("https://www.europeatvstore.com"),
  title: {
    default: "EUROPEATVSTORE® | Tecnología, Hogar y Ofertas en Colombia",
    template: "%s | EUROPEATVSTORE®",
  },
  description:
    "EUROPEATVSTORE® – Tienda online en Colombia de tecnología, hogar y bienestar. Ofertas reales, pago contraentrega y envíos rápidos.",
  keywords: [
    "tienda online colombia",
    "productos para el hogar",
    "tecnología colombia",
    "gadgets",
    "hidrolavadora",
    "proyectores",
    "tv box",
    "comprar online colombia",
  ],
  openGraph: {
    title: "EUROPEATVSTORE | Tecnología, Hogar y Bienestar",
    description:
      "Tu tienda online de tecnología y hogar en Colombia. Compra fácil, rápido y seguro.",
    url: "https://www.europeatvstore.com",
    siteName: "EUROPEATVSTORE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EUROPEATVSTORE",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EUROPEATVSTORE",
      url: "https://www.europeatvstore.com",
      logo: "https://www.europeatvstore.com/logo.png",
      sameAs: [
        "https://www.facebook.com/europeatvstore",
        "https://www.instagram.com/europeatvstore",
        "https://www.tiktok.com/@europeatvstore_oficial",
      ],
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <NavProvider>
          <ToastProvider>
            <Providers>
              {children}
              <GlobalUI />
            </Providers>
          </ToastProvider>
        </NavProvider>
      </body>
    </html>
  );
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EUROPEATVSTORE",
      url: "https://www.europeatvstore.com",
      logo: "https://www.europeatvstore.com/logo.png",
      sameAs: [
        "https://www.facebook.com/europeatvstore",
        "https://www.instagram.com/europeatvstore",
        "https://www.tiktok.com/@europeatvstore",
      ],
    }),
  }}
/>;
