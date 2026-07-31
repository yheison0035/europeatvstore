"use client";

export default function BreadcrumbSchema({ category, product, siteUrl = "" }) {
  if (!category) return null;

  // El dominio lo pasa la página (cada negocio tiene el suyo).
  const base = siteUrl.replace(/\/$/, "");

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: base || "/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: category.replace(/-/g, " "),
      item: `${base}/${category}`,
    },
  ];

  if (product) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: product,
      item: `${base}/${category}/${product.toLowerCase().replace(/\s+/g, "-")}`,
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
