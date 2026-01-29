import CatalogClient from "@/components/layout/catalog/catalogClient";

export default async function CatalogPage({ params }) {
  const { category } = await params;

  return <CatalogClient category={category} />;
}

export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://www.europeatvstore.com/${params.category}`,
    },
  };
}
