"use client";

import { useWebsiteContext } from "@/context/websiteContext";
import { getCompanyName } from "@/lib/website";

export default function ProductSchema({ product, category, siteUrl = "" }) {
  const { website } = useWebsiteContext();

  if (!product) return null;

  // Marca y dominio del negocio dueño de este dominio, no de uno fijo.
  const companyName = getCompanyName(website);
  const base = siteUrl.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,

    offers: {
      "@type": "Offer",
      url: `${base}/${category}/${product.slug}`,
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const brand = product.brand || companyName;

  if (brand) {
    schema.brand = {
      "@type": "Brand",
      name: brand,
    };
  }

  if (companyName) {
    schema.offers.seller = {
      "@type": "Organization",
      name: companyName,
    };
  }

  if (product.oldPrice) {
    schema.offers.priceSpecification = {
      "@type": "UnitPriceSpecification",
      priceCurrency: "COP",
      price: product.price,
      referencePrice: product.oldPrice,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
