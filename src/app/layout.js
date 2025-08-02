import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/cartContext";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EuropeaTvStore",
  description:
    "Descubre el producto de televentas más útil y necesario para tu hogar. Compra fácil, rápido y seguro desde nuestra tienda online. ¡Promoción por tiempo limitado!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
