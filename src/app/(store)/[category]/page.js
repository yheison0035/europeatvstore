import CatalogClient from "@/components/layout/catalog/catalogClient";
import BreadcrumbSchema from "@/components/seo/breadcrumbSchema";

export default async function CatalogPage(props) {
  const params = await props.params;
  const category = params.category;

  return (
    <>
      <BreadcrumbSchema category={category} />
      <CatalogClient category={category} />
    </>
  );
}

export async function generateMetadata(props) {
  const params = await props.params;
  const category = params?.category;

  if (!category) {
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

  const categoryName = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const url = `https://www.europeatvstore.com/${category}`;

  return {
    title: `${categoryName} | Compra en EUROPEATVSTORE®`,
    description:
      "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega, envío rápido y ofertas reales en Colombia.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${categoryName} | EUROPEATVSTORE®`,
      description:
        "Compra productos originales en EUROPEATVSTORE®. Pago contraentrega y envíos a toda Colombia.",
      url,
      siteName: "EUROPEATVSTORE",
      locale: "es_CO",
      type: "website",
    },
  };
}
