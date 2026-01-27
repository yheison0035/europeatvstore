"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useCategories from "@/lib/utils/api/hooks/useCategories";

import ProductCard from "./productCard";
import SkeletonGrid from "@/components/ui/skeletons/skeletonGrid";
import Breadcrumbs from "../breadcrumbs";
import MobileFiltersBar from "@/components/filters/mobileFiltersBar";
import { filtersConfig } from "@/utils/filters.config";

export default function ProductsSection({ category }) {
  const { getProductsByCategory, loading } = useCategories();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);

  const filters = useMemo(
    () => ({
      colors: searchParams.get("colors") || "",
      brands: searchParams.get("brands") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams],
  );

  useEffect(() => {
    let active = true;

    getProductsByCategory(category, filters).then((res) => {
      if (!active) return;
      setProducts(res?.success ? res.data || [] : []);
    });

    return () => {
      active = false;
    };
  }, [category, filters, getProductsByCategory]);

  return (
    <section>
      <MobileFiltersBar total={products.length} />

      <div className="md:hidden px-4 mt-3">
        <Breadcrumbs category={category} />
      </div>

      <div className="hidden md:flex justify-between items-center">
        <Breadcrumbs category={category} />

        <select
          value={filters.sort}
          onChange={(e) => set("sort", e.target.value)}
          className="
            border border-(--border-soft)
            rounded-lg px-3 py-2
            bg-(--bg-page)
            text-sm
            min-w-55
          "
        >
          <option value="">Ordenar por</option>

          {filtersConfig.sort.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <SkeletonGrid count={6} cols="grid-cols-2 md:grid-cols-3" />
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-(--text-muted)">
          No se encontraron productos para esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
            />
          ))}
        </div>
      )}
    </section>
  );
}
