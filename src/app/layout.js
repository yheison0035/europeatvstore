import Providers from "@/context/providers";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata = {
  title: "EuropeaTvStore",
  description: "Productos de televentas seleccionados para el hogar moderno.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
