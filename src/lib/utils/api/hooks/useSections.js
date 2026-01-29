"use client";

import { useState, useCallback } from "react";
import {
  getNews,
  getOffers,
  getRelatedProducts,
} from "../routes/sections/index";

export default function useSections() {
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

  const getNewsFn = useCallback(() => wrap(getNews), [wrap]);
  const getOffersFn = useCallback(() => wrap(getOffers), [wrap]);
  const getRelatedProductsFn = useCallback(
    (productSlug) => wrap(getRelatedProducts, productSlug),
    [wrap],
  );

  return {
    getNews: getNewsFn,
    getOffers: getOffersFn,
    getRelatedProducts: getRelatedProductsFn,
    loading,
    error,
  };
}
