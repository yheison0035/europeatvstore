"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useCategories from "@/lib/utils/api/hooks/useCategories";

import ProductCard from "./productCard";
import SkeletonGrid from "@/components/ui/skeletons/skeletonGrid";
import Breadcrumbs from "../breadcrumbs";
import MobileFiltersBar from "@/components/filters/mobileFiltersBar";
import { DesktopSort } from "@/components/filters/desktopSort";

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
    <section className="space-y-4">
      {/* MOBILE */}
      <MobileFiltersBar total={products.length} />

      <div className="md:hidden px-4">
        <Breadcrumbs category={category} />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex justify-between items-center">
        <Breadcrumbs category={category} />
        <DesktopSort />
      </div>

      {loading ? (
        <SkeletonGrid count={6} cols="grid-cols-2 md:grid-cols-3" />
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-(--text-muted)">
          No se encontraron productos.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
