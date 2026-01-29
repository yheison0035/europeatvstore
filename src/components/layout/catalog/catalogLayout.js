"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import FiltersSidebar from "@/components/filters/filtersSidebar";
import ProductsSection from "./catalogSection/productsSection";
import { useCatalog } from "@/hooks/useCatalog";
import FiltersSidebarSkeleton from "@/components/ui/skeletons/filtersSidebarSkeleton";

export default function CatalogLayout({ category }) {
  const searchParams = useSearchParams();

  const filtersFromUrl = useMemo(
    () => ({
      colors: searchParams.get("colors") || "",
      brands: searchParams.get("brands") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams],
  );

  const catalogParams = useMemo(() => {
    if (category === "novedades") return { mode: "new", ...filtersFromUrl };
    if (category === "ofertas") return { mode: "offers", ...filtersFromUrl };
    return { mode: "category", category, ...filtersFromUrl };
  }, [category, filtersFromUrl]);

  const catalog = useCatalog(catalogParams);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 md:pt-5">
      <aside
        className="
          hidden lg:block
          sticky
          top-[calc(var(--header-nav-height)+16px)]
          self-start
          transition-[top]
          duration-200
  "
      >
        {catalog.filters ? (
          <FiltersSidebar filters={catalog.filters} />
        ) : (
          <FiltersSidebarSkeleton />
        )}
      </aside>

      <ProductsSection category={category} catalog={catalog} />
    </section>
  );
}
