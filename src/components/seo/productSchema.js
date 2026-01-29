"use client";

export default function ProductSchema({ product, category }) {
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || "EUROPEATVSTORE",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.europeatvstore.com/${category}/${product.slug}`,
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  // Si tiene descuento
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
