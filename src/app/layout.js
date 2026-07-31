import Providers from "@/context/providers";
import { ToastProvider } from "@/context/toastContext";
import { NavProvider } from "@/context/navigationContext";
import { getFontClass } from "@/styles/fonts";
import { buildThemeCss } from "@/styles/themes";
import "@/styles/globals.css";
import GlobalUI from "@/components/layout/globalUI";
import { getSiteUrl, getWebsiteConfig } from "@/lib/website.server";

// Todo depende del dominio de la petición: nada se puede prerenderizar.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const siteUrl = await getSiteUrl();
  const website = await getWebsiteConfig();

  const company = website?.company;
  const settings = website?.settings;

  if (!company) {
    // Sin configuración no sabemos de qué negocio es el dominio.
    return {
      title: "Sitio web",
      description: "Sitio web",
    };
  }

  const title = settings?.metaTitle || company.websiteName || company.name;

  const description =
    settings?.metaDescription || `Compra online en ${company.name}`;

  const logo = company.logo;
  const favicon = company.favicon || "/favicon.ico";

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: title,
      template: `%s | ${title}`,
    },

    description,

    alternates: {
      canonical: siteUrl,
    },

    icons: {
      icon: favicon,
    },

    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: company.name,
      locale: "es_CO",
      type: "website",
      images: logo ? [{ url: logo }] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }) {
  // El tema, los colores y la tipografía salen de la empresa dueña del dominio.
  // Se resuelven en el servidor para que la tienda no parpadee al cargar.
  const website = await getWebsiteConfig();
  const company = website?.company;

  const themeCss = buildThemeCss(company);
  const fontClass = getFontClass(company?.fontFamily);

  return (
    <html lang="es" data-theme={company?.theme || "clasico"}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className={`${fontClass} antialiased`}>
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
