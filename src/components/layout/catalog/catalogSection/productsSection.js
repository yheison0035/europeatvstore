"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import useCategories from "@/lib/utils/api/hooks/useCategories";

import ProductCard from "./productCard";
import SkeletonGrid from "@/components/ui/skeletons/skeletonGrid";
import Breadcrumbs from "../breadcrumbs";
import MobileFiltersBar from "@/components/filters/mobileFiltersBar";
import { DesktopSort } from "@/components/filters/desktopSort";

const PAGE_SIZE = 12;

export default function ProductsSection({ category }) {
  const { getCatalogProducts } = useCategories();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

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

  const catalogParams = useMemo(() => {
    if (category === "novedades") {
      return { mode: "new", ...filters };
    }

    if (category === "ofertas") {
      return { mode: "offers", ...filters };
    }

    return { mode: "category", category, ...filters };
  }, [category, filters]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [catalogParams]);

  const loadProducts = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    const res = await getCatalogProducts({
      ...catalogParams,
      page,
      limit: PAGE_SIZE,
    });

    if (res?.success) {
      setProducts((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
      setPage((p) => p + 1);
    }

    setLoadingMore(false);
  }, [catalogParams, page, hasMore, loadingMore, getCatalogProducts]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadProducts();
        }
      },
      { rootMargin: "200px" },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadProducts]);

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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} category={category} />
        ))}
      </div>

      {loadingMore && (
        <SkeletonGrid count={6} cols="grid-cols-2 md:grid-cols-3" compact />
      )}

      {hasMore && <div ref={sentinelRef} className="h-1" />}

      {!loadingMore && products.length === 0 && (
        <div className="py-20 text-center text-(--text-muted)">
          No se encontraron productos.
        </div>
      )}
    </section>
  );
}
