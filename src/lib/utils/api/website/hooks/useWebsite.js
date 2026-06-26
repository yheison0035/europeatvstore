"use client";

import { useState, useCallback } from "react";
import { getWebsiteConfig } from "../routes";

export default function useWebsite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrap = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);

    try {
      return await fn(...args);
    } catch (err) {
      setError(err.message || "Error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getConfig = useCallback(() => wrap(getWebsiteConfig), [wrap]);

  return {
    getConfig,
    loading,
    error,
  };
}
