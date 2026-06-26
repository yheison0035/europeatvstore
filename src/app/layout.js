import Providers from "@/context/providers";
import { ToastProvider } from "@/context/toastContext";
import { NavProvider } from "@/context/navigationContext";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";
import GlobalUI from "@/components/layout/globalUI";
import { headers } from "next/headers";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"
).replace(/\/$/, "");

export async function generateMetadata() {
  try {
    const headersList = await headers();

    const host = headersList.get("host");

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const res = await fetch(`${API_URL}/website/config`, {
      headers: {
        host,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudo cargar la configuración.");
    }

    const website = await res.json();

    const company = website.company;
    const settings = website.settings;

    const title = settings?.metaTitle || company.websiteName || company.name;

    const description =
      settings?.metaDescription || `Compra en ${company.name}`;

    const logo = company.logo;
    const favicon = company.favicon || "/favicon.ico";

    return {
      metadataBase: new URL(`${protocol}://${host}`),

      title: {
        default: title,
        template: `%s | ${title}`,
      },

      description,

      icons: {
        icon: favicon,
      },

      openGraph: {
        title,
        description,
        url: `${protocol}://${host}`,
        siteName: company.name,
        locale: "es_CO",
        type: "website",
        images: logo
          ? [
              {
                url: logo,
              },
            ]
          : [],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: "Sitio Web",
      description: "Sitio Web",
    };
  }
}

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
