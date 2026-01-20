"use client";

import { useState, useCallback } from "react";
import { getCategories, getCategoryById } from "../routes/categories/index";

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
  const getCategoryByIdFn = useCallback(
    (id) => wrap(getCategoryById, id),
    [wrap],
  );

  return {
    getCategories: getCategoriesFn,
    getCategoryById: getCategoryByIdFn,
    loading,
    error,
  };
}
