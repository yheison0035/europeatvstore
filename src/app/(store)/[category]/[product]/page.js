import ProductPage from "@/components/layout/pdp/productPage";
import {
  fetchFromApi,
  getSiteUrl,
  getWebsiteConfig,
} from "@/lib/website.server";

export default async function ContentPDP(props) {
  const params = await props.params;
  const category = params.category;
  const product = params.product;

  const siteUrl = await getSiteUrl();

  return (
    <ProductPage category={category} productSlug={product} siteUrl={siteUrl} />
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const category = params?.category;
  const productSlug = params?.product;

  const siteUrl = await getSiteUrl();
  const website = await getWebsiteConfig();

  const company = website?.company;
  const settings = website?.settings;

  const siteName = company?.websiteName || company?.name || "Tienda online";

  const baseDescription =
    settings?.metaDescription || `Compra online en ${siteName}.`;

  if (!category || !productSlug) {
    return {
      title: siteName,
      description: baseDescription,
      alternates: { canonical: siteUrl },
    };
  }

  // Datos reales del producto (si el backend no responde, se usa el slug).
  const response = await fetchFromApi(
    `/ecommerce/product/${productSlug}`,
  ).catch(() => null);

  const product = response?.data || null;

  const productName =
    product?.name ||
    productSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const description = product?.description
    ? product.description.replace(/\s+/g, " ").trim().slice(0, 160)
    : `${productName} en ${siteName}. ${baseDescription}`;

  const url = `${siteUrl}/${category}/${productSlug}`;

  const images = product?.images?.length
    ? product.images.slice(0, 4).map((image) => ({ url: image }))
    : company?.logo
      ? [{ url: company.logo }]
      : [];

  return {
    // El layout raíz añade el nombre del sitio con su plantilla "%s | Sitio".
    title: productName,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${productName} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "es_CO",
      type: "website",
      images,
    },
  };
}
