import {
  Inter,
  Poppins,
  Montserrat,
  Roboto,
  Playfair_Display,
} from "next/font/google";

/**
 * Tipografías disponibles para la tienda. La empresa elige una desde el CRM
 * (Company.fontFamily guarda la clave, no la fuente completa).
 */

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const FONTS = {
  inter: { label: "Inter", font: inter },
  poppins: { label: "Poppins", font: poppins },
  montserrat: { label: "Montserrat", font: montserrat },
  roboto: { label: "Roboto", font: roboto },
  playfair: { label: "Playfair Display", font: playfair },
};

export const DEFAULT_FONT = "inter";

export function getFontClass(name) {
  return (FONTS[name] || FONTS[DEFAULT_FONT]).font.className;
}
