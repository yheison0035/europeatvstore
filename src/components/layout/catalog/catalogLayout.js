import FiltersSidebar from "@/components/filters/filtersSidebar";
import ProductsSection from "./catalogSection/productsSection";

export default function CatalogLayout({ category }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 py-15 md:pt-5">
      <div className="hidden lg:block">
        <FiltersSidebar />
      </div>

      <ProductsSection category={category} />
    </section>
  );
}
