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

  alternates: {
    canonical: "https://www.europeatvstore.com",
  },

  openGraph: {
    title: "EUROPEATVSTORE® | Tecnología, Hogar y Ofertas en Colombia",
    description:
      "Compra productos innovadores para el hogar y tecnología. Pago contraentrega y envíos a toda Colombia.",
    url: "https://www.europeatvstore.com",
    siteName: "EUROPEATVSTORE",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.europeatvstore.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "EUROPEATVSTORE",
      },
    ],
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
