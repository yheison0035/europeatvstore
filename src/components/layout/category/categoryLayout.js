import FiltersSidebar from "./categoryLayout/filtersSidebar";
import ProductsSection from "./categoryLayout/productsSection";

export default function CategoryLayout({ category }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      <FiltersSidebar />
      <ProductsSection category={category} />
    </section>
  );
}
