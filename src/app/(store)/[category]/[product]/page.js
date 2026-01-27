import ProductPage from "@/components/layout/pdp/productPage";

export default async function ContentPDP({ params }) {
  const { category, product } = await params;
  return <ProductPage category={category} productSlug={product} />;
}
