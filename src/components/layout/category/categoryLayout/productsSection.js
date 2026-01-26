"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCategories from "@/lib/utils/api/hooks/useCategories";
import ProductCard from "./productCard";
import SkeletonGrid from "@/components/ui/skeletons/skeletonGrid";

export default function ProductsSection({ category }) {
  const { getProductsByCategory, loading } = useCategories();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  const filters = {
    colors: searchParams.get("colors") || "",
    brands: searchParams.get("brands") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
  };

  useEffect(() => {
    async function load() {
      const res = await getProductsByCategory(category, filters);
      if (res?.success) setProducts(res.data || []);
    }
    load();
  }, [category, searchParams.toString()]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-(--text-primary) capitalize">
          {category.replace("-", " ")}
        </h1>

        <select
          value={filters.sort}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            e.target.value
              ? params.set("sort", e.target.value)
              : params.delete("sort");
            router.push(`?${params.toString()}`);
          }}
          className="
            border border-(--border-soft)
            rounded-lg px-3 py-2
            bg-(--bg-page)
            text-sm
          "
        >
          <option value="">Ordenar por</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="name_asc">A - Z</option>
          <option value="name_desc">Z - A</option>
          <option value="oldest">Más viejo</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonGrid count={6} cols="grid-cols-2 md:grid-cols-3" />
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-(--text-muted)">
          No se encontraron productos para esta categoría.
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
