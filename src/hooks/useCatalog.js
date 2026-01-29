"use client";

import { useCallback, useEffect, useState } from "react";
import useCategories from "@/lib/utils/api/hooks/useCategories";

const PAGE_SIZE = 12;

export function useCatalog(catalogParams) {
  const { getCatalogProducts } = useCategories();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // reset cuando cambian filtros / categoría
  useEffect(() => {
    setProducts([]);
    setFilters(null);
    setPage(1);
    setHasMore(true);
  }, [catalogParams]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    const res = await getCatalogProducts({
      ...catalogParams,
      page,
      limit: PAGE_SIZE,
    });

    if (res?.success) {
      setProducts((prev) => [...prev, ...res.data]);
      setFilters(res.filters);
      setHasMore(res.data.length === PAGE_SIZE);
      setPage((p) => p + 1);
    }

    setLoadingMore(false);
  }, [catalogParams, page, hasMore, loadingMore, getCatalogProducts]);

  return {
    products,
    filters,
    loadMore,
    hasMore,
    loadingMore,
  };
}
