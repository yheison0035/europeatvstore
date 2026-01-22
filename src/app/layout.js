import Providers from "@/context/providers";
import { ToastProvider } from "@/context/toastContext";
import { NavProvider } from "@/context/navigationContext";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata = {
  title: {
    default: "EUROPEATVSTORE | Tecnología, Hogar y Bienestar",
    template: "%s | EUROPEATVSTORE",
  },
  description:
    "Compra productos innovadores para el hogar, tecnología, cocina, bienestar y más. Envíos a toda Colombia.",
  keywords: [
    "tienda online",
    "productos para el hogar",
    "hidrolavadoras",
    "tecnología",
    "streaming",
    "cocina",
  ],
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
