import {
  Inter,
  Poppins,
  Montserrat,
  Roboto,
  Open_Sans,
  Lato,
  Nunito,
  Raleway,
  Playfair_Display,
  Oswald,
} from "next/font/google";

/**
 * Tipografías disponibles para la tienda. La empresa elige una desde el CRM
 * (Company.fontFamily guarda la clave, no la fuente completa).
 *
 * Solo se descarga la que esté en uso: next/font únicamente inyecta la fuente
 * cuya clase se llega a renderizar. Los argumentos tienen que ser literales,
 * next/font los lee en tiempo de compilación.
 */

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const FONTS = {
  inter: { label: "Inter", font: inter },
  poppins: { label: "Poppins", font: poppins },
  montserrat: { label: "Montserrat", font: montserrat },
  roboto: { label: "Roboto", font: roboto },
  "open-sans": { label: "Open Sans", font: openSans },
  lato: { label: "Lato", font: lato },
  nunito: { label: "Nunito", font: nunito },
  raleway: { label: "Raleway", font: raleway },
  playfair: { label: "Playfair Display", font: playfair },
  oswald: { label: "Oswald", font: oswald },
};

export const DEFAULT_FONT = "inter";

export function getFontClass(name) {
  return (FONTS[name] || FONTS[DEFAULT_FONT]).font.className;
}
