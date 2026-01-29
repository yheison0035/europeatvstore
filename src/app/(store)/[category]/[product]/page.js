import ProductPage from "@/components/layout/pdp/productPage";

export default async function ContentPDP(props) {
  const params = await props.params;
  const category = params.category;
  const product = params.product;

  return <ProductPage category={category} productSlug={product} />;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const category = params?.category;
  const product = params?.product;

  // Fallback absoluto (build / prerender)
  if (!category || !product) {
    return {
      title: "EUROPEATVSTORE® | Compra online en Colombia",
      description:
        "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega, envío rápido y ofertas reales en Colombia.",
      alternates: {
        canonical: "https://www.europeatvstore.com",
      },
      openGraph: {
        title: "EUROPEATVSTORE®",
        description:
          "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega y envíos a toda Colombia.",
        url: "https://www.europeatvstore.com",
        siteName: "EUROPEATVSTORE",
        locale: "es_CO",
        type: "website",
      },
    };
  }

  const productName = product
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const url = `https://www.europeatvstore.com/${category}/${product}`;

  return {
    title: `${productName} | Compra en EUROPEATVSTORE®`,
    description:
      "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega, envío rápido y ofertas reales en Colombia.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${productName} | EUROPEATVSTORE®`,
      description:
        "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega, envío rápido y ofertas reales en Colombia.",
      url,
      siteName: "EUROPEATVSTORE",
      locale: "es_CO",
      type: "website", // 👈 MUY IMPORTANTE (ver problema 2)
    },
  };
}
