import ProductPage from "@/components/layout/pdp/productPage";

export default async function ContentPDP({ params }) {
  const { category, product } = params;
  return <ProductPage category={category} productSlug={product} />;
}

export async function generateMetadata({ params }) {
  const { category, product } = params;

  const title = `${product
    .replace(/-/g, " ")
    .toUpperCase()} | Compra en EUROPEATVSTORE`;

  const description =
    "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega, envío rápido y ofertas reales en Colombia.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.europeatvstore.com/${category}/${product}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.europeatvstore.com/${category}/${product}`,
      siteName: "EUROPEATVSTORE",
      locale: "es_CO",
      type: "product",
    },
  };
}
