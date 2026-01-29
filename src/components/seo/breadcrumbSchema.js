"use client";

export default function BreadcrumbSchema({ category, product }) {
  if (!category) return null;

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://www.europeatvstore.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: category.replace(/-/g, " "),
      item: `https://www.europeatvstore.com/${category}`,
    },
  ];

  if (product) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: product,
      item: `https://www.europeatvstore.com/${category}/${product
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
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
