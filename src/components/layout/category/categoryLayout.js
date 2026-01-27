import FiltersSidebar from "@/components/filters/filtersSidebar";
import ProductsSection from "./categorySection/productsSection";

export default function CategoryLayout({ category }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      <div className="hidden lg:block">
        <FiltersSidebar />
      </div>

      <ProductsSection category={category} />
    </section>
  );
}
