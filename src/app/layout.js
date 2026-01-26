import Providers from "@/context/providers";
import { ToastProvider } from "@/context/toastContext";
import { NavProvider } from "@/context/navigationContext";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://www.europeatvstore.com"),
  title: {
    default: "EUROPEATVSTORE | Tecnología, Hogar y Bienestar en Colombia",
    template: "%s | EUROPEATVSTORE",
  },
  description:
    "Compra productos innovadores para el hogar, tecnología, cocina y bienestar. Ofertas exclusivas, pago contraentrega y envíos a toda Colombia.",
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
        url: "/og-image.jpg", // 👈 aquí irá la imagen que estamos creando
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <NavProvider>
          <ToastProvider>
            <Providers>{children}</Providers>
          </ToastProvider>
        </NavProvider>
      </body>
    </html>
  );
}
