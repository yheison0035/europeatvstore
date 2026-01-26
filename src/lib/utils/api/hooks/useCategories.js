"use client";

import { useState, useCallback } from "react";
import { getCategories, getProductsByCategory } from "../routes/categories";

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

  const getProductsByCategoryFn = useCallback(
    (slug, filters = {}) => wrap(getProductsByCategory, slug, filters),
    [wrap],
  );

  return {
    getCategories: getCategoriesFn,
    getProductsByCategory: getProductsByCategoryFn,
    loading,
    error,
  };
}
