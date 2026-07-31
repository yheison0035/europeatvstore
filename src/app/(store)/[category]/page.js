import CatalogClient from "@/components/layout/catalog/catalogClient";
import BreadcrumbSchema from "@/components/seo/breadcrumbSchema";
import { getSiteUrl, getWebsiteConfig } from "@/lib/website.server";

export default async function CatalogPage(props) {
  const params = await props.params;
  const category = params.category;

  const siteUrl = await getSiteUrl();

  return (
    <>
      <BreadcrumbSchema category={category} siteUrl={siteUrl} />
      <CatalogClient category={category} />
    </>
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const category = params?.category;

  const siteUrl = await getSiteUrl();
  const website = await getWebsiteConfig();

  const company = website?.company;
  const settings = website?.settings;

  const siteName = company?.websiteName || company?.name || "Tienda online";

  const baseDescription =
    settings?.metaDescription || `Compra online en ${siteName}.`;

  if (!category) {
    return {
      title: siteName,
      description: baseDescription,
      alternates: { canonical: siteUrl },
      openGraph: {
        title: siteName,
        description: baseDescription,
        url: siteUrl,
        siteName,
        locale: "es_CO",
        type: "website",
      },
    };
  }

  const categoryName = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const url = `${siteUrl}/${category}`;
  const description = `${categoryName} en ${siteName}. ${baseDescription}`;

  return {
    // El layout raíz añade el nombre del sitio con su plantilla "%s | Sitio".
    title: categoryName,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${categoryName} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "es_CO",
      type: "website",
    },
  };
}
