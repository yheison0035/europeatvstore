"use client";

import { useState, useCallback } from "react";
import { getCategories, getCatalogProducts } from "../routes/categories";

export default function useCategories() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrap = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      return await fn(...args);
    } catch (err) {
      setError(err.message || "Error en operación");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoriesFn = useCallback(() => wrap(getCategories), [wrap]);

  const getCatalogProductsFn = useCallback(
    (slug, filters = {}) => wrap(getCatalogProducts, slug, filters),
    [wrap],
  );

  return {
    getCategories: getCategoriesFn,
    getCatalogProducts: getCatalogProductsFn,
    loading,
    error,
  };
}
